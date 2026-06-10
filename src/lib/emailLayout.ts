import { SUPPORT_EMAIL } from '@/components/seo/constants';
import { absoluteAssetUrl, getPublicSiteUrl, SITE_NAME } from '@/lib/seo';

const BRAND_NAVY = '#0A284B';
const BRAND_GOLD = '#FFCD00';
const BRAND_INK = '#1F2937';
const BRAND_MUTED = '#6B7280';
const BRAND_SURFACE = '#F8FAFC';

/** Hosted PNG works reliably across Gmail, Outlook, Apple Mail (SVG is often blocked). */
export function getEmailLogoUrl(): string {
  return absoluteAssetUrl('/apple-touch-icon.png');
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type EmailLayoutOptions = {
  title: string;
  preheader?: string;
  bodyHtml: string;
};

export function emailButton(href: string, label: string): string {
  const safeHref = escapeHtml(href);
  const safeLabel = escapeHtml(label);
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 28px auto 8px;">
      <tr>
        <td align="center" bgcolor="${BRAND_GOLD}" style="border-radius: 8px;">
          <a href="${safeHref}" style="display: inline-block; padding: 14px 28px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; color: ${BRAND_NAVY}; text-decoration: none; border-radius: 8px;">
            ${safeLabel}
          </a>
        </td>
      </tr>
    </table>
  `;
}

export function emailCard(title: string, bodyHtml: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background: ${BRAND_SURFACE}; border: 1px solid #E5E7EB; border-radius: 12px;">
      <tr>
        <td style="padding: 20px 22px;">
          <p style="margin: 0 0 12px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${BRAND_NAVY};">
            ${escapeHtml(title)}
          </p>
          ${bodyHtml}
        </td>
      </tr>
    </table>
  `;
}

export function emailParagraph(text: string): string {
  return `<p style="margin: 0 0 16px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; line-height: 1.65; color: ${BRAND_INK};">${text}</p>`;
}

export function renderEmailLayout({ title, preheader, bodyHtml }: EmailLayoutOptions): string {
  const siteUrl = getPublicSiteUrl();
  const logoUrl = getEmailLogoUrl();
  const year = new Date().getFullYear();
  const safeTitle = escapeHtml(title);
  const hiddenPreheader = preheader ? escapeHtml(preheader) : safeTitle;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${safeTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EEF2F7;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">
    ${hiddenPreheader}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #EEF2F7; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 8px 24px rgba(10, 40, 75, 0.08);">
          <tr>
            <td align="center" style="padding: 28px 24px 20px; background: linear-gradient(180deg, ${BRAND_NAVY} 0%, #123A6B 100%);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 14px;">
                    <img
                      src="${logoUrl}"
                      width="72"
                      height="72"
                      alt="${escapeHtml(SITE_NAME)}"
                      style="display: block; width: 72px; height: 72px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.92); background: #FFFFFF;"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${BRAND_GOLD};">
                      ${escapeHtml(SITE_NAME)}
                    </p>
                    <h1 style="margin: 8px 0 0; font-family: Arial, Helvetica, sans-serif; font-size: 24px; line-height: 1.3; font-weight: 700; color: #FFFFFF;">
                      ${safeTitle}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 28px 12px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 28px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top: 1px solid #E5E7EB;">
                <tr>
                  <td style="padding-top: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 1.6; color: ${BRAND_MUTED}; text-align: center;">
                    <p style="margin: 0 0 8px;">
                      Questions? Contact us 24/7 at
                      <a href="mailto:${SUPPORT_EMAIL}" style="color: ${BRAND_NAVY}; font-weight: 600; text-decoration: none;">${SUPPORT_EMAIL}</a>
                    </p>
                    <p style="margin: 0 0 8px;">
                      <a href="${siteUrl}" style="color: ${BRAND_NAVY}; text-decoration: none; font-weight: 600;">vietnamemigration.com</a>
                    </p>
                    <p style="margin: 0; font-size: 12px;">&copy; ${year} ${escapeHtml(SITE_NAME)}. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
