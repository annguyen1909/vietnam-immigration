/**
 * Automatic group discount: orders with 2+ travelers get US$10 off the
 * service fee per traveler. Only the service fee is discounted.
 */
export const GROUP_DISCOUNT_MIN_TRAVELERS = 2;
export const GROUP_DISCOUNT_PER_TRAVELER = 10;
export const GROUP_DISCOUNT_LABEL = 'Group discount (2+ travelers)';

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** US$10 when the order has 2+ travelers, otherwise 0. */
export function getGroupDiscountPerTraveler(count: number): number {
  return count >= GROUP_DISCOUNT_MIN_TRAVELERS ? GROUP_DISCOUNT_PER_TRAVELER : 0;
}

/** Per-traveler service fee after the group discount. */
export function getDiscountedServiceFee(baseServiceFeePerTraveler: number, count: number): number {
  return Math.max(0, round2(baseServiceFeePerTraveler - getGroupDiscountPerTraveler(count)));
}

/** Total group discount for the order. */
export function getGroupDiscountTotal(count: number): number {
  return round2(getGroupDiscountPerTraveler(count) * Math.max(0, count));
}
