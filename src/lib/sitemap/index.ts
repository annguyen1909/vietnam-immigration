import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getPublicSiteUrl } from '@/lib/seo';
import { INDEXABLE_COUNTRY_SLUGS } from '@/data/indexableCountrySlugs';

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
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fees`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/embassy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
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
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimers`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/digital-services-act`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
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
    {
      url: `${baseUrl}/worldwide-phone`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
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

function getFaqSitemapEntries(baseUrl: string, currentDate: Date): MetadataRoute.Sitemap {
  return getMarkdownDirectoryEntries(baseUrl, {
    directory: 'src/data/faqs',
    urlPrefix: '/faq',
    defaultChangeFrequency: 'monthly',
    defaultPriority: 0.7,
    slugFromData: true,
    lastModifiedForEntry: () => currentDate,
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
  const currentDate = new Date();

  const staticPages = getStaticSitemapEntries(baseUrl, currentDate);
  const blogPosts = getBlogSitemapEntries(baseUrl);
  const faqPages = getFaqSitemapEntries(baseUrl, currentDate);
  const troubleshootingPages = getTroubleshootingSitemapEntries(baseUrl);
  const countryPages = getCountrySitemapEntries(baseUrl, currentDate);

  return [...staticPages, ...blogPosts, ...faqPages, ...troubleshootingPages, ...countryPages];
}
