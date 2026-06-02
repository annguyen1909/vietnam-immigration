import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';
import { getVietnamProcessingPageDescription } from '@/lib/vietnamPricing';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Processing Times',
  description: getVietnamProcessingPageDescription(),
  path: '/processing',
});

export default function ProcessingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
