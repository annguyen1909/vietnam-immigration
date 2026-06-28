import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Check Vietnam Visa Requirements by Country',
  description:
    'Find Vietnam eVisa requirements for your nationality. Eligibility, documents, and step-by-step guidance—see /fees for current visa-type pricing.',
  path: '/check-requirement',
});

// Breadcrumb JSON-LD is emitted per-page (2-level on the index, 3-level on
// country pages) to avoid duplicate/conflicting BreadcrumbList markup.
export default function CheckRequirementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
