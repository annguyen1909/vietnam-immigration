import { NextRequest, NextResponse } from 'next/server';
import { sendHoneypotAlert } from '@/lib/email';

/**
 * Test endpoint for honeypot email functionality
 * Usage: GET /api/test-honeypot-email?type=verified|malicious
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'verified';
  const isVerifiedBot = type === 'verified';

  const testIP = isVerifiedBot ? '40.77.167.67' : '192.168.1.100';
  const testPath = isVerifiedBot ? '/faq/visa-renewal-procedure' : '/wp-admin/login';
  const testUA = isVerifiedBot
    ? 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
    : 'Mozilla/5.0 (compatible; BadBot/1.0)';

  console.log(`[TEST] Testing honeypot email for ${type} bot`);

  try {
    const result = await sendHoneypotAlert({
      ip: testIP,
      path: testPath,
      userAgent: testUA,
      referer: isVerifiedBot ? 'https://www.bing.com' : undefined,
      timestamp: new Date(),
      isVerifiedBot,
    });

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: `✅ Email sent successfully for ${type} bot`,
          result,
          details: {
            ip: testIP,
            path: testPath,
            botType: isVerifiedBot ? 'Verified Bot' : 'Malicious Bot',
            emailTo: 'visa@unitedevisa.com',
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: `❌ Email not sent: ${result.error}`,
          result,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('[TEST] Error testing honeypot email:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Exception occurred',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
