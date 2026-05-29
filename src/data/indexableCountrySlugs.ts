/**
 * Country requirement pages allowed in sitemap and indexable by search engines.
 * Other /check-requirement/{slug} pages remain live but use noindex to avoid thin duplicate content.
 */
export const INDEXABLE_COUNTRY_SLUGS = [
  // Tier 1 — enriched copy (20)
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
  // Tier 2 — indexable with template + light enrichment (30)
  'thailand',
  'russia',
  'poland',
  'mexico',
  'cambodia',
  'hong-kong',
  'united-arab-emirates',
  'czech-republic',
  'sweden',
  'norway',
  'denmark',
  'switzerland',
  'austria',
  'belgium',
  'ireland',
  'portugal',
  'greece',
  'hungary',
  'romania',
  'ukraine',
  'argentina',
  'chile',
  'colombia',
  'south-africa',
  'egypt',
  'saudi-arabia',
  'israel',
  'turkey',
  'luxembourg',
  'finland',
] as const;

export type IndexableCountrySlug = (typeof INDEXABLE_COUNTRY_SLUGS)[number];

export function isIndexableCountrySlug(slug: string): slug is IndexableCountrySlug {
  return (INDEXABLE_COUNTRY_SLUGS as readonly string[]).includes(slug);
}
