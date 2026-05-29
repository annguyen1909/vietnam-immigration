import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { getPublicSiteUrl } from '@/lib/seo';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.account.findFirst({
      where: {
        email: email.toLowerCase(),
        websiteCreatedAt: 'Vietnam Local Site',
      },
    });

    if (!user) {
      // For security, don't reveal if the email exists or not
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, you will receive a password reset link.',
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Create password reset token
    await prisma.passwordResetToken.create({
      data: {
        accountId: user.id,
        token,
        expiresAt,
        used: false,
      },
    });

    const resetUrl = `${getPublicSiteUrl()}/reset-password/${token}`;

    // Send reset email
    const emailResult = await sendEmail({
      to: user.email,
      template: 'reset-password',
      data: {
        name: user.fullName,
        token,
      },
    });

    // Resend test mode: only delivers to the Resend account email (onboarding@resend.dev).
    // Log link locally so any Step-1 email can be tested without domain verification.
    if (process.env.NODE_ENV !== 'production') {
      console.log('[DEV] Password reset link (copy into browser):', resetUrl);
      if (!emailResult.success) {
        console.warn('[DEV] Resend did not send email:', emailResult.error);
        console.warn(
          '[DEV] Use the account email registered with Resend, or open the link above directly.'
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
