import { NextRequest, NextResponse } from 'next/server';
import { getServiceFee } from '@/lib/serviceFee';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const destinationId = searchParams.get('destinationId');
    const visaTypeId = searchParams.get('visaTypeId');

    if (!destinationId || !visaTypeId) {
      return NextResponse.json(
        { error: 'destinationId and visaTypeId are required' },
        { status: 400 }
      );
    }

    const serviceFee = await getServiceFee(destinationId, visaTypeId);

    return NextResponse.json({ serviceFee });
  } catch (error) {
    console.error('Error fetching service fee:', error);
    return NextResponse.json({ error: 'Failed to fetch service fee' }, { status: 500 });
  }
}
