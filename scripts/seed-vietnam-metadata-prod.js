/**
 * Prod-safe: Vietnam visa display metadata only.
 * - Fixes inverted waitTime on 4 visa types
 * - Normalizes display names to "eVisa" (by stable id)
 *
 * Does NOT touch: ServiceFeeConfig, AddOnConfig, fees, applications, passengers.
 *
 * Usage: DATABASE_URL="..." node scripts/seed-vietnam-metadata-prod.js
 */
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const DESTINATION_ID = 'vietnam';
const STANDARD_WAIT_TIME = 'From 1 working day to 3 working days';
const INVERTED_WAIT_TIME = 'From 3 working days to 1 working day';

const VISA_TYPE_NAMES = {
  'vietnam-tourist-single-90-days': 'Tourist eVisa (Single Entry for 90 days)',
  'vietnam-tourist-multiple-90-days': 'Tourist eVisa (Multiple Entries for 90 days)',
  'vietnam-business-single-90-days': 'Business eVisa (Single Entry for 90 days)',
  'vietnam-business-multiple-90-days': 'Business eVisa (Multiple Entries for 90 days)',
};

async function main() {
  const fixedWait = await prisma.visaType.updateMany({
    where: { destinationId: DESTINATION_ID, waitTime: INVERTED_WAIT_TIME },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  console.log(`waitTime: fixed ${fixedWait.count} row(s)`);

  let nameUpdates = 0;
  for (const [id, name] of Object.entries(VISA_TYPE_NAMES)) {
    const res = await prisma.visaType.updateMany({
      where: { id, destinationId: DESTINATION_ID, NOT: { name } },
      data: { name },
    });
    if (res.count > 0) {
      nameUpdates += res.count;
      console.log(`name: ${id} -> "${name}"`);
    }
  }
  if (nameUpdates === 0) console.log('name: all already correct');

  const vts = await prisma.visaType.findMany({
    where: { destinationId: DESTINATION_ID },
    select: { id: true, name: true, fees: true, waitTime: true },
    orderBy: { name: 'asc' },
  });
  console.log('\nVerify:');
  for (const v of vts) console.log(`  ${v.id} | $${v.fees} | ${v.waitTime}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
