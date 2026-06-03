/**
 * Prod-safe: Vietnam visa display metadata only.
 * - Fixes inverted / legacy waitTime → Within 5 business days
 * - Normalizes display names to "eVisa" (by stable id)
 *
 * Does NOT touch: ServiceFeeConfig, AddOnConfig, fees, applications, passengers.
 *
 * Usage:
 *   PROD_DATABASE_URL="postgresql://..." node scripts/seed-vietnam-metadata-prod.js
 * Or add PROD_DATABASE_URL to .env (gitignored).
 */
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../generated/prisma');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}

function resolveDatabaseUrl() {
  const root = path.join(__dirname, '..');
  loadEnvFile(path.join(root, '.env'));
  loadEnvFile(path.join(root, '.env.local'));

  const url = process.env.PROD_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    console.error('Set PROD_DATABASE_URL (recommended) or DATABASE_URL.');
    process.exit(1);
  }

  const host = (url.match(/@([^/]+)/) || [])[1]?.split('?')[0] || '';
  if (host.includes('round-thunder')) {
    console.error(
      'Refusing to run: host looks like DEV (ep-round-thunder). Set PROD_DATABASE_URL to ep-white-firefly prod.'
    );
    process.exit(1);
  }

  process.env.DATABASE_URL = url;
  console.log(`DB host: ${host}`);
  return url;
}

resolveDatabaseUrl();
const prisma = new PrismaClient();

const DESTINATION_ID = 'vietnam';
const STANDARD_WAIT_TIME = 'Within 5 business days';
const INVERTED_WAIT_TIME = 'From 3 working days to 1 working day';
const LEGACY_WAIT_TIME = 'From 1 working day to 3 working days';

const VISA_TYPE_NAMES = {
  'vietnam-tourist-single-90-days': 'Tourist eVisa (Single Entry for 90 days)',
  'vietnam-tourist-multiple-90-days': 'Tourist eVisa (Multiple Entries for 90 days)',
  'vietnam-business-single-90-days': 'Business eVisa (Single Entry for 90 days)',
  'vietnam-business-multiple-90-days': 'Business eVisa (Multiple Entries for 90 days)',
};

async function main() {
  const fixedInverted = await prisma.visaType.updateMany({
    where: { destinationId: DESTINATION_ID, waitTime: INVERTED_WAIT_TIME },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  const fixedLegacy = await prisma.visaType.updateMany({
    where: { destinationId: DESTINATION_ID, waitTime: LEGACY_WAIT_TIME },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  const forced = await prisma.visaType.updateMany({
    where: { destinationId: DESTINATION_ID, NOT: { waitTime: STANDARD_WAIT_TIME } },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  console.log(
    `waitTime: inverted=${fixedInverted.count}, legacy 1-3d=${fixedLegacy.count}, other->5d=${forced.count}`
  );

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
