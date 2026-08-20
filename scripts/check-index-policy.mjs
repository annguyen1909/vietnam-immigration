import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

const countrySrc = read('src/data/indexableCountrySlugs.ts');
const countryMatch = countrySrc.match(/export const INDEXABLE_COUNTRY_SLUGS = \[([\s\S]*?)\] as const/);
assert.ok(countryMatch, 'INDEXABLE_COUNTRY_SLUGS array missing');
const countrySlugs = [...countryMatch[1].matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1]);
assert.equal(countrySlugs.length, 8, `expected 8 indexable countries, got ${countrySlugs.length}`);

const faqSrc = read('src/data/indexableFaqSlugs.ts');
assert.equal(faqSrc.includes("'vietnam-country-codes'"), false);

const sitemapSrc = read('src/lib/sitemap/index.ts');
assert.match(sitemapSrc, /includeEntry:\s*isVisaGuide/);
assert.equal(sitemapSrc.includes('TRAVEL_PILLAR_SLUGS'), false);

const newsDir = path.join(root, 'src/data/news');
const posts = fs.readdirSync(newsDir).filter((f) => f.endsWith('.md'));
let visa = 0;
let travel = 0;
for (const file of posts) {
  const { data } = matter(fs.readFileSync(path.join(newsDir, file), 'utf8'));
  if (Array.isArray(data.tags) && data.tags.includes('visa')) visa += 1;
  else travel += 1;
}
assert.equal(visa, 12, `expected 12 visa posts, got ${visa}`);
assert.equal(travel, 18, `expected 18 travel posts left live-but-noindex, got ${travel}`);

const countryPage = read('src/app/check-requirement/[slug]/page.tsx');
assert.equal(countryPage.includes('Official Visa Information'), false);
assert.equal(countryPage.includes('FAQSchema'), false);
assert.equal(countryPage.includes('HowToSchema'), false);

console.log(
  `index policy ok: ${countrySlugs.length} countries, ${visa} visa posts indexed, ${travel} travel noindex`
);
