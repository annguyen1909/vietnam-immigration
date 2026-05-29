/**
 * Read-only dev DB snapshot (uses DATABASE_URL from .env via default Prisma).
 */
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const counts = {
    destination: await prisma.destination.count(),
    visaType: await prisma.visaType.count(),
    addOnActive: await prisma.addOnConfig.count({ where: { isActive: true } }),
    serviceFeeActive: await prisma.serviceFeeConfig.count({ where: { isActive: true } }),
    account: await prisma.account.count(),
    application: await prisma.application.count(),
    passenger: await prisma.passenger.count(),
  };

  const vietnam = await prisma.destination.findFirst({
    where: { name: { contains: 'Vietnam', mode: 'insensitive' } },
    include: { VisaType: { select: { name: true, fees: true } } },
  });

  const fees = await prisma.serviceFeeConfig.findMany({
    where: { isActive: true },
    select: { serviceFee: true, destinationId: true, visaTypeId: true },
  });

  console.log(JSON.stringify({ counts, vietnamVisaCount: vietnam?.VisaType?.length, activeServiceFees: fees }, null, 2));
}

main()
  .catch((e) => {
    console.error('ERR', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
