/**
 * Country requirement pages allowed in sitemap and indexable by search engines.
 * Other /check-requirement/{slug} pages remain live but use noindex to avoid
 * thin duplicate doorway content.
 *
 * Keep this list tiny. Templated nationality URLs are the spam-update surface.
 */
export const INDEXABLE_COUNTRY_SLUGS = [
  'united-states',
  'united-kingdom',
  'india',
  'australia',
  'canada',
  'germany',
  'france',
  'singapore',
] as const;

export type IndexableCountrySlug = (typeof INDEXABLE_COUNTRY_SLUGS)[number];

export function isIndexableCountrySlug(slug: string): slug is IndexableCountrySlug {
  return (INDEXABLE_COUNTRY_SLUGS as readonly string[]).includes(slug);
}
