/**
 * Prod-safe: upsert Vietnam urgency add-ons only (BudPal CRM + apply flow).
 * Does NOT touch service fees, insurance, visa types, or other destinations.
 *
 * Usage:
 *   DATABASE_URL="postgresql://..." node scripts/seed-vietnam-urgency-prod.js
 */
const { randomUUID } = require('crypto');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

/** Names must match src/lib/urgency.ts URGENCY_ADDON_NAME_BY_VALUE */
const VIETNAM_URGENCY_ADDONS = [
  { name: 'Super Urgent - 24 hrs to Vietnam', type: 'urgency', pricePerPax: 220 },
  { name: 'Urgent - 48 hrs to Vietnam', type: 'urgency', pricePerPax: 110 },
];

async function upsertAddon({ name, type, pricePerPax }) {
  const existing = await prisma.addOnConfig.findUnique({ where: { name } });

  if (existing) {
    await prisma.addOnConfig.update({
      where: { name },
      data: { type, pricePerPax, isActive: true },
    });
    return 'updated';
  }

  await prisma.addOnConfig.create({
    data: { id: randomUUID(), name, type, pricePerPax, isActive: true },
  });
  return 'created';
}

async function main() {
  for (const addon of VIETNAM_URGENCY_ADDONS) {
    const action = await upsertAddon(addon);
    console.log(`${action}: ${addon.name} — $${addon.pricePerPax}/pax`);
  }

  const rows = await prisma.addOnConfig.findMany({
    where: { name: { contains: 'Vietnam' }, type: { equals: 'urgency', mode: 'insensitive' } },
    select: { name: true, pricePerPax: true, isActive: true },
    orderBy: { name: 'asc' },
  });
  console.log('\nVietnam urgency rows in DB:');
  for (const r of rows) console.log(`  ${r.isActive ? 'on' : 'off'} | $${r.pricePerPax} | ${r.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
