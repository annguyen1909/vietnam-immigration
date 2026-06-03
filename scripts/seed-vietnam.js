/**
 * Seed Vietnam destination and visa types for local/dev databases.
 * Aligned with united-evisa/lib/countries/vietnam.ts
 * Usage: node scripts/seed-vietnam.js
 */
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

const docs = JSON.stringify(['Passport', 'Passport photo', 'Travel itinerary']);

/** Standard processing: fastest (rush/urgent) → typical (normal). */
const STANDARD_WAIT_TIME = 'Within 5 business days';
const INVERTED_WAIT_TIME = 'From 3 working days to 1 working day';
const LEGACY_WAIT_TIME = 'From 1 working day to 3 working days';

async function main() {
  const destinationId = 'vietnam';

  await prisma.destination.upsert({
    where: { id: destinationId },
    create: { id: destinationId, name: 'Vietnam', code: 'VN' },
    update: { name: 'Vietnam', code: 'VN' },
  });

  const visaTypes = [
    {
      id: 'vietnam-tourist-single-90-days',
      name: 'Tourist eVisa (Single Entry for 90 days)',
      waitTime: STANDARD_WAIT_TIME,
      fees: 55,
      requiredDocuments: docs,
      allowedNationalities: null,
    },
    {
      id: 'vietnam-tourist-multiple-90-days',
      name: 'Tourist eVisa (Multiple Entries for 90 days)',
      waitTime: STANDARD_WAIT_TIME,
      fees: 80,
      requiredDocuments: docs,
      allowedNationalities: null,
    },
    {
      id: 'vietnam-business-single-90-days',
      name: 'Business eVisa (Single Entry for 90 days)',
      waitTime: STANDARD_WAIT_TIME,
      fees: 55,
      requiredDocuments: docs,
      allowedNationalities: null,
    },
    {
      id: 'vietnam-business-multiple-90-days',
      name: 'Business eVisa (Multiple Entries for 90 days)',
      waitTime: STANDARD_WAIT_TIME,
      fees: 80,
      requiredDocuments: docs,
      allowedNationalities: null,
    },
  ];

  const fixedInverted = await prisma.visaType.updateMany({
    where: { destinationId, waitTime: INVERTED_WAIT_TIME },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  const fixedLegacy = await prisma.visaType.updateMany({
    where: { destinationId, waitTime: LEGACY_WAIT_TIME },
    data: { waitTime: STANDARD_WAIT_TIME },
  });
  if (fixedInverted.count > 0 || fixedLegacy.count > 0) {
    console.log(
      `Fixed waitTime: inverted=${fixedInverted.count}, legacy=${fixedLegacy.count}`
    );
  }

  for (const vt of visaTypes) {
    await prisma.visaType.upsert({
      where: { name_destinationId: { name: vt.name, destinationId } },
      create: { ...vt, destinationId },
      update: {
        waitTime: vt.waitTime,
        fees: vt.fees,
        requiredDocuments: vt.requiredDocuments,
      },
    });
  }

  const existingFee = await prisma.serviceFeeConfig.findFirst({
    where: { destinationId, visaTypeId: null, isActive: true },
  });

  if (existingFee) {
    await prisma.serviceFeeConfig.update({
      where: { id: existingFee.id },
      data: { serviceFee: 59.99 },
    });
  } else {
    await prisma.serviceFeeConfig.create({
      data: {
        destinationId,
        visaTypeId: null,
        serviceFee: 59.99,
        isActive: true,
      },
    });
  }

  console.log(
    'Seeded Vietnam: 4 visa types (tourist/business, single/multiple, 90 days) + service fee.'
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
