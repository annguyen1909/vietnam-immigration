import { absoluteAssetUrl, getPublicSiteUrl, SITE_NAME } from '@/lib/seo';

/** Public support / contact email (site, Resend, schema, mailto links). */
export const SUPPORT_EMAIL = 'visa@vietnamemigration.com';

/** Resend "from" for traveler-facing mail (payment, password reset, etc.). */
export const SUPPORT_FROM = `Vietnam eVisa Support <${SUPPORT_EMAIL}>`;

/** Default blog byline and legal entity display name (private service—not a government agency). */
export const BLOG_AUTHOR_NAME = 'Vietnam eVisa Assistance Team';

/** Legal entity contact & location — shared with united-evisa (OrganizationSchema / LocalBusiness). */
export const TRUST_ENTITY = {
  legalName: BLOG_AUTHOR_NAME,
  /** Display name on schema */
  name: SITE_NAME,
  description:
    'Licensed-style immigration assistance for Vietnam eVisa applications: expert review, secure processing, and 24/7 traveler support.',
  supportEmail: SUPPORT_EMAIL,
  hotline: '+13232864541',
  hotlineDisplay: '+1 323 286 4541',
  address: {
    streetAddress: '1308 E Colorado Blvd, #2244',
    addressLocality: 'Pasadena',
    addressRegion: 'CA',
    postalCode: '91106',
    addressCountry: 'US',
  },
  geo: {
    latitude: 34.14552,
    longitude: -118.12333,
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
