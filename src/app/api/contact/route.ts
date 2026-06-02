import { NextRequest, NextResponse } from 'next/server';
import { contactFormRateLimit } from '@/lib/rateLimit';
import { sanitizeText, sanitizeEmail, sanitizePhone } from '@/lib/sanitize';
import { getResend } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const rateLimitResult = contactFormRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: 'Too many contact form submissions. Please try again later.',
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

    const { fullName, email, countryCode, phone, subject, message, website } = await request.json();

    // HONEYPOT DETECTION: If website field is filled, it's a bot
    if (website && website.trim() !== '') {
      const clientIP =
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'unknown';
      console.warn(
        `[SECURITY] HONEYPOT-FORM|IP=${clientIP}|EMAIL=${email || 'unknown'}|WEBSITE=${website}`
      );
      // Return success to bot (don't reveal it's detected)
      return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 });
    }

    if (!fullName || !email || !countryCode || !phone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Sanitize all inputs
    let sanitizedFullName: string;
    let sanitizedEmail: string;
    let sanitizedCountryCode: string;
    let sanitizedPhone: string;
    let sanitizedSubject: string;
    let sanitizedMessage: string;

    try {
      sanitizedFullName = sanitizeText(fullName);
      sanitizedEmail = sanitizeEmail(email);
      sanitizedCountryCode = sanitizeText(countryCode);
      sanitizedPhone = sanitizePhone(phone);
      sanitizedSubject = subject ? sanitizeText(subject) : '';
      sanitizedMessage = sanitizeText(message);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    // Generate a short unique ID (e.g., 8 chars: timestamp + random)
    const uniqueId =
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      '-' +
      Date.now().toString().slice(-4);
    const subjectLine = `You got a message from contact form [${uniqueId}]`;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;">
        <div style="background: linear-gradient(90deg, #0A284B 0%, #1E3A8A 100%); color: white; padding: 24px 32px;">
          <h2 style="margin: 0; font-size: 24px;">New Contact Form Message</h2>
        </div>
        <div style="padding: 24px 32px;">
          <p style="font-size: 16px; margin-bottom: 24px;">You received a new message from the Vietnam eVisa contact form. Here are the details:</p>
          <table style="width: 100%; font-size: 16px; border-collapse: collapse;">
            <tr><td style="font-weight: bold; padding: 8px 0;">Full Name:</td><td>${sanitizedFullName}</td></tr>
            <tr><td style="font-weight: bold; padding: 8px 0;">Email:</td><td>${sanitizedEmail}</td></tr>
            <tr><td style="font-weight: bold; padding: 8px 0;">Phone:</td><td>${sanitizedCountryCode} ${sanitizedPhone}</td></tr>
            ${sanitizedSubject ? `<tr><td style='font-weight: bold; padding: 8px 0;'>Subject:</td><td>${sanitizedSubject}</td></tr>` : ''}
            <tr><td style="font-weight: bold; padding: 8px 0; vertical-align: top;">Message:</td><td style="white-space: pre-line;">${sanitizedMessage}</td></tr>
          </table>
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
            <p><strong>Message ID:</strong> ${uniqueId}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>IP Address:</strong> ${clientIP}</p>
          </div>
        </div>
      </div>
    `;

    const text = `New Contact Form Message\n\nFull Name: ${sanitizedFullName}\nEmail: ${sanitizedEmail}\nPhone: ${sanitizedCountryCode} ${sanitizedPhone}\n${sanitizedSubject ? `Subject: ${sanitizedSubject}\n` : ''}Message:\n${sanitizedMessage}\n\nThis message was sent from the Vietnam eVisa website contact form.\nUnique ID: ${uniqueId}`;

    await getResend().emails.send({
      from: 'Vietnam eVisa Support <Visa@vietnamemigration.com>',
      to: ['visa@vietnamemigration.com'],
      subject: subjectLine,
      html: html,
      text,
      replyTo: sanitizedEmail,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    });

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '5');
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());

    return response;
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending your message. Please try again.' },
      { status: 500 }
    );
  }
}
