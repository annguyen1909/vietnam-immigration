import type { Metadata } from 'next';
import { buildStaticPageMetadata, getPublicSiteUrl } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import JsonLd from '@/components/seo/JsonLd';
import { TRUST_ENTITY } from '@/components/seo/constants';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'About Us',
  description:
    'Learn how our Vietnam eVisa assistance service works—expert application review, transparent fees, and 24/7 support from submission to approval.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = getPublicSiteUrl();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Vietnam eVisa Assistance Team',
    url: `${siteUrl}/about`,
    description:
      'Learn how our Vietnam eVisa assistance service works—expert application review, transparent fees, and 24/7 support from submission to approval.',
    publisher: {
      '@type': 'Organization',
      name: TRUST_ENTITY.name,
      url: siteUrl,
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'About Us', href: '/about' },
        ]}
      />
      {children}
    </>
  );
}
