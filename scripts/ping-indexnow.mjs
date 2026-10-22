import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const siteUrl = 'https://vietnamemigration.com';
const pub = join(process.cwd(), 'public');
const name = readdirSync(pub).find((file) => /^[a-f0-9]{32}\.txt$/.test(file));
if (!name) {
  console.error('missing IndexNow key file in public/');
  process.exit(1);
}
const key = readFileSync(join(pub, name), 'utf8').trim();
const host = new URL(siteUrl).host;

const staticPaths = ["/","/blog","/faq","/fees","/check-requirement","/about","/contact","/troubleshooting"];

function collectSlugs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf8');
      const slugMatch = raw.match(/^slug:\s*["']?([^"'\r\n]+)["']?/m);
      return slugMatch ? slugMatch[1].trim() : file.replace(/\.md$/, '');
    });
}

const blogUrls = collectSlugs(join(process.cwd(), 'src/data/news')).map(
  (slug) => `${siteUrl}/blog/${slug}`
);
const faqUrls = collectSlugs(join(process.cwd(), 'src/data/faqs')).map(
  (slug) => `${siteUrl}/faq/${slug}`
);
const troubleshootingUrls = collectSlugs(join(process.cwd(), 'src/data/troubleshooting')).map(
  (slug) => `${siteUrl}/troubleshooting/${slug}`
);

const countriesRaw = readFileSync(join(process.cwd(), 'src/data/countries.ts'), 'utf8');
const countryUrls = [];
for (const match of countriesRaw.matchAll(/name:\s*["']([^"']+)["']/g)) {
  const countryName = match[1];
  const slug = countryName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
  if (slug) countryUrls.push(`${siteUrl}/check-requirement/${slug}`);
}

const urlList = [
  ...new Set([
    ...staticPaths.map((p) => (p === '/' ? siteUrl : `${siteUrl}${p}`)),
    ...blogUrls,
    ...faqUrls,
    ...troubleshootingUrls,
    ...countryUrls,
  ]),
];

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList,
  }),
});
const body = await res.text();
console.log(`${host} ${res.status} ${urlList.length} urls ${body}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
