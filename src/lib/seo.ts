import type { Metadata } from 'next';
import { isIndexableCountrySlug as checkIndexableCountry } from '@/data/indexableCountrySlugs';

export const SITE_URL = 'https://vietnamemigration.com';
export const SITE_NAME = 'Vietnam eVisa Assistance';
export const DEFAULT_OG_IMAGE = '/img/vietnam-hero.jpg';
export const TROUBLESHOOTING_OG_IMAGE = '/img/vietnam-hero.jpg';

const TWITTER_SITE = '@vietnam_immigration';
const META_TITLE_MAX_LENGTH = 70;
const META_TITLE_WITH_BRAND_MAX_LENGTH = 75;
const META_DESCRIPTION_MAX_LENGTH = 155;

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
  const siteUrl = fromEnv || SITE_URL;

  const shouldEnforceProductionUrl =
    process.env.VERCEL_ENV === 'production' || process.env.ENFORCE_PUBLIC_SITE_URL === '1';

  if (shouldEnforceProductionUrl && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(siteUrl)) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be the public production origin, not localhost, when building for production.'
    );
  }

  return siteUrl;
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

function normalizeMetadataText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function trimAtWordBoundary(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;

  const truncated = value.slice(0, maxLength + 1);
  const lastSpace = truncated.lastIndexOf(' ');
  const candidate =
    lastSpace > Math.floor(maxLength * 0.65) ? truncated.slice(0, lastSpace) : truncated;

  return candidate
    .replace(/\s+(and|or|with|for|to|of|in|by)$/i, '')
    .replace(/[-,:;.!?\u2013\u2014\s]+$/, '')
    .trim();
}

export function formatMetadataTitle(title: string): string {
  const normalized = normalizeMetadataText(title);
  if (normalized.length <= META_TITLE_MAX_LENGTH) return normalized;

  const withoutParenthetical = normalizeMetadataText(normalized.replace(/\s*\([^)]*\)/g, ''));
  if (withoutParenthetical.length <= META_TITLE_MAX_LENGTH) return withoutParenthetical;

  const separatorCandidate = withoutParenthetical.match(/^(.{38,70}?)(?:\s[-\u2013\u2014]\s|:\s)/);
  if (separatorCandidate?.[1]) return separatorCandidate[1].trim();

  return trimAtWordBoundary(withoutParenthetical, META_TITLE_MAX_LENGTH);
}

export function formatMetadataDescription(description: string): string {
  const normalized = normalizeMetadataText(description);
  if (normalized.length <= META_DESCRIPTION_MAX_LENGTH) return normalized;

  const sentenceMatch = normalized.match(/^(.{80,155}?[.!?])(?:\s|$)/);
  if (sentenceMatch?.[1]) return sentenceMatch[1].trim();

  return trimAtWordBoundary(normalized, META_DESCRIPTION_MAX_LENGTH);
}

/** Universal metadata factory — canonicals are always path-only (no query strings). */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const url = pageUrl(input.path);
  const title = formatMetadataTitle(input.title);
  const description = formatMetadataDescription(input.description);
  const image = absoluteAssetUrl(input.ogImage);
  const index = input.index ?? true;
  const ogType = input.ogType ?? 'website';
  const titleWithBrandLength = title.length + SITE_NAME.length + 3;
  const metadataTitle: Metadata['title'] =
    titleWithBrandLength > META_TITLE_WITH_BRAND_MAX_LENGTH ? { absolute: title } : title;

  const metadata: Metadata = {
    title: metadataTitle,
    description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
      languages: {
        'en-US': url,
        'x-default': url,
      },
    },
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
