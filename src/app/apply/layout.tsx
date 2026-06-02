import type { Metadata } from 'next';
import { buildPageMetadata, getPublicSiteUrl } from '@/lib/seo';
import { getVietnamApplyLayoutDescription } from '@/lib/vietnamPricing';

export const metadata: Metadata = buildPageMetadata({
  title: 'Apply for Vietnam eVisa Online',
  description: getVietnamApplyLayoutDescription(),
  path: '/apply',
});

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = getPublicSiteUrl();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vietnam eVisa Application Assistance',
    serviceType: 'Visa application preparation and support',
    url: `${siteUrl}/apply`,
    provider: {
      '@type': 'Organization',
      name: 'Vietnam Official eVisa Immigration Assistance Service',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    description:
      'Online Vietnam eVisa application assistance with document review, secure payment, and customer support.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
