import type { Prisma } from '../../generated/prisma';
import type { AddOn } from '@/types/index';
import { getServiceFee } from './serviceFee';
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
  const serviceFee = await getServiceFee(application.destinationId, application.visaTypeId);
  const urgencyFeePerPax = await resolveUrgencyFeePerPax(urgency, loadUrgencyPriceFromDb);
  const passengerCount = application.passengerCount || 1;
  return (governmentFee + serviceFee + urgencyFeePerPax) * passengerCount;
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
