import { NextRequest, NextResponse } from 'next/server';
import { findAccountByEmail, createAccount, createSession } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, areaCode, phoneNumber, gender, password, websiteCreatedAt } =
      await request.json();

    // Validate input - all fields are required
    if (!email || !fullName || !areaCode || !phoneNumber || !gender || !password) {
      return NextResponse.json(
        {
          error:
            'All fields are required: email, fullName, areaCode, phoneNumber, gender, password',
        },
        { status: 400 }
      );
    }

    // Check if password meets requirements
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    // Check if account already exists with the same email for this website
    const existingAccount = await findAccountByEmail(email, websiteCreatedAt);
    if (existingAccount) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create new account
    const account = await createAccount({
      id: randomUUID(),
      email,
      fullName,
      areaCode,
      phoneNumber,
      gender,
      password,
      websiteCreatedAt: websiteCreatedAt || 'Vietnam Local Site',
    });

    // Create session
    const sessionToken = await createSession(account.id);

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        account: {
          id: account.id,
          email: account.email,
          fullName: account.fullName,
          areaCode: account.areaCode,
          phoneNumber: account.phoneNumber,
          gender: account.gender,
          websiteCreatedAt: account.websiteCreatedAt,
        },
      },
      { status: 201 }
    );

    // Set session cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    };

    response.cookies.set('session_token', sessionToken, cookieOptions);

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
