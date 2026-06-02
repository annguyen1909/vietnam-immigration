import type { Metadata, Viewport } from 'next';
import { Be_Vietnam_Pro, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import Providers from '@/components/Providers';
import ContactWidget from '@/components/ui/ContactWidget';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteAssetUrl, getPublicSiteUrl } from '@/lib/seo';
import { getVietnamDefaultSiteDescription } from '@/lib/vietnamPricing';
import OrganizationSchema from '@/components/seo/OrganizationSchema';

const siteUrl = getPublicSiteUrl();
const defaultOgImage = absoluteAssetUrl(DEFAULT_OG_IMAGE);

const beVietnam = Be_Vietnam_Pro({
  variable: '--font-be-vietnam',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
});

const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Vietnam Official eVisa',
    default: 'Vietnam Official eVisa | vietnamemigration.com',
  },
  description: getVietnamDefaultSiteDescription(),
  keywords: [
    'Vietnam eVisa',
    'Vietnam visa',
    'online visa application',
    'eVisa Vietnam',
    'official visa',
    'immigration services',
    'vietnamemigration.com',
    'Vietnam travel visa',
    'Vietnam tourist visa',
    'Vietnam business visa',
    'Vietnam visa online',
    'apply Vietnam visa',
    'Vietnam entry permit',
    'Vietnam visa requirements',
    'Vietnam visa application',
  ],
  authors: [
    {
      name: 'Vietnam Official eVisa Immigration Assistance Service',
    },
  ],
  creator: 'Vietnam Official eVisa Immigration Assistance Service',
  publisher: 'Vietnam Official eVisa Immigration Assistance Service',
  applicationName: 'Vietnam Official eVisa',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: SITE_NAME,
    title: 'Vietnam Official eVisa | vietnamemigration.com',
    description: getVietnamDefaultSiteDescription(),
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Vietnam eVisa Application - Official Immigration Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vietnam_immigration',
    creator: '@vietnam_immigration',
    title: 'Vietnam Official eVisa | vietnamemigration.com',
    description:
      'Apply for your official Vietnam eVisa online. Fast, secure, and reliable processing with 24/7 support.',
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Vietnam eVisa',
    // Search engine verification tags
    // Add these environment variables in .env.local or your hosting platform:
    // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_code_here
    // NEXT_PUBLIC_BING_VERIFICATION=your_code_here
    // NEXT_PUBLIC_YANDEX_VERIFICATION=your_code_here
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { 'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
      ? { 'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION }
      : {}),
  },
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0D5C4F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnam.variable} ${sourceSerif.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <GoogleAnalytics />
        <OrganizationSchema />
        <Providers>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <ContactWidget />
        </Providers>
      </body>
    </html>
  );
}
