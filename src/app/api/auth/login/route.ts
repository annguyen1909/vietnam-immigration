import { NextRequest, NextResponse } from 'next/server';
import { findAccountByEmail, verifyPassword, createSession } from '@/lib/auth';
import { loginRateLimit } from '@/lib/rateLimit';
import { sanitizeEmail, sanitizeText } from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Rate limiting
    const clientIP =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const rateLimitResult = loginRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many login attempts. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      );
    }

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Sanitize inputs
    let sanitizedEmail: string;
    let sanitizedPassword: string;

    try {
      sanitizedEmail = sanitizeEmail(email);
      sanitizedPassword = sanitizeText(password);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    // Find account by email (for Vietnam Local Site)
    const account = await findAccountByEmail(sanitizedEmail, 'Vietnam Local Site');
    if (!account) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check if account has a password
    if (!account.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await verifyPassword(sanitizedPassword, account.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

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
      { status: 200 }
    );

    // Set session cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
    };

    response.cookies.set('session_token', sessionToken, cookieOptions);

    // Add rate limit headers to successful response
    response.headers.set('X-RateLimit-Limit', '5');
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
