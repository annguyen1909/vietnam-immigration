/** URL slug for /check-requirement/{slug} from display name in countries data. */
export function countryNameToSlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Legacy slugs produced before diacritic stripping (keep old URLs working). */
const COUNTRY_SLUG_ALIASES: Record<string, string> = {
  'cte-divoire': 'cote-d-ivoire',
  curaao: 'curacao',
  runion: 'reunion',
  'so-tom-and-prncipe': 'sao-tome-and-principe',
  'saint-barthlemy': 'saint-barthelemy',
  'land-islands': 'aland-islands',
  'east-timor': 'timor-leste',
  macao: 'macau',
  'netherlands-antilles': 'caribbean-netherlands',
  swaziland: 'eswatini',
  'ivory-coast': 'cote-d-ivoire',
  macedonia: 'north-macedonia',
};

export function resolveCountrySlug(slug: string): string {
  return COUNTRY_SLUG_ALIASES[slug] ?? slug;
}
