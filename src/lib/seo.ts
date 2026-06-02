import type { Metadata } from 'next';
import { isIndexableCountrySlug as checkIndexableCountry } from '@/data/indexableCountrySlugs';

export const SITE_URL = 'https://vietnamemigration.com';
export const SITE_NAME = 'Vietnam Official eVisa';
export const DEFAULT_OG_IMAGE = '/img/vietnam-hero.jpg';
export const TROUBLESHOOTING_OG_IMAGE = '/img/vietnam-hero.jpg';

const TWITTER_SITE = '@vietnam_immigration';

const GOOGLE_BOT_INDEXABLE = {
  index: true,
  follow: true,
  'max-video-preview': -1,
  'max-image-preview': 'large' as const,
  'max-snippet': -1,
};

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string[];
  authors?: Metadata['authors'];
  creator?: string;
  publisher?: string;
  category?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleTags?: string[];
  articleSection?: string;
  articleAuthors?: string[];
};

/** Base URL for emails, auth links, canonicals, and sitemap. */
export function getPublicSiteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  return fromEnv || SITE_URL;
}

export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function pageUrl(path: string): string {
  return `${getPublicSiteUrl()}${normalizePath(path)}`;
}

export function troubleshootingPath(slug: string): string {
  return `/troubleshooting/${slug}`;
}

export function checkRequirementPath(slug: string): string {
  return `/check-requirement/${slug}`;
}

export function countryPath(slug: string): string {
  return `/country/${slug}`;
}

export function blogPath(slug: string): string {
  return `/blog/${slug}`;
}

export function faqPath(slug: string): string {
  return `/faq/${slug}`;
}

/** Resolve a site-relative asset path to an absolute URL for Open Graph and JSON-LD. */
export function absoluteAssetUrl(path?: string): string {
  const base = getPublicSiteUrl();
  if (!path) return `${base}${DEFAULT_OG_IMAGE}`;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Universal metadata factory — canonicals are always path-only (no query strings). */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const url = pageUrl(input.path);
  const title = input.title;
  const description = input.description;
  const image = absoluteAssetUrl(input.ogImage);
  const index = input.index ?? true;
  const ogType = input.ogType ?? 'website';

  const metadata: Metadata = {
    title,
    description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true, googleBot: GOOGLE_BOT_INDEXABLE }
      : { index: false, follow: true },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(ogType === 'article' && {
        publishedTime: input.publishedTime,
        modifiedTime: input.modifiedTime ?? input.publishedTime,
        authors: input.articleAuthors,
        tags: input.articleTags,
        section: input.articleSection,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      creator: TWITTER_SITE,
      title,
      description,
      images: [image],
    },
  };

  if (input.authors) metadata.authors = input.authors;
  if (input.creator) metadata.creator = input.creator;
  if (input.publisher) metadata.publisher = input.publisher;
  if (input.category) metadata.category = input.category;

  if (input.articleTags?.length && input.publishedTime) {
    metadata.other = {
      'article:tag': input.articleTags.join(', '),
      ...(input.articleSection ? { 'article:section': input.articleSection } : {}),
      'article:published_time': input.publishedTime,
      'article:modified_time': input.modifiedTime ?? input.publishedTime,
    };
  }

  return metadata;
}

/** “Fixer” preset for troubleshooting / emergency queries (Reddit, forums). */
export function buildTroubleshootingMetadata(input: {
  title: string;
  description: string;
  slug: string;
  ogImage?: string;
  index?: boolean;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const displayTitle = input.title.includes('—') ? input.title : `${input.title} — Fix in 2 Hours`;

  return buildPageMetadata({
    title: displayTitle,
    description: input.description,
    path: troubleshootingPath(input.slug),
    ogType: 'article',
    ogImage: input.ogImage ?? TROUBLESHOOTING_OG_IMAGE,
    index: input.index ?? true,
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
    keywords: input.keywords ?? [
      input.title,
      'Vietnam eVisa error',
      'Vietnam eVisa troubleshooting',
      'Vietnam visa help',
      'Vietnam eVisa fix',
    ],
  });
}

/** Shared metadata for static legal and utility pages. */
export function buildStaticPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return buildPageMetadata({ title, description, path });
}

export function isIndexableCountrySlug(slug: string): boolean {
  return checkIndexableCountry(slug);
}

export { INDEXABLE_COUNTRY_SLUGS } from '@/data/indexableCountrySlugs';
