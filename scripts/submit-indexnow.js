/**
 * Submit all URLs from sitemap.xml to Bing IndexNow.
 *
 * Prerequisites:
 *   public/{INDEXNOW_KEY}.txt must be live on the site.
 *
 * Usage:
 *   node scripts/submit-indexnow.js
 *   SITE_URL=https://vietnamemigration.com node scripts/submit-indexnow.js
 *
 * Optional env:
 *   SITE_URL or NEXT_PUBLIC_SITE_URL — default https://vietnamemigration.com
 *   INDEXNOW_KEY — default 8a007c04708248508dea02528bbf0ec0
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '8a007c04708248508dea02528bbf0ec0';
const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://vietnamemigration.com'
).replace(/\/$/, '');
const host = new URL(siteUrl).host;
const keyLocation = `${siteUrl}/${INDEXNOW_KEY}.txt`;
const BATCH_SIZE = 10_000;

function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

async function verifyKeyFile() {
  const res = await fetch(keyLocation);
  if (!res.ok) {
    throw new Error(
      `Key file not reachable (${res.status}): ${keyLocation}\nDeploy public/${INDEXNOW_KEY}.txt first.`
    );
  }
  const body = (await res.text()).trim();
  if (body !== INDEXNOW_KEY) {
    throw new Error(`Key file content mismatch at ${keyLocation}`);
  }
}

async function fetchSitemapUrls() {
  const res = await fetch(`${siteUrl}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed (${res.status}): ${siteUrl}/sitemap.xml`);
  }
  const urls = parseSitemapUrls(await res.text());
  if (urls.length === 0) {
    throw new Error('No URLs found in sitemap.xml');
  }
  return urls;
}

async function submitBatch(urlList) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation,
      urlList,
    }),
  });

  const text = await res.text();
  return { status: res.status, text };
}

async function main() {
  console.log(`Site: ${siteUrl}`);
  console.log(`Key:  ${keyLocation}`);

  await verifyKeyFile();
  console.log('Key file OK');

  const urls = await fetchSitemapUrls();
  console.log(`Sitemap: ${urls.length} URLs`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const { status, text } = await submitBatch(batch);

    if (status === 200 || status === 202) {
      console.log(`Batch ${batchNum}: HTTP ${status} — submitted ${batch.length} URLs`);
    } else {
      console.error(`Batch ${batchNum}: HTTP ${status}`);
      if (text) console.error(text);
      process.exit(1);
    }
  }

  console.log('IndexNow submission complete.');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
