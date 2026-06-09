import { MetadataRoute } from 'next';
import { getFullSitemap } from '@/lib/sitemap';

// Static at build time — ISR (revalidate) on Vercel cannot read src/data/*.md at runtime.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getFullSitemap();
}
