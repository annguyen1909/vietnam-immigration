// Fetch candidate Vietnam images from Wikimedia Commons for visual review.
// Usage: node scripts/fetch-image-candidates.mjs <key> "<search query>"
// Downloads up to 6 landscape candidates to .img-candidates/<key>__<n>.jpg
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const OUT_DIR = resolve(process.cwd(), '.img-candidates');
const UA = 'vn-blog-image-bot/1.0 (contact: editor@vietnamemigration.com)';

async function api(params) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`API ${res.status} for ${url}`);
  return res.json();
}

async function search(query) {
  const data = await api({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `${query} filemime:image/jpeg`,
    gsrnamespace: '6',
    gsrlimit: '20',
    prop: 'imageinfo',
    iiprop: 'url|size|mime|extmetadata',
    iiurlwidth: '1280',
  });
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  return pages
    .map((p) => ({ title: p.title, info: p.imageinfo?.[0] }))
    .filter((p) => p.info && p.info.mime === 'image/jpeg')
    // landscape only, decent resolution
    .filter((p) => p.info.width >= p.info.height * 1.25 && p.info.width >= 1200)
    .slice(0, 6);
}

async function fetchFor(key, query) {
  const results = await search(query);
  if (!results.length) {
    console.log(`NO CANDIDATES for "${key}" (${query})`);
    return;
  }
  let n = 0;
  for (const r of results) {
    n += 1;
    const out = resolve(OUT_DIR, `${key}__${n}.jpg`);
    await mkdir(dirname(out), { recursive: true });
    const res = await fetch(r.info.thumburl, { headers: { 'User-Agent': UA } });
    if (!res.ok) {
      console.log(`  HTTP ${res.status} for ${key}__${n} — retrying after pause`);
      await sleep(3000);
      const retry = await fetch(r.info.thumburl, { headers: { 'User-Agent': UA } });
      if (!retry.ok) {
        console.log(`  FAILED ${key}__${n} (${retry.status})`);
        continue;
      }
      await writeFile(out, Buffer.from(await retry.arrayBuffer()));
    } else {
      const ct = res.headers.get('content-type') || '';
      if (!ct.startsWith('image/')) {
        console.log(`  NON-IMAGE (${ct}) for ${key}__${n} — skipping`);
        continue;
      }
      await writeFile(out, Buffer.from(await res.arrayBuffer()));
    }
    console.log(`${key}__${n}.jpg | ${r.title.replace('File:', '')} | ${r.info.width}x${r.info.height}`);
    await sleep(400);
  }
  await sleep(800);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const [arg1, arg2] = process.argv.slice(2);
  // Batch mode: pass path to JSON file of [{key, query}, ...]
  if (arg1 === '--batch') {
    const { readFile } = await import('node:fs/promises');
    const list = JSON.parse(await readFile(resolve(process.cwd(), arg2), 'utf8'));
    for (const { key, query } of list) {
      try {
        await fetchFor(key, query);
      } catch (e) {
        console.log(`ERROR for ${key}: ${e.message}`);
      }
    }
    return;
  }
  if (!arg1 || !arg2) {
    console.error('Usage: node scripts/fetch-image-candidates.mjs <key> "<query>" | --batch <file.json>');
    process.exit(1);
  }
  await fetchFor(arg1, arg2);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
