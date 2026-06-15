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

/** Travel guides upgraded to pillar depth — priority boost even before dateModified is set. */
const TRAVEL_PILLAR_SLUGS = new Set([
  'best-islands-vietnam-beyond-hanoi-2026',
  'best-photography-spots-vietnam-2026',
  'family-friendly-vietnam-2026',
  'top-10-historical-places-vietnam',
]);

/** Posts with dateModified on/after this date are treated as recently upgraded content. */
const CONTENT_UPGRADE_CUTOFF = new Date('2026-06-01T00:00:00Z');

function parseFrontmatterDate(value: unknown): Date | null {
  if (!value) return null;
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getLatestContentDate(data: Record<string, unknown>, fileModified: Date): Date {
  const candidates = [
    parseFrontmatterDate(data.dateModified),
    parseFrontmatterDate(data.date),
    fileModified,
  ].filter(Boolean) as Date[];

  return candidates.reduce((latest, current) => (current > latest ? current : latest));
}

function isVisaGuide(data: Record<string, unknown>): boolean {
  const tags = data.tags;
  return Array.isArray(tags) && tags.includes('visa');
}

function isUpgradedTravelGuide(data: Record<string, unknown>, slug: string): boolean {
  if (isVisaGuide(data)) return false;

  if (TRAVEL_PILLAR_SLUGS.has(slug)) return true;

  const modified = parseFrontmatterDate(data.dateModified);
  return modified !== null && modified >= CONTENT_UPGRADE_CUTOFF;
}

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
    defaultPriority: 0.65,
    changeFrequencyForEntry: (data) => (isVisaGuide(data) ? 'weekly' : 'monthly'),
    priorityForEntry: (data, slug) => {
      if (isVisaGuide(data)) return 0.75;
      if (isUpgradedTravelGuide(data, slug)) return 0.7;
      return 0.65;
    },
    lastModifiedForEntry: (data, fileModified) => getLatestContentDate(data, fileModified),
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
