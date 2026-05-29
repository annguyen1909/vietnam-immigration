/** URL slug for /check-requirement/{slug} from display name in countries data. */
export function countryNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
