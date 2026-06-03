/**
 * Read-only Vietnam prod checklist. Uses PROD_DATABASE_URL from .env / .env.local.
 * Usage: node scripts/verify-vietnam-prod.js
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

const root = path.join(__dirname, '..');
loadEnvFile(path.join(root, '.env'));
loadEnvFile(path.join(root, '.env.local'));

const url = process.env.PROD_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  console.error('Set PROD_DATABASE_URL in .env');
  process.exit(1);
}

const host = (url.match(/@([^/]+)/) || [])[1]?.split('?')[0] || '';
if (host.includes('round-thunder')) {
  console.error('Refusing: DEV host. Use PROD_DATABASE_URL.');
  process.exit(1);
}

process.env.DATABASE_URL = url;
const prisma = new PrismaClient();

const CANON = {
  serviceFee: 59.99,
  insurance: 69,
  urgencyUrgent: 110,
  urgencySuper: 220,
  waitTime: 'Within 5 business days',
  govSingle: 55,
  govMultiple: 80,
};

async function main() {
  console.log(`Host: ${host}\n`);

  const fee = await prisma.serviceFeeConfig.findFirst({
    where: { destinationId: null, visaTypeId: null, isActive: true },
    select: { serviceFee: true },
  });

  const vts = await prisma.visaType.findMany({
    where: { destinationId: 'vietnam' },
    select: { id: true, name: true, fees: true, waitTime: true },
    orderBy: { id: 'asc' },
  });

  const ins = await prisma.addOnConfig.findFirst({
    where: { name: 'Travel Insurance - 30 days to Vietnam', isActive: true },
    select: { pricePerPax: true },
  });

  const urgency = await prisma.addOnConfig.findMany({
    where: {
      isActive: true,
      type: { equals: 'urgency', mode: 'insensitive' },
      name: { contains: 'Vietnam', mode: 'insensitive' },
    },
    select: { name: true, pricePerPax: true },
    orderBy: { name: 'asc' },
  });

  const checks = [];

  checks.push({
    item: 'Global service fee',
    ok: fee?.serviceFee === CANON.serviceFee,
    got: fee?.serviceFee,
    want: CANON.serviceFee,
  });

  checks.push({
    item: 'Insurance Vietnam',
    ok: ins?.pricePerPax === CANON.insurance,
    got: ins?.pricePerPax,
    want: CANON.insurance,
  });

  const urgent = urgency.find((u) => /Urgent - 48/i.test(u.name));
  const superU = urgency.find((u) => /Super Urgent/i.test(u.name));
  checks.push({
    item: 'Urgent add-on',
    ok: urgent?.pricePerPax === CANON.urgencyUrgent,
    got: urgent?.pricePerPax,
    want: CANON.urgencyUrgent,
  });
  checks.push({
    item: 'Super Urgent add-on',
    ok: superU?.pricePerPax === CANON.urgencySuper,
    got: superU?.pricePerPax,
    want: CANON.urgencySuper,
  });

  const waitOk = vts.length === 4 && vts.every((v) => v.waitTime === CANON.waitTime);
  checks.push({
    item: 'All 4 visa waitTime',
    ok: waitOk,
    got: vts.map((v) => v.waitTime).join(' | '),
    want: CANON.waitTime,
  });

  const feesOk = vts.every(
    (v) =>
      (v.id.includes('single') && v.fees === CANON.govSingle) ||
      (v.id.includes('multiple') && v.fees === CANON.govMultiple)
  );
  checks.push({
    item: 'Gov fees $55/$80',
    ok: feesOk,
    got: vts.map((v) => `${v.id}=$${v.fees}`).join(', '),
    want: '55/80',
  });

  const namesOk = vts.every((v) => /eVisa/.test(v.name));
  checks.push({
    item: 'Visa names use eVisa',
    ok: namesOk,
    got: vts.map((v) => v.name).join('; '),
    want: 'eVisa casing',
  });

  let pass = 0;
  for (const c of checks) {
    const mark = c.ok ? 'PASS' : 'FAIL';
    if (c.ok) pass++;
    console.log(`${mark}  ${c.item}`);
    console.log(`      want: ${c.want}`);
    console.log(`      got:  ${c.got}\n`);
  }

  console.log(`Result: ${pass}/${checks.length} checks passed`);
  process.exit(pass === checks.length ? 0 : 1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
