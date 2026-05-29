import JsonLd from '@/components/seo/JsonLd';
import { normalizePath, pageUrl } from '@/lib/seo';
import type { BreadcrumbSchemaItem } from '@/components/seo/types';

type BreadcrumbSchemaProps = {
  items: BreadcrumbSchemaItem[];
};

function resolveBreadcrumbItemUrl(href: string): string {
  if (href.startsWith('http://') || href.startsWith('https://')) return href;
  return pageUrl(normalizePath(href));
}

/** BreadcrumbList for site architecture (Home > Section > Page). */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: resolveBreadcrumbItemUrl(item.href),
    })),
  };

  return <JsonLd data={schema} />;
}

/** Preset: Home → Troubleshooting → article */
export function troubleshootingBreadcrumbs(slug: string, pageTitle: string) {
  return [
    { name: 'Home', href: '/' },
    { name: 'Troubleshooting', href: '/troubleshooting' },
    { name: pageTitle, href: `/troubleshooting/${slug}` },
  ] satisfies BreadcrumbSchemaItem[];
}
