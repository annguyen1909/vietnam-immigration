import type { Metadata } from 'next';
import { buildPageMetadata, getPublicSiteUrl } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Apply for Vietnam eVisa Online',
  description:
    'Start your Vietnam eVisa application online. Secure payment, document upload, and processing in as little as 3 hours to 3 working days.',
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
