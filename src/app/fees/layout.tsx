import type { Metadata } from 'next';
import { buildStaticPageMetadata, getPublicSiteUrl } from '@/lib/seo';
import { getVietnamFeesMetaDescription, getVietnamVisaOffers } from '@/lib/vietnamPricing';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import JsonLd from '@/components/seo/JsonLd';
import { TRUST_ENTITY } from '@/components/seo/constants';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam Visa Fees 2026 - Official Costs & Transparent Pricing',
  description: getVietnamFeesMetaDescription(),
  path: '/fees',
});

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = getPublicSiteUrl();
  const pricing = getVietnamVisaOffers();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Vietnam eVisa Application Assistance & Processing Packages',
    description:
      'Transparent Vietnam eVisa packages covering mandatory Government Stamping Fee and professional consultancy & support services.',
    category: 'Immigration & Visa Services',
    url: `${siteUrl}/fees`,
    brand: {
      '@type': 'Organization',
      name: TRUST_ENTITY.name,
      url: siteUrl,
    },
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
        priceSpecification: [
          {
            '@type': 'UnitPriceSpecification',
            name: 'Government Stamping Fee',
            price: offer.govFee.toFixed(2),
            priceCurrency: pricing.currency,
          },
          {
            '@type': 'UnitPriceSpecification',
            name: 'Our Service & Consultancy Fee',
            price: offer.serviceFee.toFixed(2),
            priceCurrency: pricing.currency,
          },
        ],
      })),
    },
  };

  return (
    <>
      <JsonLd data={productSchema} />
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
