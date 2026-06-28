import type { Metadata } from 'next';
import { buildStaticPageMetadata, getPublicSiteUrl } from '@/lib/seo';
import { getVietnamFeesMetaDescription, getVietnamVisaOffers } from '@/lib/vietnamPricing';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import JsonLd from '@/components/seo/JsonLd';
import { TRUST_ENTITY } from '@/components/seo/constants';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Fees & Pricing',
  description: getVietnamFeesMetaDescription(),
  path: '/fees',
});

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = getPublicSiteUrl();
  const pricing = getVietnamVisaOffers();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vietnam eVisa Processing & Support Fees',
    serviceType: 'Vietnam eVisa Application Assistance',
    url: `${siteUrl}/fees`,
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
      'Current service fees and government visa pricing for Vietnam eVisa applications with professional support.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: pricing.currency,
      lowPrice: pricing.lowPrice,
      highPrice: pricing.highPrice,
      offerCount: pricing.offers.length,
      url: `${siteUrl}/apply`,
      offers: pricing.offers.map((offer) => ({
        '@type': 'Offer',
        name: offer.label,
        price: offer.price.toFixed(2),
        priceCurrency: pricing.currency,
        url: `${siteUrl}/apply`,
        availability: 'https://schema.org/InStock',
      })),
    },
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Vietnam eVisa Fees', href: '/fees' },
        ]}
      />
      {children}
    </>
  );
}
