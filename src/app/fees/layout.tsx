import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';
import { getVietnamFeesMetaDescription } from '@/lib/vietnamPricing';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Fees & Pricing',
  description: getVietnamFeesMetaDescription(),
  path: '/fees',
});

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
