import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationSchemaDefaults, TRUST_ENTITY } from '@/components/seo/constants';
import type { OrganizationSchemaOverrides } from '@/components/seo/types';

type OrganizationSchemaProps = OrganizationSchemaOverrides & {
  /** Include LocalBusiness fields (address, hours, geo) for YMYL trust. Default true. */
  includeLocalBusiness?: boolean;
};

/**
 * Organization + LocalBusiness trust entity for sitewide E-E-A-T.
 * Address and hotline sourced from shared legal entity constants.
 */
export default function OrganizationSchema({
  name,
  description,
  logoUrl,
  imageUrl,
  includeLocalBusiness = true,
}: OrganizationSchemaProps = {}) {
  const defaults = getOrganizationSchemaDefaults();
  const siteUrl = defaults.siteUrl;
  const displayName = name ?? defaults.name;
  const orgDescription = description ?? defaults.description;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': includeLocalBusiness ? ['Organization', 'LocalBusiness'] : 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: displayName,
    legalName: TRUST_ENTITY.legalName,
    url: siteUrl,
    logo: logoUrl ?? defaults.logoUrl,
    image: imageUrl ?? defaults.imageUrl,
    description: orgDescription,
    email: TRUST_ENTITY.supportEmail,
    telephone: TRUST_ENTITY.hotline,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: TRUST_ENTITY.supportEmail,
        telephone: TRUST_ENTITY.hotline,
        availableLanguage: ['English', 'Vietnamese'],
        areaServed: 'Worldwide',
      },
    ],
  };

  if (includeLocalBusiness) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: TRUST_ENTITY.address.streetAddress,
      addressLocality: TRUST_ENTITY.address.addressLocality,
      addressRegion: TRUST_ENTITY.address.addressRegion,
      postalCode: TRUST_ENTITY.address.postalCode,
      addressCountry: TRUST_ENTITY.address.addressCountry,
    };
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: TRUST_ENTITY.geo.latitude,
      longitude: TRUST_ENTITY.geo.longitude,
    };
    schema.openingHours = [...TRUST_ENTITY.openingHours];
    schema.priceRange = '$$';
  }

  return <JsonLd data={schema} />;
}

/** Alias for pages that refer to “local business” trust markup explicitly. */
export function LocalBusinessSchema(props: OrganizationSchemaProps) {
  return <OrganizationSchema {...props} includeLocalBusiness />;
}
