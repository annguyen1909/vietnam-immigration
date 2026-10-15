import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

export const dynamic = 'force-dynamic';

const INDEXNOW_KEY = '8a007c04708248508dea02528bbf0ec0';

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorized = secret
    ? request.headers.get('authorization') === `Bearer ${secret}`
    : request.headers.get('user-agent')?.startsWith('vercel-cron') === true;
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const entries = await sitemap();
  const { host, origin } = new URL(entries[0].url);
  const urlList = entries.map((entry) => entry.url).filter((url) => new URL(url).host === host);

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  return NextResponse.json({ status: response.status, submitted: urlList.length });
}
