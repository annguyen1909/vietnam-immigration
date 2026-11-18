import { NextRequest, NextResponse } from 'next/server';
import { CATALOG_CACHE_HEADERS } from '@/lib/catalogCache';
import { getVisaTypesByDestination } from '@/lib/vietnamVisa';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const visaTypes = await getVisaTypesByDestination(id);
    return NextResponse.json(visaTypes, { headers: CATALOG_CACHE_HEADERS });
  } catch (error) {
    console.error('Error fetching visa types:', error);
    return NextResponse.json({ error: 'Failed to fetch visa types' }, { status: 500 });
  }
}
