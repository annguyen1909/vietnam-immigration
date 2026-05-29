const DATE_ONLY_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;
const ISO_MIDNIGHT_REGEX = /^(\d{4})-(\d{2})-(\d{2})T00:00:00(\.000)?Z$/;

const getSafeDate = (dateString?: string): Date | null => {
  if (!dateString) {
    return null;
  }

  const trimmed = dateString.trim();
  const dateOnlyMatch = trimmed.match(DATE_ONLY_REGEX);
  const isoMidnightMatch = trimmed.match(ISO_MIDNIGHT_REGEX);

  if (dateOnlyMatch || isoMidnightMatch) {
    const match = (dateOnlyMatch || isoMidnightMatch)!;
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    return new Date(year, month, day);
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const formatDisplayDate = (
  dateString?: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
  fallback = 'Not specified'
): string => {
  const date = getSafeDate(dateString);
  if (!date) {
    return fallback;
  }

  return date.toLocaleDateString('en-US', options);
};
