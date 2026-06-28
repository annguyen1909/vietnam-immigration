import type { Metadata } from 'next';
import { buildPageMetadata, getPublicSiteUrl } from '@/lib/seo';
import { getVietnamApplyLayoutDescription, getVietnamVisaOffers } from '@/lib/vietnamPricing';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import JsonLd from '@/components/seo/JsonLd';
import { TRUST_ENTITY } from '@/components/seo/constants';

export const metadata: Metadata = buildPageMetadata({
  title: 'Apply for Vietnam eVisa Online',
  description: getVietnamApplyLayoutDescription(),
  path: '/apply',
});

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = getPublicSiteUrl();
  const pricing = getVietnamVisaOffers();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vietnam eVisa Application Assistance',
    serviceType: 'Visa application preparation and support',
    url: `${siteUrl}/apply`,
    provider: {
      '@type': 'Organization',
      name: TRUST_ENTITY.name,
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    description:
      'Online Vietnam eVisa application assistance with document review, secure payment, and customer support.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: pricing.currency,
      lowPrice: pricing.lowPrice,
      highPrice: pricing.highPrice,
      offerCount: pricing.offers.length,
      url: `${siteUrl}/apply`,
    },
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Apply Online', href: '/apply' },
        ]}
      />
      {children}
    </>
  );
}
