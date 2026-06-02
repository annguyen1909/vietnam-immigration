/**
 * Vietnam production data seed — idempotent and duplicate-safe.
 *
 * Aligns the shared DB with the canonical Vietnam pricing:
 *   - Travel insurance: $69/pax
 *   - Urgency: Super Urgent (24h) $220, Urgent (3 days / 72h) $110
 *   - Deactivates unused "Emergency" urgency tier
 *   - Fixes inverted visa-type waitTime
 *   - Normalizes visa-type display names to "eVisa" casing (id-based, no dup risk)
 *
 * Service fee is intentionally NOT seeded here: it is a single shared/global
 * ServiceFeeConfig (dev $65, prod $59.99) managed outside this script.
 *
 * Safe to run multiple times. Touches Vietnam-scoped rows only; never edits the
 * global ServiceFeeConfig or other tenants' insurance rows.
 *
 * Usage: node scripts/seed-vietnam-production.js
 */
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const DESTINATION_ID = 'vietnam';
const INSURANCE_PRICE = 69;

const STANDARD_WAIT_TIME = 'From 1 working day to 3 working days';
const INVERTED_WAIT_TIME = 'From 3 working days to 1 working day';

/** Canonical "eVisa" display names keyed by stable visa-type id. */
const VISA_TYPE_NAMES = {
  'vietnam-tourist-single-90-days': 'Tourist eVisa (Single Entry for 90 days)',
  'vietnam-tourist-multiple-90-days': 'Tourist eVisa (Multiple Entries for 90 days)',
  'vietnam-business-single-90-days': 'Business eVisa (Single Entry for 90 days)',
  'vietnam-business-multiple-90-days': 'Business eVisa (Multiple Entries for 90 days)',
};

/** Urgency add-on prices keyed by exact AddOnConfig.name. */
const URGENCY_PRICES = {
  'Super Urgent - 24 hrs to Vietnam': 220,
  'Urgent - 48 hrs to Vietnam': 110,
};

const INSURANCE_NAME = 'Travel Insurance - 30 days to Vietnam';
const DEACTIVATE_URGENCY = ['Emergency - 5 hours to Vietnam'];

async function main() {
  // 1. Fix inverted waitTime (name-agnostic).
  const fixedWait = await prisma.visaType.updateMany({
    where: { destinationId: DESTINATION_ID, waitTime: INVERTED_WAIT_TIME },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  console.log(`waitTime: fixed ${fixedWait.count} inverted visa type(s)`);

  // 2. Normalize visa-type display names by id (prevents future name-keyed dups).
  for (const [id, name] of Object.entries(VISA_TYPE_NAMES)) {
    const res = await prisma.visaType.updateMany({
      where: { id, destinationId: DESTINATION_ID, NOT: { name } },
      data: { name },
    });
    if (res.count > 0) console.log(`visa name: ${id} -> "${name}"`);
  }

  // 3. Insurance price (Vietnam only).
  const insRes = await prisma.addOnConfig.updateMany({
    where: { name: INSURANCE_NAME },
    data: { pricePerPax: INSURANCE_PRICE, isActive: true },
  });
  console.log(`insurance: updated ${insRes.count} row -> $${INSURANCE_PRICE}`);

  // 4. Urgency prices (exact-name match, no rename so no dup).
  for (const [name, price] of Object.entries(URGENCY_PRICES)) {
    const res = await prisma.addOnConfig.updateMany({
      where: { name },
      data: { pricePerPax: price, isActive: true },
    });
    console.log(`urgency: "${name}" -> $${price} (${res.count} row)`);
  }

  // 5. Deactivate unused urgency tiers.
  for (const name of DEACTIVATE_URGENCY) {
    const res = await prisma.addOnConfig.updateMany({
      where: { name, isActive: true },
      data: { isActive: false },
    });
    if (res.count > 0) console.log(`urgency: deactivated "${name}"`);
  }

  console.log('\nVietnam production seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
