/**
 * Seed Vietnam travel insurance add-on for dev/local DB.
 * Name must match Step2Passengers.tsx exactly.
 *
 * Usage:
 *   npm run seed:insurance
 */
const { randomUUID } = require('crypto');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const INSURANCE_ADDON = {
  name: 'Travel Insurance - 30 days to Vietnam',
  type: 'insurance',
  /** Strikethrough in UI is $187; typical promo price $87/pax */
  pricePerPax: 87,
};

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

async function main() {
  await ensureAddOnConfigTable();

  const { name, type, pricePerPax } = INSURANCE_ADDON;
  const existing = await prisma.addOnConfig.findUnique({ where: { name } });

  if (existing) {
    await prisma.addOnConfig.update({
      where: { name },
      data: { type, pricePerPax, isActive: true },
    });
    console.log(`updated: ${name} — $${pricePerPax.toFixed(2)}/pax`);
  } else {
    await prisma.addOnConfig.create({
      data: {
        id: randomUUID(),
        name,
        type,
        pricePerPax,
        isActive: true,
      },
    });
    console.log(`created: ${name} — $${pricePerPax.toFixed(2)}/pax`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
