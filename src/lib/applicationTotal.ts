import { getServiceFee } from './serviceFee';
import { getDiscountedServiceFee } from './groupDiscount';
import { prisma } from './prisma';

/** Resolve order total for risk checks — prefers stored application.total. */
export async function getApplicationOrderTotal(application: {
  visaTypeId: string;
  destinationId: string;
  passengerCount: number | null;
  total: number | null;
}): Promise<number> {
  if (application.total != null && !Number.isNaN(application.total)) {
    return application.total;
  }

  const visaType = await prisma.visaType.findUnique({
    where: { id: application.visaTypeId },
    select: { fees: true },
  });
  const governmentFee = visaType?.fees || 0;
  const passengerCount = application.passengerCount || 1;
  const serviceFee = getDiscountedServiceFee(
    await getServiceFee(application.destinationId, application.visaTypeId),
    passengerCount
  );
  return (governmentFee + serviceFee) * passengerCount;
}
