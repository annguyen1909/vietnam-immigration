import { countries } from '@/data/countries';

export function getAllowedNationalityCodes(value: unknown): Set<string> | null {
  if (value === null) return null;
  if (!Array.isArray(value)) return new Set();

  return new Set(
    value
      .filter((code): code is string => typeof code === 'string')
      .map((code) => code.toUpperCase())
  );
}

export function isNationalityCodeAllowed(value: unknown, code: string): boolean {
  const allowedCodes = getAllowedNationalityCodes(value);
  return allowedCodes === null || allowedCodes.has(code.toUpperCase());
}

export function getEligibleCountries(rules: unknown[]) {
  const allowedSets = rules.map(getAllowedNationalityCodes);
  if (allowedSets.some((codes) => codes === null)) return countries;

  const allowedCodes = new Set(allowedSets.flatMap((codes) => [...(codes ?? [])]));
  return countries.filter((country) => allowedCodes.has(country.code.toUpperCase()));
}

export function getCountryCodeFromName(name: string): string | null {
  return countries.find((country) => country.name === name)?.code ?? null;
}
