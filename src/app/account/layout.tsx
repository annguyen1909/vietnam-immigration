import type { ReactNode } from 'react';
import { noindexMetadata } from '@/lib/noindexMetadata';

export const metadata = noindexMetadata;

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children;
}
