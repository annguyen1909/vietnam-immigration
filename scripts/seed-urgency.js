/**
 * Seed urgency add-ons (Super urgent 24h, Urgent 48h) for dev/local DB.
 * Creates AddOnConfig table if missing (dev DB may not have run full migrations).
 *
 * Usage (from project root, uses DATABASE_URL in .env):
 *   node scripts/seed-urgency.js
 *   npm run seed:urgency
 */
const { randomUUID } = require('crypto');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const URGENCY_ADDONS = [
  {
    name: 'Super urgent 24h',
    type: 'urgency',
    pricePerPax: 39.99,
  },
  {
    name: 'Urgent 48h',
    type: 'urgency',
    pricePerPax: 19.99,
  },
];

async function ensureAddOnConfigTable() {
  const rows = await prisma.$queryRaw`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'AddOnConfig'
  `;

  if (rows.length > 0) return;

  console.log('AddOnConfig table not found — creating...');

  await prisma.$executeRawUnsafe(`
    CREATE TABLE "AddOnConfig" (
      "id" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "pricePerPax" DOUBLE PRECISION NOT NULL,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "AddOnConfig_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(
    `CREATE UNIQUE INDEX "AddOnConfig_name_key" ON "AddOnConfig"("name");`
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX "AddOnConfig_type_idx" ON "AddOnConfig"("type");`
  );
  await prisma.$executeRawUnsafe(
    `CREATE INDEX "AddOnConfig_isActive_idx" ON "AddOnConfig"("isActive");`
  );
}

async function upsertUrgencyAddon({ name, type, pricePerPax }) {
  const existing = await prisma.addOnConfig.findUnique({ where: { name } });

  if (existing) {
    await prisma.addOnConfig.update({
      where: { name },
      data: { type, pricePerPax, isActive: true },
    });
    return 'updated';
  }

  await prisma.addOnConfig.create({
    data: {
      id: randomUUID(),
      name,
      type,
      pricePerPax,
      isActive: true,
    },
  });
  return 'created';
}

async function main() {
  await ensureAddOnConfigTable();

  for (const addon of URGENCY_ADDONS) {
    const action = await upsertUrgencyAddon(addon);
    console.log(`${action}: ${addon.name} — $${addon.pricePerPax.toFixed(2)}/pax (${addon.type})`);
  }

  const all = await prisma.addOnConfig.findMany({
    where: { type: 'urgency', isActive: true },
    orderBy: { pricePerPax: 'desc' },
  });

  console.log(`\nActive urgency add-ons in DB: ${all.length}`);
  for (const row of all) {
    console.log(`  - ${row.name}: $${row.pricePerPax}/pax`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
