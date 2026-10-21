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
const countryMatch = countrySrc.match(
  /export const INDEXABLE_COUNTRY_SLUGS = \[([\s\S]*?)\] as const/
);
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
assert.equal(visa, 10, `expected 10 visa posts, got ${visa}`);
assert.equal(travel, 0, `travel posts were removed (410); found ${travel}`);

// Retired URLs: travel posts answer 410 from middleware, merged guides 301 from next.config.mjs.
const goneSrc = read('src/data/retiredUrls.ts');
const gonePaths = [...goneSrc.matchAll(/'(\/blog\/[a-z0-9-]+)'/g)].map((m) => m[1]);
assert.equal(gonePaths.length, 18, `expected 18 gone paths, got ${gonePaths.length}`);
assert.match(read('src/middleware.ts'), /GONE_PATHS\.has\(pathname\)/);

const configSrc = read('next.config.mjs');
const redirects = [...configSrc.matchAll(/\['(\/[a-z0-9/-]+)', '(\/[a-z0-9/-]+)'\]/g)].map((m) => [
  m[1],
  m[2],
]);
assert.equal(redirects.length, 11, `expected 11 merged-guide redirects, got ${redirects.length}`);

const contentFile = (urlPath) => {
  const [, section, slug] = urlPath.split('/');
  const dir = { blog: 'news', faq: 'faqs', troubleshooting: 'troubleshooting' }[section];
  return dir && slug ? `src/data/${dir}/${slug}.md` : null;
};
for (const gone of gonePaths) {
  assert.equal(
    fs.existsSync(path.join(root, contentFile(gone))),
    false,
    `${gone} still has content`
  );
}
for (const [from, to] of redirects) {
  assert.equal(
    fs.existsSync(path.join(root, contentFile(from))),
    false,
    `${from} still has content`
  );
  const target = contentFile(to);
  if (target) assert.ok(fs.existsSync(path.join(root, target)), `${from} -> ${to} has no target`);
}

// Nothing on the site may link to a retired URL.
const retired = [...gonePaths, ...redirects.map(([from]) => from)];
const sources = ['src/data/news', 'src/data/faqs', 'src/data/troubleshooting'].flatMap((dir) =>
  fs
    .readdirSync(path.join(root, dir))
    .filter((f) => f.endsWith('.md'))
    .map((f) => `${dir}/${f}`)
);
for (const rel of sources) {
  const text = read(rel);
  for (const url of retired) {
    assert.equal(new RegExp(`${url}(?![\\w-])`).test(text), false, `${rel} links to ${url}`);
  }
}

// Government fees must match evisa.gov.vn; our margin belongs in the service fee.
const pricingSrc = read('src/lib/vietnamPricing.ts');
assert.match(pricingSrc, /VIETNAM_GOV_FEE_SINGLE = 25;/);
assert.match(pricingSrc, /VIETNAM_GOV_FEE_MULTIPLE = 50;/);

const countryPage = read('src/app/check-requirement/[slug]/page.tsx');
assert.equal(countryPage.includes('Official Visa Information'), false);
assert.equal(countryPage.includes('FAQSchema'), false);
assert.equal(countryPage.includes('HowToSchema'), false);

console.log(
  `index policy ok: ${countrySlugs.length} countries, ${visa} visa posts, ${gonePaths.length} gone, ${redirects.length} redirects`
);
