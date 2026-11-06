import type { Prisma } from '../../generated/prisma';
import type { AddOn } from '@/types/index';
import { getServiceFee } from './serviceFee';
import { getDiscountedServiceFee } from './groupDiscount';
import { prisma } from './prisma';
import { resolveUrgencyFeePerPax, type UrgencyValue, getUrgencyLabel } from './urgency';

async function loadUrgencyPriceFromDb(name: string): Promise<number | null> {
  try {
    const addon = await prisma.addOnConfig.findFirst({
      where: {
        type: { equals: 'urgency', mode: 'insensitive' },
        name,
        isActive: true,
      },
      select: { pricePerPax: true },
    });
    return addon?.pricePerPax ?? null;
  } catch {
    return null;
  }
}

export function sumInsuranceAddOns(passengers: { addOns?: unknown }[]): number {
  return passengers.reduce((sum, passenger) => {
    const addOns = (passenger.addOns as AddOn[] | undefined) || [];
    return (
      sum +
      addOns
        .filter((a) => a.type === 'insurance')
        .reduce((paxSum, addOn) => paxSum + (addOn.pricePerPax || 0), 0)
    );
  }, 0);
}

/** Government + service + urgency (per passenger), before insurance add-ons. */
export async function computeBaseOrderTotal(
  application: { visaTypeId: string; destinationId: string; passengerCount: number | null },
  urgency: UrgencyValue = ''
): Promise<number> {
  const visaType = await prisma.visaType.findUnique({
    where: { id: application.visaTypeId },
    select: { fees: true },
  });
  const governmentFee = visaType?.fees || 0;
  const urgencyFeePerPax = await resolveUrgencyFeePerPax(urgency, loadUrgencyPriceFromDb);
  const passengerCount = application.passengerCount || 1;
  const baseServiceFee = await getServiceFee(application.destinationId, application.visaTypeId);
  const serviceFee = getDiscountedServiceFee(baseServiceFee, passengerCount);
  return (governmentFee + serviceFee + urgencyFeePerPax) * passengerCount;
}

/**
 * Snapshot the per-traveler fees on every passenger of an application for BudPal CRM:
 * `originalServiceFee` holds the group-discounted service fee for the current passenger count
 * and `originalGovernmentFee` the visa type's Government & Admin Fee. Only rows that differ are
 * written. Returns the service-fee total before and after, treating a missing snapshot as the
 * undiscounted service fee (orders priced before snapshots existed).
 */
export async function syncPassengerFeeSnapshots(application: {
  visaTypeId: string;
  destinationId: string;
  passengerCount: number | null;
  Passenger: Array<{
    id: string;
    originalGovernmentFee: number | null;
    originalServiceFee: number | null;
  }>;
}): Promise<{ previousServiceTotal: number; serviceTotal: number }> {
  const passengerCount = application.passengerCount || application.Passenger.length || 1;
  const visaType = await prisma.visaType.findUnique({
    where: { id: application.visaTypeId },
    select: { fees: true },
  });
  const governmentFeePerPax = visaType?.fees ?? null;
  const baseServiceFee = await getServiceFee(application.destinationId, application.visaTypeId);
  const serviceFeePerPax = getDiscountedServiceFee(baseServiceFee, passengerCount);

  const stale = application.Passenger.filter(
    (p) =>
      p.originalServiceFee !== serviceFeePerPax || p.originalGovernmentFee !== governmentFeePerPax
  );
  if (stale.length > 0) {
    await prisma.passenger.updateMany({
      where: { id: { in: stale.map((p) => p.id) } },
      data: {
        originalServiceFee: serviceFeePerPax,
        originalGovernmentFee: governmentFeePerPax,
      },
    });
  }

  const previousServiceTotal = application.Passenger.reduce(
    (sum, p) => sum + (p.originalServiceFee ?? baseServiceFee),
    0
  );
  return {
    previousServiceTotal: Math.round(previousServiceTotal * 100) / 100,
    serviceTotal: Math.round(serviceFeePerPax * application.Passenger.length * 100) / 100,
  };
}

/** Full order total: base fees + urgency + insurance add-ons on passengers. */
export async function computeFullOrderTotal(
  application: { visaTypeId: string; destinationId: string; passengerCount: number | null },
  urgency: UrgencyValue,
  passengers: { addOns?: unknown }[]
): Promise<number> {
  const baseTotal = await computeBaseOrderTotal(application, urgency);
  return baseTotal + sumInsuranceAddOns(passengers);
}

export async function resolveUrgencyFeeTotal(
  urgency: UrgencyValue,
  passengerCount: number
): Promise<number> {
  const perPax = await resolveUrgencyFeePerPax(urgency, loadUrgencyPriceFromDb);
  return perPax * passengerCount;
}

export function buildAdditionalChargesDetails(
  passengers: { id: string; addOns?: unknown }[],
  urgency: UrgencyValue = '',
  urgencyFeeTotal = 0
): Prisma.InputJsonValue | undefined {
  const details: {
    type: string;
    name: string;
    pricePerPax: number;
    quantity: number;
    amount: number;
    passengerIds: string[];
  }[] = [];

  if (urgency && urgencyFeeTotal > 0) {
    const passengerCount = passengers.length || 1;
    details.push({
      type: 'urgency',
      name: `${getUrgencyLabel(urgency)} Fee`,
      pricePerPax: urgencyFeeTotal / passengerCount,
      quantity: passengerCount,
      amount: urgencyFeeTotal,
      passengerIds: passengers.map((p) => p.id),
    });
  }

  const byKey: Record<
    string,
    { type: string; name: string; pricePerPax: number; quantity: number; passengerIds: string[] }
  > = {};

  for (const passenger of passengers) {
    const addOns = (passenger.addOns as AddOn[] | undefined) || [];
    for (const addOn of addOns) {
      if (addOn.type !== 'insurance') continue;
      const key = `${addOn.type}-${addOn.addOnName}`;
      if (!byKey[key]) {
        byKey[key] = {
          type: addOn.type,
          name: addOn.addOnName,
          pricePerPax: addOn.pricePerPax,
          quantity: 0,
          passengerIds: [],
        };
      }
      byKey[key].quantity += 1;
      byKey[key].passengerIds.push(passenger.id);
    }
  }

  for (const addOn of Object.values(byKey)) {
    details.push({
      type: addOn.type,
      name: addOn.name,
      pricePerPax: addOn.pricePerPax,
      quantity: addOn.quantity,
      amount: addOn.pricePerPax * addOn.quantity,
      passengerIds: addOn.passengerIds,
    });
  }

  return details.length > 0
    ? (JSON.parse(JSON.stringify(details)) as Prisma.InputJsonValue)
    : undefined;
}
