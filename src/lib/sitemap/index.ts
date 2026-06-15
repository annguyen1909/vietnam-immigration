import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getPublicSiteUrl } from '@/lib/seo';
import { INDEXABLE_COUNTRY_SLUGS } from '@/data/indexableCountrySlugs';

/**
 * Stable lastmod for pages whose content changes rarely (static/legal pages and
 * country requirement pages). Using a fixed date instead of `new Date()` keeps
 * <lastmod> from churning on every hourly revalidation, which would otherwise
 * erode Google's trust in the signal. Bump this when that content meaningfully
 * changes.
 */
const STABLE_CONTENT_DATE = new Date('2026-06-01T00:00:00Z');

/**
 * Keep the sitemap focused on pages with the clearest search demand and
 * strongest uniqueness. Low-value utility/legal pages can still exist and be
 * reachable internally without competing for crawl attention in the sitemap.
 */
const CORE_FAQ_SLUGS = new Set([
  '24-hour-vietnam-evisa',
  'children-visa-vietnam',
  'cruise-passenger-visa-vietnam',
  'family-group-vietnam-evisa',
  'vietnam-evisa-entry-points',
  'vietnam-evisa-requirements',
]);

function getStaticSitemapEntries(baseUrl: string, currentDate: Date): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    {
      url: `${baseUrl}/apply`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fees`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/check-requirement`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/troubleshooting`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/processing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}

function getMarkdownDirectoryEntries(
  baseUrl: string,
  options: {
    directory: string;
    urlPrefix: string;
    defaultChangeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'];
    defaultPriority: number;
    slugFromData?: boolean;
    priorityForEntry?: (data: Record<string, unknown>, slug: string) => number;
    changeFrequencyForEntry?: (
      data: Record<string, unknown>
    ) => MetadataRoute.Sitemap[0]['changeFrequency'];
    lastModifiedForEntry?: (data: Record<string, unknown>, fileModified: Date) => Date;
    includeEntry?: (data: Record<string, unknown>) => boolean;
  }
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const dirPath = path.join(process.cwd(), options.directory);

  if (!fs.existsSync(dirPath)) {
    return entries;
  }

  const files = fs.readdirSync(dirPath);

  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;

    const filePath = path.join(dirPath, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);
    const { data } = matter(fileContents);
    const dataRecord = data as Record<string, unknown>;

    if (options.includeEntry && !options.includeEntry(dataRecord)) continue;

    const slug =
      (options.slugFromData && typeof data.slug === 'string' ? data.slug : null) ||
      filename.replace(/\.md$/, '');

    const fileModified = stats.mtime;
    const frontmatterDate = data.date ? new Date(String(data.date)) : null;
    const lastModified = options.lastModifiedForEntry
      ? options.lastModifiedForEntry(dataRecord, fileModified)
      : frontmatterDate && frontmatterDate > fileModified
        ? frontmatterDate
        : fileModified;

    entries.push({
      url: `${baseUrl}${options.urlPrefix}/${slug}`,
      lastModified,
      changeFrequency:
        options.changeFrequencyForEntry?.(dataRecord) ?? options.defaultChangeFrequency,
      priority: options.priorityForEntry?.(dataRecord, slug) ?? options.defaultPriority,
    });
  }

  return entries;
}

function getBlogSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  return getMarkdownDirectoryEntries(baseUrl, {
    directory: 'src/data/news',
    urlPrefix: '/blog',
    defaultChangeFrequency: 'monthly',
    defaultPriority: 0.6,
    includeEntry: (data) => {
      const tags = data.tags;
      return Array.isArray(tags) && tags.includes('visa');
    },
    changeFrequencyForEntry: (data) => {
      const tags = data.tags;
      const isVisaGuide = Array.isArray(tags) && tags.includes('visa');
      return isVisaGuide ? 'weekly' : 'monthly';
    },
    priorityForEntry: (data) => {
      const tags = data.tags;
      const isVisaGuide = Array.isArray(tags) && tags.includes('visa');
      return isVisaGuide ? 0.75 : 0.6;
    },
    lastModifiedForEntry: (data, fileModified) => {
      const frontmatterDate = data.date ? new Date(String(data.date)) : null;
      return frontmatterDate && frontmatterDate > fileModified ? frontmatterDate : fileModified;
    },
  });
}

function getFaqSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  // lastModified falls back to frontmatter `date` / file mtime (see
  // getMarkdownDirectoryEntries), so it reflects real content changes.
  return getMarkdownDirectoryEntries(baseUrl, {
    directory: 'src/data/faqs',
    urlPrefix: '/faq',
    defaultChangeFrequency: 'monthly',
    defaultPriority: 0.7,
    slugFromData: true,
    includeEntry: (data) => {
      const slug = typeof data.slug === 'string' ? data.slug : '';
      return CORE_FAQ_SLUGS.has(slug);
    },
  });
}

function getTroubleshootingSitemapEntries(baseUrl: string): MetadataRoute.Sitemap {
  return getMarkdownDirectoryEntries(baseUrl, {
    directory: 'src/data/troubleshooting',
    urlPrefix: '/troubleshooting',
    defaultChangeFrequency: 'weekly',
    defaultPriority: 0.9,
    slugFromData: true,
    includeEntry: (data) => data.index !== false,
    priorityForEntry: (data) => (typeof data.priority === 'number' ? data.priority : 0.9),
    lastModifiedForEntry: (data, fileModified) => {
      const updated = data.updated ? new Date(String(data.updated)) : null;
      const published = data.date ? new Date(String(data.date)) : null;
      const best = [updated, published].filter(Boolean) as Date[];
      if (best.length === 0) return fileModified;
      return best.reduce((a, b) => (a > b ? a : b));
    },
  });
}

function getCountrySitemapEntries(baseUrl: string, currentDate: Date): MetadataRoute.Sitemap {
  const tier1 = new Set(INDEXABLE_COUNTRY_SLUGS.slice(0, 20));

  return INDEXABLE_COUNTRY_SLUGS.map((countryCode) => ({
    url: `${baseUrl}/check-requirement/${countryCode}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: tier1.has(countryCode) ? 0.85 : 0.78,
  }));
}

export async function getFullSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getPublicSiteUrl();

  const staticPages = getStaticSitemapEntries(baseUrl, STABLE_CONTENT_DATE);
  const blogPosts = getBlogSitemapEntries(baseUrl);
  const faqPages = getFaqSitemapEntries(baseUrl);
  const troubleshootingPages = getTroubleshootingSitemapEntries(baseUrl);
  const countryPages = getCountrySitemapEntries(baseUrl, STABLE_CONTENT_DATE);

  return [...staticPages, ...blogPosts, ...faqPages, ...troubleshootingPages, ...countryPages];
}
