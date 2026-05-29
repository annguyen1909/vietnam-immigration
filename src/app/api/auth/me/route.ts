import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ account: null });
    }

    const accountData = await validateSession(sessionToken);

    if (!accountData) {
      // Clear invalid cookie
      const response = NextResponse.json({ account: null });
      response.cookies.set('session_token', '', { maxAge: -1 });
      return response;
    }

    return NextResponse.json({ account: accountData });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ account: null, error: 'Internal server error' }, { status: 500 });
  }
}
