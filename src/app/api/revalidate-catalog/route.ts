import { createHash, timingSafeEqual } from 'crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { CATALOG_TAG, CATALOG_TTL_SECONDS } from '@/lib/catalogCache';

export const dynamic = 'force-dynamic';

const digest = (value: string) => createHash('sha256').update(value).digest();

/** Called by BudPal CRM whenever visa types, fees, add-ons or destinations change. */
export async function POST(request: NextRequest) {
  const secret = process.env.CATALOG_REVALIDATE_SECRET;
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/i)?.[1];
  if (!secret || !token || !timingSafeEqual(digest(token), digest(secret))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  revalidateTag(CATALOG_TAG);
  return NextResponse.json({ revalidated: true, ttlSeconds: CATALOG_TTL_SECONDS });
}
