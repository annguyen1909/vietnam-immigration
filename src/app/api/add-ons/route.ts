import { NextRequest, NextResponse } from 'next/server';
import { CATALOG_CACHE_HEADERS, getCachedAddOns } from '@/lib/catalogCache';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const addOns = await getCachedAddOns(searchParams.get('type'), searchParams.get('name'));
    return NextResponse.json({ addOns }, { headers: CATALOG_CACHE_HEADERS });
  } catch (error) {
    console.error('Error fetching add-ons:', error);
    return NextResponse.json({ error: 'Failed to fetch add-ons' }, { status: 500 });
  }
}
