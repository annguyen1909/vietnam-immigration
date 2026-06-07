import { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Standard disallow list for private, auth, admin, and system paths.
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
