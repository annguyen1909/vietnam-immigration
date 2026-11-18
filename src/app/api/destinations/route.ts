import { NextResponse } from 'next/server';
import { CATALOG_CACHE_HEADERS, getCachedDestinations } from '@/lib/catalogCache';

export async function GET() {
  try {
    const destinations = await getCachedDestinations();
    return NextResponse.json(destinations, { headers: CATALOG_CACHE_HEADERS });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}
