import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';
import { getVietnamProcessingPageDescription } from '@/lib/vietnamPricing';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Processing Times',
  description: getVietnamProcessingPageDescription(),
  path: '/processing',
});

const PROCESSING_HOWTO_STEPS = [
  {
    name: 'Submit application',
    text: 'Complete the online application form with your personal information, travel dates, accommodation details, and selected visa type.',
  },
  {
    name: 'Secure payment',
    text: 'Pay the government visa fee and service fee through the secure payment gateway. All fees are disclosed up front with no hidden charges.',
  },
  {
    name: 'Document review',
    text: 'Specialists review and verify your documents for compliance with official Vietnamese immigration requirements and notify you if anything else is needed.',
  },
  {
    name: 'Receive your eVisa',
    text: 'Once approved, your Vietnam eVisa is delivered to your email. Print it and carry it with your passport for entry at designated ports.',
  },
];

export default function ProcessingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Application Process', href: '/processing' },
        ]}
      />
      <HowToSchema
        name="How to Apply for a Vietnam eVisa"
        description="The four-step process to apply for and receive your Vietnam eVisa online."
        steps={PROCESSING_HOWTO_STEPS}
        url="/processing"
      />
      {children}
    </>
  );
}
