import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Processing Times',
  description:
    'How long does a Vietnam eVisa take? Standard processing from 3 hours to 3 working days, with clear steps from application to approval.',
  path: '/processing',
});

export default function ProcessingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
