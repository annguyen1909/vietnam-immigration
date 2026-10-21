import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';

/** Retired guide URL -> page it was merged into. Mirrored in scripts/check-index-policy.mjs. */
const MERGED_GUIDE_REDIRECTS = [
  ['/blog/vietnam-evisa-fees-explained-2026', '/fees'],
  ['/blog/vietnam-evisa-rejection-reasons-2026', '/troubleshooting/evisa-rejected-reapply'],
  ['/troubleshooting/evisa-processing-48-hours', '/troubleshooting/stuck-processing'],
  ['/troubleshooting/weekend-processing', '/blog/vietnam-evisa-processing-time-2026'],
  ['/troubleshooting/photo-rejected', '/blog/vietnam-evisa-photo-requirements-2026'],
  ['/troubleshooting/wrong-date-of-birth-evisa', '/troubleshooting/wrong-name-evisa'],
  ['/faq/vietnam-evisa-requirements', '/blog/vietnam-evisa-requirements-guide-2026'],
  ['/faq/vietnam-evisa-entry-points', '/blog/vietnam-evisa-approved-entry-ports-2026'],
  ['/faq/children-visa-vietnam', '/blog/vietnam-evisa-for-minors-families-2026'],
  ['/faq/family-group-vietnam-evisa', '/blog/vietnam-evisa-for-minors-families-2026'],
  ['/faq/cruise-passenger-visa-vietnam', '/troubleshooting/cruise-ship-evisa-entry'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  outputFileTracingIncludes: {
    '/api/indexnow': ['./src/data/**/*'],
  },
  outputFileTracingExcludes: {
    '*': [
      './.next/cache/**/*',
      './.next/trace',
      './.git/**/*',
      './.img-candidates/**/*',
      './*.tsbuildinfo',
    ],
    '/api/indexnow': [
      './.next/cache/**/*',
      './.next/trace',
      './.git/**/*',
      './.img-candidates/**/*',
      './public/**/*',
      './generated/**/*',
      './*.tsbuildinfo',
    ],
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'flagcdn.com' }],
  },
  async redirects() {
    return [
      // Guides merged into one page per topic after the August 2026 spam update
      ...MERGED_GUIDE_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301,
      })),
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.vietnamemigration.com' }],
        destination: 'https://vietnamemigration.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://api.resend.com https://api.pusherapp.com https://www.google-analytics.com https://bud-pal.vercel.app wss://ws-us2.pusher.com https://sockjs-us2.pusher.com",
              "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // Strict transport security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypeHighlight],
  },
})(nextConfig);
