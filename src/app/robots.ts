import { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Standard disallow list - admin/system paths and non-existent pages
  // These look like normal paths that should be disallowed for security
  const standardDisallow = [
    '/api/',
    '/dashboard/',
    '/applications/',
    '/account/',
    '/login/',
    '/register/',
    '/forgot-password/',
    '/reset-password/',
    // Admin and system paths (standard security practice)
    '/wp-admin/',
    '/wp-login.php',
    '/admin/',
    '/internal/',
    '/phpmyadmin',
    '/.env',
    '/administrator',
    '/cgi-bin/',
    // Non-existent FAQ/check-requirement pages (not in sitemap)
    '/faq/visa-extension-process',
    '/faq/visa-renewal-procedure',
    '/faq/visa-status-check-online',
    '/faq/visa-application-denial',
    '/faq/visa-fee-payment-options',
    '/faq/visa-processing-time-estimate',
    '/faq/vietnam-visa-requirements-update',
    '/faq/visa-application-support-help',
    '/check-requirement/xyz-country',
    '/check-requirement/test-nation',
    '/check-requirement/sample-country',
    '/check-requirement/demo-nation',
    '/check-requirement/example-country',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: standardDisallow,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: standardDisallow,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: standardDisallow,
      },
    ],
    sitemap: `${getPublicSiteUrl()}/sitemap.xml`,
  };
}
