import type { NextRequest } from 'next/server';

const ALLOWED = new Set(['bing', 'google', 'direct', 'other']);

export function landingSourceFromRequest(request: NextRequest): string {
  const cookie = request.cookies.get('land')?.value;
  if (cookie && ALLOWED.has(cookie)) return cookie;
  const referrer = request.headers.get('referer');
  if (!referrer) return 'direct';
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === 'bing.com' || host.endsWith('.bing.com')) return 'bing';
    if (host.split('.').includes('google')) return 'google';
    return 'other';
  } catch {
    return 'other';
  }
}
