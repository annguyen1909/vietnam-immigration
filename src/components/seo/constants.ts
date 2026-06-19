import { absoluteAssetUrl, getPublicSiteUrl, SITE_NAME } from '@/lib/seo';

/** Public support / contact email (site, Resend, schema, mailto links). */
export const SUPPORT_EMAIL = 'visa@vietnamemigration.com';

/** Resend "from" for traveler-facing mail (payment, password reset, etc.). */
export const SUPPORT_FROM = `Vietnam eVisa Support <${SUPPORT_EMAIL}>`;

/** Default blog byline and legal entity display name (private service—not a government agency). */
export const BLOG_AUTHOR_NAME = 'Vietnam eVisa Assistance Team';

/**
 * E-E-A-T placeholders — replace with verified legal entity details before launch.
 * Used by OrganizationSchema / LocalBusiness trust signals.
 */
export const TRUST_ENTITY = {
  legalName: BLOG_AUTHOR_NAME,
  /** Display name on schema */
  name: SITE_NAME,
  description:
    'Licensed-style immigration assistance for Vietnam eVisa applications: expert review, secure processing, and 24/7 traveler support.',
  supportEmail: SUPPORT_EMAIL,
  hotline: '+84-28-1234-5678',
  hotlineDisplay: '+84 28 1234 5678',
  address: {
    streetAddress: '123 Nguyen Hue Boulevard, District 1',
    addressLocality: 'Ho Chi Minh City',
    addressRegion: 'Ho Chi Minh',
    postalCode: '700000',
    addressCountry: 'VN',
  },
  geo: {
    latitude: 10.7769,
    longitude: 106.7009,
  },
  openingHours: ['Mo-Su 00:00-23:59'],
} as const;

export function getOrganizationSchemaDefaults() {
  const siteUrl = getPublicSiteUrl();
  return {
    siteUrl,
    logoUrl: absoluteAssetUrl('/img/vietnam-flag.svg'),
    imageUrl: absoluteAssetUrl('/img/vietnam-hero.jpg'),
    ...TRUST_ENTITY,
  };
}
