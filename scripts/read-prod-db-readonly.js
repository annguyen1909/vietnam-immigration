/**
 * Read-only prod DB snapshot. SELECT/count only — no writes.
 * Usage: PROD_DATABASE_URL='postgresql://...' node scripts/read-prod-db-readonly.js
 */
const { PrismaClient } = require('../generated/prisma');

const url = process.env.PROD_DATABASE_URL;
if (!url) {
  console.error('Set PROD_DATABASE_URL');
  process.exit(1);
}

const prisma = new PrismaClient({ datasources: { db: { url } } });

async function main() {
  const counts = {
    destination: await prisma.destination.count(),
    visaType: await prisma.visaType.count(),
    addOnConfig: await prisma.addOnConfig.count(),
    addOnActive: await prisma.addOnConfig.count({ where: { isActive: true } }),
    serviceFeeConfig: await prisma.serviceFeeConfig.count(),
    serviceFeeActive: await prisma.serviceFeeConfig.count({ where: { isActive: true } }),
    account: await prisma.account.count(),
    application: await prisma.application.count(),
    passenger: await prisma.passenger.count(),
    session: await prisma.session.count(),
    case: await prisma.case.count(),
    user: await prisma.user.count(),
  };

  const vietnam = await prisma.destination.findFirst({
    where: { name: { contains: 'Vietnam', mode: 'insensitive' } },
    include: {
      VisaType: { select: { name: true, fees: true, waitTime: true } },
    },
  });

  const destSample = await prisma.destination.findMany({
    take: 8,
    orderBy: { name: 'asc' },
    select: { name: true, code: true },
  });

  const addons = await prisma.addOnConfig.findMany({
    where: { isActive: true },
    select: { type: true, name: true, pricePerPax: true },
    orderBy: { name: 'asc' },
  });

  const fees = await prisma.serviceFeeConfig.findMany({
    where: { isActive: true },
    select: { serviceFee: true, destinationId: true, visaTypeId: true },
  });

  const appsByStatus = await prisma.application.groupBy({
    by: ['status'],
    _count: { _all: true },
  });

  const websiteTags = await prisma.$queryRaw`
    SELECT "websiteCreatedAt", COUNT(*)::int AS cnt
    FROM "Account"
    GROUP BY "websiteCreatedAt"
    ORDER BY cnt DESC
    LIMIT 10
  `;

  console.log(
    JSON.stringify(
      {
        counts,
        vietnam: vietnam
          ? { name: vietnam.name, code: vietnam.code, visaTypes: vietnam.VisaType }
          : null,
        destSample,
        addons,
        activeServiceFees: fees,
        appsByStatus,
        accountWebsiteTags: websiteTags,
      },
      null,
      2
    )
  );
}

main()
  .catch((e) => {
    console.error('ERR', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
