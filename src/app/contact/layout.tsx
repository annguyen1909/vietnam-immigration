import type { Metadata } from 'next';
import { buildStaticPageMetadata, getPublicSiteUrl } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import JsonLd from '@/components/seo/JsonLd';
import { TRUST_ENTITY } from '@/components/seo/constants';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Contact Us',
  description:
    'Contact our Vietnam eVisa support team 24/7 for application help, status questions, and travel guidance.',
  path: '/contact',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const siteUrl = getPublicSiteUrl();

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vietnam eVisa Support Team',
    url: `${siteUrl}/contact`,
    description:
      'Contact our Vietnam eVisa support team 24/7 for application help, status questions, and travel guidance.',
    mainEntity: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: TRUST_ENTITY.supportEmail,
      telephone: TRUST_ENTITY.hotline,
      availableLanguage: ['English', 'Vietnamese'],
      areaServed: 'Worldwide',
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Contact Us', href: '/contact' },
        ]}
      />
      {children}
    </>
  );
}
