import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
