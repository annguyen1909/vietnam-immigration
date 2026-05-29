import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    // Get the current user session
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accountData = await validateSession(sessionToken);

    if (!accountData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, email, areaCode, phoneNumber, gender } = body;

    // Validate required fields
    if (!fullName || !email) {
      return NextResponse.json({ error: 'Full name and email are required' }, { status: 400 });
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.account.findFirst({
      where: {
        email: email.toLowerCase(),
        id: { not: accountData.id },
      },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email address is already in use' }, { status: 400 });
    }

    // Update the user profile
    const updatedUser = await prisma.account.update({
      where: { id: accountData.id },
      data: {
        fullName,
        email: email.toLowerCase(),
        areaCode: areaCode || null,
        phoneNumber: phoneNumber || null,
        gender: gender || null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        areaCode: updatedUser.areaCode,
        phoneNumber: updatedUser.phoneNumber,
        gender: updatedUser.gender,
        websiteCreatedAt: updatedUser.websiteCreatedAt,
        createdAt: updatedUser.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
