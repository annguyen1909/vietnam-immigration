import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Check Vietnam Visa Requirements by Country',
  description:
    'Find Vietnam eVisa requirements for your nationality. Eligibility, fees, documents, and step-by-step guidance for travelers worldwide.',
  path: '/check-requirement',
});

export default function CheckRequirementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
