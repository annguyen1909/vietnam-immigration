import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Fees & Pricing',
  description:
    'See Vietnam eVisa government fees and service fees for 30-day and 90-day tourist visas. Transparent pricing with no hidden charges.',
  path: '/fees',
});

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
