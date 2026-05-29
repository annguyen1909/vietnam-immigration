import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Worldwide Phone Support for Vietnam eVisa',
  description:
    'Contact Vietnam eVisa support by phone from Asia-Pacific, Europe, the Americas, and other regions. Hours and regional numbers for application help.',
  path: '/worldwide-phone',
});

export default function WorldwidePhoneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
