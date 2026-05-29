import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { getPublicSiteUrl } from '@/lib/seo';

let resendClient: Resend | null = null;

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  if (!resendClient) {
    resendClient = new Resend(key);
  }
  return resendClient;
}

function isSecurityAlertEmailEnabled(kind: 'honeypot' | 'php-bot'): boolean {
  // Disabled by default to avoid inbox spam.
  // Opt-in by setting env var to the string "true".
  let envKey: 'HONEYPOT_ALERT_EMAILS_ENABLED' | 'PHP_BOT_ALERT_EMAILS_ENABLED';
  if (kind === 'honeypot') {
    envKey = 'HONEYPOT_ALERT_EMAILS_ENABLED';
  } else {
    envKey = 'PHP_BOT_ALERT_EMAILS_ENABLED';
  }
  return process.env[envKey] === 'true';
}

/**
 * Retry helper function with exponential backoff
 * Handles transient network errors (DNS resolution, timeouts, etc.)
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await fn();

      // Check if result has an error field that indicates network issues
      // Resend SDK might return { data, error } instead of throwing
      if (result && typeof result === 'object' && 'error' in result) {
        const errorObj = (result as { error?: { message?: string; name?: string } }).error;
        if (errorObj) {
          const errorMessage = errorObj.message || errorObj.name || '';
          const isNetworkError =
            errorMessage.includes('fetch') ||
            errorMessage.includes('resolve') ||
            errorMessage.includes('Unable to fetch') ||
            errorMessage.includes('could not be resolved') ||
            errorMessage.includes('ECONNREFUSED') ||
            errorMessage.includes('ETIMEDOUT') ||
            errorMessage.includes('ENOTFOUND') ||
            errorMessage.includes('timeout') ||
            errorMessage.includes('network');

          // If it's a network error and we have retries left, retry
          if (isNetworkError && attempt < maxRetries) {
            const delayMs = initialDelayMs * Math.pow(2, attempt);
            console.warn(
              `[RESEND RETRY] Attempt ${attempt + 1}/${maxRetries + 1} failed with network error (${errorMessage}). Retrying in ${delayMs}ms...`
            );
            await new Promise((resolve) => setTimeout(resolve, delayMs));
            continue; // Retry
          }
          // If not a network error or out of retries, return the result (caller will handle the error)
        }
      }

      return result;
    } catch (error) {
      lastError = error;

      // Check if it's a network/DNS error that we should retry
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNetworkError =
        errorMessage.includes('fetch') ||
        errorMessage.includes('resolve') ||
        errorMessage.includes('Unable to fetch') ||
        errorMessage.includes('could not be resolved') ||
        errorMessage.includes('ECONNREFUSED') ||
        errorMessage.includes('ETIMEDOUT') ||
        errorMessage.includes('ENOTFOUND') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('network');

      // Don't retry on last attempt or if it's not a network error
      if (attempt === maxRetries || !isNetworkError) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delayMs = initialDelayMs * Math.pow(2, attempt);
      console.warn(
        `[RESEND RETRY] Attempt ${attempt + 1}/${maxRetries + 1} failed (${errorMessage}). Retrying in ${delayMs}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}

// Rate limiting for honeypot email alerts (prevent email spam)
const honeypotEmailStore = new Map<string, { lastSent: number; count: number }>();

const HONEYPOT_EMAIL_CONFIG = {
  windowMs: 30 * 60 * 1000, // 30 minute window
  maxEmails: 5, // Max 5 emails per IP per 30 minutes
};

// Rate limiting for PHP bot email alerts (prevent email spam)
const phpBotEmailStore = new Map<string, { lastSent: number; count: number }>();

const PHP_BOT_EMAIL_CONFIG = {
  windowMs: 30 * 60 * 1000, // 30 minute window
  maxEmails: 5, // Max 5 emails per IP per 30 minutes
};

// Verified bots list - matches middleware.ts
// Used to identify which specific bot is accessing
const VERIFIED_BOT_PATTERNS = [
  // Major Search Engine Crawlers
  { pattern: /googlebot/i, name: 'Googlebot' },
  { pattern: /bingbot/i, name: 'Bingbot' },
  { pattern: /msnbot/i, name: 'MSNBot' },
  { pattern: /slurp/i, name: 'Yahoo Slurp' },
  { pattern: /duckduckbot/i, name: 'DuckDuckBot' },
  { pattern: /baiduspider/i, name: 'Baiduspider' },
  { pattern: /yandexbot/i, name: 'YandexBot' },
  { pattern: /yandex/i, name: 'Yandex' },
  { pattern: /sogou/i, name: 'Sogou' },
  { pattern: /exabot/i, name: 'Exabot' },
  { pattern: /ia_archiver/i, name: 'Alexa/Internet Archive' },
  { pattern: /archive\.org_bot/i, name: 'Archive.org Bot' },
  { pattern: /megaindex/i, name: 'MegaIndex' },

  // Social Media Bots
  { pattern: /facebookexternalhit/i, name: 'Facebook External Hit' },
  { pattern: /facebookcatalog/i, name: 'Facebook Catalog' },
  { pattern: /twitterbot/i, name: 'TwitterBot' },
  { pattern: /linkedinbot/i, name: 'LinkedInBot' },
  { pattern: /pinterest/i, name: 'Pinterest' },
  { pattern: /instagram/i, name: 'Instagram' },
  { pattern: /whatsapp/i, name: 'WhatsApp' },
  { pattern: /telegrambot/i, name: 'TelegramBot' },
  { pattern: /discordbot/i, name: 'DiscordBot' },

  // AI Crawlers
  { pattern: /gptbot/i, name: 'GPTBot' },
  { pattern: /chatgpt/i, name: 'ChatGPT' },
  { pattern: /claudebot/i, name: 'ClaudeBot' },
  { pattern: /anthropic/i, name: 'Anthropic' },
  { pattern: /chatgpt-operator/i, name: 'ChatGPT Operator' },
  { pattern: /perplexity/i, name: 'Perplexity' },
  { pattern: /ccbot/i, name: 'Common Crawl' },

  // Monitoring/Uptime Bots
  { pattern: /site24x7/i, name: 'Site24x7' },
  { pattern: /pingdom/i, name: 'Pingdom' },
  { pattern: /uptimerobot/i, name: 'UptimeRobot' },
  { pattern: /statuscake/i, name: 'StatusCake' },
  { pattern: /monitor\.us/i, name: 'Monitor.us' },
  { pattern: /gtmetrix/i, name: 'GTmetrix' },
  { pattern: /pagepeeker/i, name: 'PagePeeker' },
  { pattern: /uptime/i, name: 'Uptime' },

  // SEO/Analytics Bots
  { pattern: /semrushbot/i, name: 'SEMrushBot' },
  { pattern: /ahrefsbot/i, name: 'AhrefsBot' },
  { pattern: /majesticseo/i, name: 'MajesticSEO' },
  { pattern: /mj12bot/i, name: 'MJ12Bot' },
  { pattern: /dotbot/i, name: 'DotBot' },
  { pattern: /moatbot/i, name: 'MoatBot' },
  { pattern: /moz\.com/i, name: 'Moz.com' },

  // News/Syndication Bots
  { pattern: /applebot/i, name: 'Applebot' },
  { pattern: /feedfetcher/i, name: 'Google Feedfetcher' },
  { pattern: /feedburner/i, name: 'FeedBurner' },
  { pattern: /feedly/i, name: 'Feedly' },
  { pattern: /flipboard/i, name: 'Flipboard' },

  // Other Verified Services
  { pattern: /slackbot/i, name: 'SlackBot' },
  { pattern: /redditbot/i, name: 'RedditBot' },
  { pattern: /discourse/i, name: 'Discourse' },
  { pattern: /hubspot/i, name: 'HubSpot' },
  { pattern: /wordpress/i, name: 'WordPress' },
  { pattern: /jetpack/i, name: 'Jetpack' },
  { pattern: /w3c_validator/i, name: 'W3C Validator' },
  { pattern: /validator\.w3\.org/i, name: 'W3C Validator' },
] as const;

/**
 * Identifies which specific verified bot is making the request
 * Returns the bot name if found, null otherwise
 */
function identifyVerifiedBot(userAgent: string): string | null {
  for (const { pattern, name } of VERIFIED_BOT_PATTERNS) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return null;
}

export type EmailTemplate = 'welcome' | 'reset-password' | 'verify-email' | 'payment-confirmation';

interface SendEmailProps {
  to?: string; // 'to' is optional as payment-confirmation will fetch it
  template: EmailTemplate;
  data: Record<string, unknown>;
}

export async function sendEmail({ to, template, data }: SendEmailProps) {
  if (!process.env.RESEND_API_KEY) {
    console.error('FATAL: Resend API key is not configured. Cannot send email.');
    return { success: false, error: 'Resend API key is missing' };
  }

  try {
    // Production: Visa@vietnamimmigration.com (domain must be verified in Resend).
    // Local test: set RESEND_FROM_EMAIL=onboarding@resend.dev (only delivers to your Resend account email).
    const from =
      process.env.RESEND_FROM_EMAIL || 'Vietnam eVisa Support <Visa@vietnamimmigration.com>';
    let subject = '';
    let html = '';
    let recipient = to;

    console.log('Email Service: Received request', { to, template, data });

    switch (template) {
      case 'payment-confirmation': {
        const { applicationId } = data as { applicationId: string };
        if (!applicationId) {
          throw new Error('Application ID is required for payment confirmation email.');
        }

        console.log(`Email Service: Fetching data for application ID: ${applicationId}`);
        const application = await prisma.application.findUnique({
          where: { applicationId },
          include: {
            Account: true,
            VisaType: true,
          },
        });

        if (!application) {
          throw new Error(`Email Service Error: Application with ID ${applicationId} not found.`);
        }
        if (!application.Account?.email) {
          throw new Error(`Email Service Error: No email found for application ${applicationId}.`);
        }

        recipient = application.Account.email;
        const contactName = application.Account?.fullName || 'Customer';
        const governmentFee = application.VisaType?.fees || 0;
        const serviceFee = 59.99;
        const total = application.total || 0;
        const passengerCount = application.passengerCount || 1;
        const appUrl = getPublicSiteUrl();

        subject = `Payment Confirmation for Your Vietnam eVisa (ID: ${application.applicationId})`;
        html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0A284B; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Payment Confirmed</h1>
            </div>
            <div style="padding: 20px;">
              <p>Dear ${contactName},</p>
              <p>Thank you for your payment. Your application for the Vietnam eVisa has been successfully submitted and is now being processed.</p>
              
              <div style="background-color: #f9f9f9; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <h2 style="font-size: 18px; color: #0A284B; margin-top: 0;">Application Summary</h2>
                <p><strong>Application ID:</strong> <span style="font-family: monospace; background-color: #eee; padding: 2px 5px; border-radius: 4px;">${application.applicationId}</span></p>
                <p><strong>Primary Contact:</strong> ${recipient}</p>
                <p><strong>Total Passengers:</strong> ${passengerCount}</p>
              </div>

              <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px;">
                <h2 style="font-size: 18px; color: #0A284B; margin-top: 0;">Order Summary</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0;">Government Fee:</td>
                    <td style="padding: 8px 0; text-align: right;">$${governmentFee.toFixed(2)} x ${passengerCount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0;">Service Fee:</td>
                    <td style="padding: 8px 0; text-align: right;">$${serviceFee.toFixed(2)} x ${passengerCount}</td>
                  </tr>
                  <tr style="font-weight: bold;">
                    <td style="padding: 8px 0; border-top: 1px solid #ddd;">Total Paid:</td>
                    <td style="padding: 8px 0; border-top: 1px solid #ddd; text-align: right;">$${total.toFixed(2)}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <h2 style="font-size: 18px; color: #0A284B;">What's Next?</h2>
                <p>You may need to upload documents for some or all passengers on your application. Please proceed to the document upload step.</p>
                <a href="${appUrl}/apply?applicationId=${application.applicationId}" style="display: inline-block; background-color: #FFCD00; color: #0A284B; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; margin-top: 10px;">
                  Continue to Document Upload
                </a>
              </div>
            </div>
            <div style="background-color: #f0f0f0; padding: 15px; font-size: 12px; text-align: center; color: #666;">
              <p>If you have any questions, please contact our 24/7 support.</p>
              <p>&copy; ${new Date().getFullYear()} Vietnam eVisa. All Rights Reserved.</p>
            </div>
          </div>
        `;
        break;
      }

      case 'welcome': {
        if (!recipient) throw new Error('Recipient is required for welcome email');
        const user = await prisma.account.findFirst({ where: { email: recipient } });
        subject = 'Welcome to Vietnam eVisa';
        html = `
          <h1>Welcome to Vietnam eVisa!</h1>
          <p>Dear ${user?.fullName || 'Customer'},</p>
          <p>Thank you for creating an account. We're excited to help you with your visa application process.</p>
          <ul>
            <li><a href="${getPublicSiteUrl()}/apply">Apply for eVisa</a></li>
            <li><a href="${getPublicSiteUrl()}/visa-status">Check Visa Status</a></li>
            <li><a href="${getPublicSiteUrl()}/account">View Your Account</a></li>
          </ul>
          <p>If you need any assistance, please don't hesitate to contact our 24/7 support team.</p>
          <p>Best regards,<br>Vietnam eVisa Team</p>
        `;
        break;
      }

      case 'verify-email': {
        if (!recipient) throw new Error('Recipient is required for email verification');
        const user = await prisma.account.findFirst({ where: { email: recipient } });
        subject = 'Verify Your Email';
        html = `
          <h1>Email Verification</h1>
          <p>Dear ${user?.fullName || 'Customer'},</p>
          <p>Please verify your email address by clicking the link below:</p>
          <p><a href="${getPublicSiteUrl()}/verify-email/${data?.token}">Verify Email</a></p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>Vietnam eVisa Team</p>
        `;
        break;
      }

      // Other cases like 'welcome', 'reset-password'
      case 'reset-password': {
        if (!recipient) throw new Error('Recipient is required for reset-password');
        const user = await prisma.account.findFirst({ where: { email: recipient } });
        subject = 'Reset Your Password';
        html = `
          <h1>Password Reset Request</h1>
          <p>Dear ${user?.fullName || 'Customer'},</p>
          <p>We received a request to reset your password. Click the link below to set a new password:</p>
          <p>
            <a href="${getPublicSiteUrl()}/reset-password/${data?.token}">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>Vietnam eVisa Team</p>
        `;
        break;
      }

      default: {
        // Fallback for other templates that require a 'to' address
        if (!recipient) {
          throw new Error(`No recipient email address provided for template: ${template}`);
        }
        subject = 'Vietnam eVisa Notification';
        html = `<p>This is a default notification from Vietnam eVisa.</p>`;
        break;
      }
    }

    if (!recipient) {
      throw new Error(`No recipient email address could be determined for template: ${template}`);
    }

    console.log('Sending email with config:', { from, to: recipient, subject });

    const result = await getResend().emails.send({
      from,
      to: recipient,
      subject,
      html,
    });

    console.log('Email send result:', result);
    return { success: true, data: result };
  } catch (error) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Send honeypot alert email when malicious bot hits honeypot URLs
 * Rate limited to prevent email spam (max 1 email per IP per hour)
 */
export async function sendHoneypotAlert(params: {
  ip: string;
  path: string;
  userAgent: string;
  referer?: string;
  timestamp?: Date;
  isVerifiedBot?: boolean; // Indicate if this is a verified bot or malicious
}): Promise<{ success: boolean; error?: string }> {
  if (!isSecurityAlertEmailEnabled('honeypot')) {
    return { success: false, error: 'Honeypot alert emails disabled' };
  }

  // Check if Resend is configured
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[HONEYPOT EMAIL] RESEND_API_KEY not configured - skipping honeypot email alert');
    console.error(
      '[HONEYPOT EMAIL] Available env vars:',
      Object.keys(process.env).filter((k) => k.includes('RESEND'))
    );
    return { success: false, error: 'Resend API key is missing' };
  }

  console.log(
    `[HONEYPOT EMAIL] Starting email send for IP=${params.ip}|BOT_TYPE=${params.isVerifiedBot ? 'VERIFIED' : 'MALICIOUS'}|KEY_EXISTS=${!!apiKey}`
  );

  try {
    const { ip, path, userAgent, referer, timestamp, isVerifiedBot = false } = params;
    const now = Date.now();

    // Rate limiting: Only send 3 emails per IP per 30 minutes
    // IMPORTANT: Check and set rate limit BEFORE sending email to prevent race conditions
    // If two requests come in simultaneously, only the first will send
    const ipRecord = honeypotEmailStore.get(ip);
    if (ipRecord) {
      const timeSinceLastSent = now - ipRecord.lastSent;

      // Check if still within the time window
      if (timeSinceLastSent < HONEYPOT_EMAIL_CONFIG.windowMs) {
        // Still within window - check count
        if (ipRecord.count >= HONEYPOT_EMAIL_CONFIG.maxEmails) {
          const minutesRemaining = Math.ceil(
            (HONEYPOT_EMAIL_CONFIG.windowMs - timeSinceLastSent) / 60000
          );
          console.warn(
            `[HONEYPOT EMAIL] Rate limited for IP ${ip} (sent ${ipRecord.count}/${HONEYPOT_EMAIL_CONFIG.maxEmails} emails in last 30 min, ${minutesRemaining} min remaining)`
          );
          return { success: false, error: 'Rate limited' };
        }
        // Within window but under limit - allow (will increment count below)
      } else {
        // Window expired - reset count but keep the record structure
        ipRecord.count = 0;
        console.log(`[HONEYPOT EMAIL] Rate limit window expired for IP ${ip}, resetting count`);
      }
    } else {
      console.log(`[HONEYPOT EMAIL] No previous email record for IP ${ip}, allowing email`);
    }

    // Set rate limit record IMMEDIATELY to prevent concurrent requests from sending multiple emails
    // This prevents race conditions where two requests check rate limit at the same time
    honeypotEmailStore.set(ip, {
      lastSent: now,
      count: (ipRecord?.count || 0) + 1,
    });
    console.log(
      `[HONEYPOT EMAIL] Rate limit record set for IP ${ip} (preventing concurrent sends)`
    );

    console.log(
      `[HONEYPOT EMAIL] Preparing email content for IP=${ip}|BOT_TYPE=${isVerifiedBot ? 'VERIFIED' : 'MALICIOUS'}`
    );
    // Prepare email content
    const alertTimestamp = timestamp || new Date();
    const identifiedBot = isVerifiedBot ? identifyVerifiedBot(userAgent) : null;
    const botType = isVerifiedBot
      ? identifiedBot
        ? `Verified Bot (${identifiedBot})`
        : 'Verified Bot (Unknown)'
      : 'Malicious Bot';
    const botEmoji = isVerifiedBot ? '🔵' : '🔴';
    const actionTaken = isVerifiedBot
      ? '404 Not Found (Harmless)'
      : 'Infinite Redirect Loop (Trapped)';
    const subject = `🚨 HONEYPOT ALERT: ${botType} Detected [${ip}]`;

    const borderColor = isVerifiedBot ? 'var(--brand-primary-light)' : '#dc2626';
    const bgColor = isVerifiedBot ? '#eff6ff' : '#fef2f2';
    const headerBg = isVerifiedBot
      ? 'linear-gradient(90deg, var(--brand-primary-light) 0%, var(--brand-primary) 100%)'
      : 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)';

    const html = `
      <div style="font-family: Arial, sans-serif; color: #222; max-width: 700px; margin: auto; border: 2px solid ${borderColor}; border-radius: 10px; overflow: hidden;">
        <div style="background: ${headerBg}; color: white; padding: 24px 32px;">
          <h2 style="margin: 0; font-size: 24px;">⚠️ HONEYPOT TRIGGERED</h2>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">${botEmoji} ${botType} detected accessing honeypot URLs</p>
        </div>
        <div style="padding: 24px 32px; background: ${bgColor};">
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${borderColor}; margin-bottom: 20px;">
            <h3 style="margin: 0 0 16px 0; color: ${borderColor};">Security Event Details</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151; width: 140px;">Security Code:</td>
                <td style="padding: 8px 0; color: #111827;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">HPY-901</code></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">IP Address:</td>
                <td style="padding: 8px 0; color: #111827;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${ip}</code></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Honeypot URL:</td>
                <td style="padding: 8px 0; color: #111827; word-break: break-all;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${path}</code></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">User-Agent:</td>
                <td style="padding: 8px 0; color: #111827; word-break: break-all; font-size: 12px;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${userAgent}</code></td>
              </tr>
              ${referer ? `<tr><td style="font-weight: bold; padding: 8px 0; color: #374151;">Referer:</td><td style="padding: 8px 0; color: #111827; word-break: break-all;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${referer}</code></td></tr>` : ''}
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Timestamp:</td>
                <td style="padding: 8px 0; color: #111827;">${alertTimestamp.toISOString()}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Bot Type:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: bold;">${botEmoji} ${botType}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Action Taken:</td>
                <td style="padding: 8px 0; color: ${isVerifiedBot ? 'var(--brand-primary-light)' : '#dc2626'}; font-weight: bold;">${actionTaken}</td>
              </tr>
            </table>
          </div>
          <div style="background: #fff7ed; border: 1px solid #fb923c; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; color: #c2410c;">📊 Analysis</h4>
            <ul style="margin: 0; padding-left: 20px; color: #7c2d12; font-size: 14px;">
              <li>This IP accessed a <strong>honeypot URL</strong> (fake endpoint)</li>
              <li>Honeypot URLs are <strong>hidden in HTML</strong> and invisible to legitimate users</li>
              ${
                isVerifiedBot
                  ? `<li><strong>✅ Verified Bot:</strong> This is a legitimate search engine crawler identified as <strong>${identifiedBot || 'Unknown Verified Bot'}</strong></li><li>They should respect robots.txt and not access these paths, but this is harmless</li><li>Returned <strong>404 Not Found</strong> - no redirect loop for verified bots</li>`
                  : '<li><strong>🔴 Malicious Bot:</strong> This is NOT a verified search engine crawler</li><li>Only malicious bots/scrapers would discover and access these paths</li><li>The bot has been <strong>redirected in an infinite loop</strong> to waste its resources</li><li>This behavior indicates <strong>automated crawling/scraping activity</strong></li>'
              }
            </ul>
          </div>
          <div style="background: #eff6ff; border: 1px solid var(--brand-primary-light); border-radius: 8px; padding: 16px;">
            <h4 style="margin: 0 0 8px 0; color: #1e40af;">🔍 Next Steps</h4>
            <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px;">
              <li>Monitor if this IP continues accessing honeypot URLs</li>
              <li>Check Vercel logs for additional security events from this IP</li>
              <li>If pattern continues, consider IP blocking or additional WAF rules</li>
            </ul>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">This is an automated security alert from the Vietnam eVisa honeypot system.</p>
          <p style="margin: 8px 0 0 0;">To reduce alert frequency, emails are rate-limited to 5 per IP per 30 minutes.</p>
        </div>
      </div>
    `;

    const text = `HONEYPOT ALERT: ${botType} Detected

Security Code: HPY-901
IP Address: ${ip}
Honeypot URL: ${path}
User-Agent: ${userAgent}
${referer ? `Referer: ${referer}\n` : ''}Timestamp: ${alertTimestamp.toISOString()}
Bot Type: ${botEmoji} ${botType}
Action Taken: ${actionTaken}

Analysis:
- This IP accessed a honeypot URL (fake endpoint)
- Honeypot URLs are hidden in HTML and invisible to legitimate users
${
  isVerifiedBot
    ? `- ✅ Verified Bot: This is a legitimate search engine crawler identified as ${identifiedBot || 'Unknown Verified Bot'}\n- They should respect robots.txt and not access these paths, but this is harmless\n- Returned 404 Not Found - no redirect loop for verified bots`
    : '- 🔴 Malicious Bot: This is NOT a verified search engine crawler\n- Only malicious bots/scrapers would discover and access these paths\n- The bot has been redirected in an infinite loop to waste its resources'
}

This is an automated security alert from the Vietnam eVisa honeypot system.
Rate-limited to 5 emails per IP per 30 minutes.`;

    // Send email with retry logic for network errors
    console.log(
      `[HONEYPOT EMAIL] Attempting to send email via Resend for IP=${ip}|BOT_TYPE=${botType}|FROM=HONEYPOT@unitedevisa.com|TO=rainydayforme2025@gmail.com`
    );
    let result;
    try {
      result = await retryWithBackoff(
        () =>
          getResend().emails.send({
            from: 'HONEYPOT Security Alerts <HONEYPOT@unitedevisa.com>',
            to: ['rainydayforme2025@gmail.com'],
            subject,
            html,
            text,
          }),
        3, // Max 3 retries
        1000 // Initial delay 1 second
      );
      console.log(`[HONEYPOT EMAIL] Resend API response received for IP=${ip}:`, {
        id: result.data?.id,
        error: result.error,
      });
    } catch (error) {
      // Network/DNS errors that failed after all retries
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `[HONEYPOT EMAIL] Resend API network error after retries for IP=${ip}: ${errorMessage}`
      );
      // Rate limit record was already set above to prevent duplicate sends
      // On error, we keep the rate limit to prevent spam (even on API errors)
      // But we don't count this as a successful send
      return {
        success: false,
        error: `Resend API network error: ${errorMessage}`,
      };
    }

    // Check for Resend API errors (rate limits, invalid domain, etc.)
    if (result.error) {
      const errorMessage = result.error.message || result.error.name || 'Unknown Resend API error';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const statusCode = (result.error as any).statusCode || 'N/A';
      console.error(
        `[HONEYPOT EMAIL] Resend API error for IP=${ip}: ${errorMessage} (Status: ${statusCode})`
      );
      // Rate limit record was already set above to prevent duplicate sends
      // On error, we keep the rate limit to prevent spam (even on API errors)
      // But we don't count this as a successful send
      return {
        success: false,
        error: `Resend API error: ${errorMessage}`,
      };
    }

    // Rate limit record was already set above (BEFORE sending) to prevent race conditions
    // This ensures only 1 email per IP, even if multiple requests come in simultaneously

    console.log(
      `[HONEYPOT EMAIL] SUCCESS - Email sent for IP ${ip}|RESULT_ID=${result.data?.id || 'N/A'}`
    );
    return { success: true };
  } catch (error) {
    console.error('[HONEYPOT EMAIL] ERROR - Failed to send email:', error);
    console.error('[HONEYPOT EMAIL] ERROR Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: params.ip,
      path: params.path,
    });
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Send PHP bot alert email when bot hits PHP/suspicious file paths
 * Rate limited to prevent email spam (max 3 emails per IP per 30 minutes)
 */
export async function sendPhpBotAlert(params: {
  ip: string;
  path: string;
  userAgent: string;
  referer?: string;
  timestamp?: Date;
  isVerifiedBot?: boolean; // Indicate if this is a verified bot or malicious
}): Promise<{ success: boolean; error?: string }> {
  if (!isSecurityAlertEmailEnabled('php-bot')) {
    return { success: false, error: 'PHP bot alert emails disabled' };
  }

  // Check if Resend is configured
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[PHP BOT EMAIL] RESEND_API_KEY not configured - skipping PHP bot email alert');
    console.error(
      '[PHP BOT EMAIL] Available env vars:',
      Object.keys(process.env).filter((k) => k.includes('RESEND'))
    );
    return { success: false, error: 'Resend API key is missing' };
  }

  console.log(
    `[PHP BOT EMAIL] Starting email send for IP=${params.ip}|BOT_TYPE=${params.isVerifiedBot ? 'VERIFIED' : 'MALICIOUS'}|KEY_EXISTS=${!!apiKey}`
  );

  try {
    const { ip, path, userAgent, referer, timestamp, isVerifiedBot = false } = params;
    const now = Date.now();

    // Rate limiting: Only send 3 emails per IP per 30 minutes
    // IMPORTANT: Check and set rate limit BEFORE sending email to prevent race conditions
    // If two requests come in simultaneously, only the first will send
    const ipRecord = phpBotEmailStore.get(ip);
    if (ipRecord) {
      const timeSinceLastSent = now - ipRecord.lastSent;

      // Check if still within the time window
      if (timeSinceLastSent < PHP_BOT_EMAIL_CONFIG.windowMs) {
        // Still within window - check count
        if (ipRecord.count >= PHP_BOT_EMAIL_CONFIG.maxEmails) {
          const minutesRemaining = Math.ceil(
            (PHP_BOT_EMAIL_CONFIG.windowMs - timeSinceLastSent) / 60000
          );
          console.warn(
            `[PHP BOT EMAIL] Rate limited for IP ${ip} (sent ${ipRecord.count}/${PHP_BOT_EMAIL_CONFIG.maxEmails} emails in last 30 min, ${minutesRemaining} min remaining)`
          );
          return { success: false, error: 'Rate limited' };
        }
        // Within window but under limit - allow (will increment count below)
      } else {
        // Window expired - reset count but keep the record structure
        ipRecord.count = 0;
        console.log(`[PHP BOT EMAIL] Rate limit window expired for IP ${ip}, resetting count`);
      }
    } else {
      console.log(`[PHP BOT EMAIL] No previous email record for IP ${ip}, allowing email`);
    }

    // Set rate limit record IMMEDIATELY to prevent concurrent requests from sending multiple emails
    // This prevents race conditions where two requests check rate limit at the same time
    phpBotEmailStore.set(ip, {
      lastSent: now,
      count: (ipRecord?.count || 0) + 1,
    });
    console.log(`[PHP BOT EMAIL] Rate limit record set for IP ${ip} (preventing concurrent sends)`);

    console.log(
      `[PHP BOT EMAIL] Preparing email content for IP=${ip}|BOT_TYPE=${isVerifiedBot ? 'VERIFIED' : 'MALICIOUS'}`
    );
    // Prepare email content
    const alertTimestamp = timestamp || new Date();
    const identifiedBot = isVerifiedBot ? identifyVerifiedBot(userAgent) : null;
    const botType = isVerifiedBot
      ? identifiedBot
        ? `Verified Bot (${identifiedBot})`
        : 'Verified Bot (Unknown)'
      : 'Malicious Bot';
    const botEmoji = isVerifiedBot ? '🔵' : '🔴';
    const actionTaken = isVerifiedBot ? '403 Forbidden (Harmless)' : '403 Forbidden (Blocked)';
    const subject = `🚨 PHP BOT ALERT: ${botType} Detected [${ip}]`;

    const borderColor = isVerifiedBot ? 'var(--brand-primary-light)' : '#dc2626';
    const bgColor = isVerifiedBot ? '#eff6ff' : '#fef2f2';
    const headerBg = isVerifiedBot
      ? 'linear-gradient(90deg, var(--brand-primary-light) 0%, var(--brand-primary) 100%)'
      : 'linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)';

    const html = `
      <div style="font-family: Arial, sans-serif; color: #222; max-width: 700px; margin: auto; border: 2px solid ${borderColor}; border-radius: 10px; overflow: hidden;">
        <div style="background: ${headerBg}; color: white; padding: 24px 32px;">
          <h2 style="margin: 0; font-size: 24px;">⚠️ PHP BOT DETECTED</h2>
          <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">${botEmoji} ${botType} detected accessing suspicious file paths</p>
        </div>
        <div style="padding: 24px 32px; background: ${bgColor};">
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid ${borderColor}; margin-bottom: 20px;">
            <h3 style="margin: 0 0 16px 0; color: ${borderColor};">Security Event Details</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151; width: 140px;">Security Code:</td>
                <td style="padding: 8px 0; color: #111827;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">BOT-401</code></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">IP Address:</td>
                <td style="padding: 8px 0; color: #111827;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${ip}</code></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Suspicious Path:</td>
                <td style="padding: 8px 0; color: #111827; word-break: break-all;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${path}</code></td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">User-Agent:</td>
                <td style="padding: 8px 0; color: #111827; word-break: break-all; font-size: 12px;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${userAgent}</code></td>
              </tr>
              ${referer ? `<tr><td style="font-weight: bold; padding: 8px 0; color: #374151;">Referer:</td><td style="padding: 8px 0; color: #111827; word-break: break-all;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${referer}</code></td></tr>` : ''}
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Timestamp:</td>
                <td style="padding: 8px 0; color: #111827;">${alertTimestamp.toISOString()}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Bot Type:</td>
                <td style="padding: 8px 0; color: #111827; font-weight: bold;">${botEmoji} ${botType}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; padding: 8px 0; color: #374151;">Action Taken:</td>
                <td style="padding: 8px 0; color: ${isVerifiedBot ? 'var(--brand-primary-light)' : '#dc2626'}; font-weight: bold;">${actionTaken}</td>
              </tr>
            </table>
          </div>
          <div style="background: #fff7ed; border: 1px solid #fb923c; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; color: #c2410c;">📊 Analysis</h4>
            <ul style="margin: 0; padding-left: 20px; color: #7c2d12; font-size: 14px;">
              <li>This IP accessed a <strong>suspicious file path</strong> (.php, .asp, .jsp, etc.)</li>
              <li>Next.js doesn't use server-side files like .php, so these requests are <strong>100% bot probes</strong></li>
              ${
                isVerifiedBot
                  ? `<li><strong>✅ Verified Bot:</strong> This is a legitimate search engine crawler identified as <strong>${identifiedBot || 'Unknown Verified Bot'}</strong></li><li>They may accidentally probe these paths, but this is generally harmless</li><li>Returned <strong>403 Forbidden</strong> - blocked access</li>`
                  : '<li><strong>🔴 Malicious Bot:</strong> This is NOT a verified search engine crawler</li><li>Only malicious bots/scrapers probe for server-side files (.php, .asp, etc.)</li><li>This behavior indicates <strong>automated vulnerability scanning</strong> or <strong>exploit attempts</strong></li><li>Returned <strong>403 Forbidden</strong> - blocked access</li>'
              }
            </ul>
          </div>
          <div style="background: #eff6ff; border: 1px solid var(--brand-primary-light); border-radius: 8px; padding: 16px;">
            <h4 style="margin: 0 0 8px 0; color: #1e40af;">🔍 Next Steps</h4>
            <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px;">
              <li>Monitor if this IP continues accessing suspicious paths</li>
              <li>Check Vercel logs for additional security events from this IP</li>
              <li>If pattern continues, consider IP blocking or additional WAF rules</li>
            </ul>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          <p style="margin: 0;">This is an automated security alert from the Vietnam eVisa PHP bot detection system.</p>
          <p style="margin: 8px 0 0 0;">To reduce alert frequency, emails are rate-limited to 5 per IP per 30 minutes.</p>
        </div>
      </div>
    `;

    const text = `PHP BOT ALERT: ${botType} Detected

Security Code: BOT-401
IP Address: ${ip}
Suspicious Path: ${path}
User-Agent: ${userAgent}
${referer ? `Referer: ${referer}\n` : ''}Timestamp: ${alertTimestamp.toISOString()}
Bot Type: ${botEmoji} ${botType}
Action Taken: ${actionTaken}

Analysis:
- This IP accessed a suspicious file path (.php, .asp, .jsp, etc.)
- Next.js doesn't use server-side files like .php, so these requests are 100% bot probes
${
  isVerifiedBot
    ? `- ✅ Verified Bot: This is a legitimate search engine crawler identified as ${identifiedBot || 'Unknown Verified Bot'}\n- They may accidentally probe these paths, but this is generally harmless\n- Returned 403 Forbidden - blocked access`
    : '- 🔴 Malicious Bot: This is NOT a verified search engine crawler\n- Only malicious bots/scrapers probe for server-side files (.php, .asp, etc.)\n- This behavior indicates automated vulnerability scanning or exploit attempts\n- Returned 403 Forbidden - blocked access'
}

This is an automated security alert from the Vietnam eVisa PHP bot detection system.
Rate-limited to 5 emails per IP per 30 minutes.`;

    // Send email with retry logic for network errors
    console.log(
      `[PHP BOT EMAIL] Attempting to send email via Resend for IP=${ip}|BOT_TYPE=${botType}|FROM=HONEYPOT@unitedevisa.com|TO=rainydayforme2025@gmail.com`
    );
    let result;
    try {
      result = await retryWithBackoff(
        () =>
          getResend().emails.send({
            from: 'HONEYPOT Security Alerts <HONEYPOT@unitedevisa.com>',
            to: ['rainydayforme2025@gmail.com'],
            subject,
            html,
            text,
          }),
        3, // Max 3 retries
        1000 // Initial delay 1 second
      );
      console.log(`[PHP BOT EMAIL] Resend API response received for IP=${ip}:`, {
        id: result.data?.id,
        error: result.error,
      });
    } catch (error) {
      // Network/DNS errors that failed after all retries
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(
        `[PHP BOT EMAIL] Resend API network error after retries for IP=${ip}: ${errorMessage}`
      );
      // Rate limit record was already set above to prevent duplicate sends
      // On error, we keep the rate limit to prevent spam (even on API errors)
      // But we don't count this as a successful send
      return {
        success: false,
        error: `Resend API network error: ${errorMessage}`,
      };
    }

    // Check for Resend API errors (rate limits, invalid domain, etc.)
    if (result.error) {
      const errorMessage = result.error.message || result.error.name || 'Unknown Resend API error';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const statusCode = (result.error as any).statusCode || 'N/A';
      console.error(
        `[PHP BOT EMAIL] Resend API error for IP=${ip}: ${errorMessage} (Status: ${statusCode})`
      );
      // Rate limit record was already set above to prevent duplicate sends
      // On error, we keep the rate limit to prevent spam (even on API errors)
      // But we don't count this as a successful send
      return {
        success: false,
        error: `Resend API error: ${errorMessage}`,
      };
    }

    // Rate limit record was already set above (BEFORE sending) to prevent race conditions
    // This ensures only 1 email per IP, even if multiple requests come in simultaneously

    console.log(
      `[PHP BOT EMAIL] SUCCESS - Email sent for IP ${ip}|RESULT_ID=${result.data?.id || 'N/A'}`
    );
    return { success: true };
  } catch (error) {
    console.error('[PHP BOT EMAIL] ERROR - Failed to send email:', error);
    console.error('[PHP BOT EMAIL] ERROR Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      ip: params.ip,
      path: params.path,
    });
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
