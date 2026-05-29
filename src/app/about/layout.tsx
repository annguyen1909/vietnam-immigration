import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'About Us',
  description:
    'Learn how our Vietnam eVisa assistance service works—expert application review, transparent fees, and 24/7 support from submission to approval.',
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
