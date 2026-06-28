/**
 * Country requirement pages allowed in sitemap and indexable by search engines.
 * Other /check-requirement/{slug} pages remain live but use noindex to avoid thin duplicate content.
 *
 * We intentionally keep this list tight. The long tail of nationality pages is
 * useful for users once discovered internally, but a broad templated set in the
 * index tends to dilute crawl demand and leaves Google with too many near-duplicate
 * URLs to evaluate at once.
 */
export const INDEXABLE_COUNTRY_SLUGS = [
  // Tier 1 — enriched copy with the strongest search and conversion potential.
  'united-states',
  'united-kingdom',
  'australia',
  'canada',
  'germany',
  'france',
  'india',
  'japan',
  'south-korea',
  'china',
  'singapore',
  'malaysia',
  'philippines',
  'indonesia',
  'taiwan',
  'netherlands',
  'italy',
  'spain',
  'brazil',
  'new-zealand',
  // Tier 2 — enriched with unique intro, travel insight, and country-specific FAQs.
  'thailand',
  'cambodia',
  'hong-kong',
  'united-arab-emirates',
  'russia',
  'poland',
  'sweden',
  'norway',
  'denmark',
  'switzerland',
  'ireland',
  'portugal',
  'israel',
  'turkey',
  'south-africa',
] as const;

export type IndexableCountrySlug = (typeof INDEXABLE_COUNTRY_SLUGS)[number];

export function isIndexableCountrySlug(slug: string): slug is IndexableCountrySlug {
  return (INDEXABLE_COUNTRY_SLUGS as readonly string[]).includes(slug);
}
