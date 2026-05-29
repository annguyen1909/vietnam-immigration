import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '../../../../generated/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const name = searchParams.get('name');

    const whereClause: Prisma.AddOnConfigWhereInput = { isActive: true };

    if (type) {
      whereClause.type = { equals: type, mode: 'insensitive' };
    }

    if (name) {
      whereClause.name = name;
    }

    const addOns = await prisma.addOnConfig.findMany({
      where: whereClause,
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    });

    return NextResponse.json({ addOns });
  } catch (error) {
    console.error('Error fetching add-ons:', error);
    return NextResponse.json({ error: 'Failed to fetch add-ons' }, { status: 500 });
  }
}
