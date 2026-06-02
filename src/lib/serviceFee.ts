import { prisma } from './prisma';

import { VIETNAM_SERVICE_FEE_PER_PAX } from './vietnamPricing';

/** Fallback when ServiceFeeConfig table or rows are unavailable (e.g. dev DB without migration). */
export const DEFAULT_SERVICE_FEE = VIETNAM_SERVICE_FEE_PER_PAX;

function isMissingServiceFeeTable(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: string }).code === 'P2021'
  );
}

/**
 * Get service fee for a specific destination and visa type.
 * Priority: visa type > destination > default
 * @param destinationId - The destination ID
 * @param visaTypeId - The visa type ID
 * @returns Service fee per passenger (defaults to 59.99 if no config found)
 */
export async function getServiceFee(destinationId: string, visaTypeId: string): Promise<number> {
  try {
    return await resolveServiceFeeFromDb(destinationId, visaTypeId);
  } catch (error) {
    if (isMissingServiceFeeTable(error)) {
      return DEFAULT_SERVICE_FEE;
    }
    throw error;
  }
}

async function resolveServiceFeeFromDb(destinationId: string, visaTypeId: string): Promise<number> {
  const now = new Date();

  // Try visa type specific
  const visaTypeFee = await prisma.serviceFeeConfig.findFirst({
    where: {
      visaTypeId,
      isActive: true,
      effectiveFrom: { lte: now },
      OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
    },
    orderBy: { effectiveFrom: 'desc' },
  });
  if (visaTypeFee) return visaTypeFee.serviceFee;

  // Try destination specific
  const destFee = await prisma.serviceFeeConfig.findFirst({
    where: {
      destinationId,
      visaTypeId: null,
      isActive: true,
      effectiveFrom: { lte: now },
      OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
    },
    orderBy: { effectiveFrom: 'desc' },
  });
  if (destFee) return destFee.serviceFee;

  // Use default
  const defaultFee = await prisma.serviceFeeConfig.findFirst({
    where: {
      destinationId: null,
      visaTypeId: null,
      isActive: true,
      effectiveFrom: { lte: now },
      OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
    },
    orderBy: { effectiveFrom: 'desc' },
  });

  return defaultFee?.serviceFee || DEFAULT_SERVICE_FEE;
}
