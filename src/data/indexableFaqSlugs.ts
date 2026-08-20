/**
 * FAQ pages allowed in sitemap and indexable by search engines.
 * Other FAQ pages remain available for users, but use noindex to avoid
 * diluting crawl demand with short utility answers.
 */
export const INDEXABLE_FAQ_SLUGS = [
  '24-hour-vietnam-evisa',
  'children-visa-vietnam',
  'cruise-passenger-visa-vietnam',
  'family-group-vietnam-evisa',
  'vietnam-evisa-entry-points',
  'vietnam-evisa-requirements',
  'work-in-vietnam-on-tourist-visa',
] as const;

export type IndexableFaqSlug = (typeof INDEXABLE_FAQ_SLUGS)[number];

export function isIndexableFaqSlug(slug: string): slug is IndexableFaqSlug {
  return (INDEXABLE_FAQ_SLUGS as readonly string[]).includes(slug);
}
