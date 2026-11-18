import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

/**
 * Public catalogue data (destinations, visa types, add-ons) changes rarely but is read on every
 * page view and by crawlers. Serving it from Vercel's Data Cache keeps visitors and bots from
 * waking the shared Neon database; at most one query per key per hour reaches Postgres.
 * Checkout still reads prices directly from the database, so charges are always current.
 */
const CATALOG_TTL_SECONDS = 3600;
const options = { revalidate: CATALOG_TTL_SECONDS, tags: ['catalog'] };

export const getCachedDestinations = unstable_cache(
  () => prisma.destination.findMany({ orderBy: { name: 'asc' } }),
  ['catalog-destinations-v1'],
  options
);

export const getCachedVisaTypes = unstable_cache(
  (destinationId: string) =>
    prisma.visaType.findMany({
      where: { destinationId },
      select: {
        id: true,
        name: true,
        fees: true,
        waitTime: true,
        requiredDocuments: true,
        allowedNationalities: true,
        destinationId: true,
      },
      orderBy: { fees: 'asc' },
    }),
  ['catalog-visa-types-v1'],
  options
);

export const getCachedAddOns = unstable_cache(
  (type: string | null, name: string | null) =>
    prisma.addOnConfig.findMany({
      where: {
        isActive: true,
        ...(type ? { type: { equals: type, mode: 'insensitive' as const } } : {}),
        ...(name ? { name } : {}),
      },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    }),
  ['catalog-add-ons-v1'],
  options
);

/** Lets Vercel's CDN answer repeat requests without invoking the function at all. */
export const CATALOG_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
};
