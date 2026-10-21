/**
 * URLs removed after the August 2026 spam update.
 *
 * Gone paths are off-topic travel posts deleted for good; middleware answers them with
 * 410 so Google drops them faster than a 404. Merged guides are 301-redirected in
 * next.config.mjs instead — keep both lists in sync with scripts/check-index-policy.mjs.
 */
export const GONE_PATHS: ReadonlySet<string> = new Set([
  '/blog/best-islands-vietnam-beyond-hanoi-2026',
  '/blog/best-photography-spots-vietnam-2026',
  '/blog/discover-vietnamese-regional-cuisine-2026',
  '/blog/family-friendly-vietnam-2026',
  '/blog/hidden-gems-vietnam-2026',
  '/blog/top-10-historical-places-vietnam',
  '/blog/vietnam-adventure-travel-2026',
  '/blog/vietnam-beach-holidays-coast-2026',
  '/blog/vietnam-best-diving-destinations-2026',
  '/blog/vietnam-currency-exchange-guide-2026',
  '/blog/vietnam-national-parks-wildlife-2026',
  '/blog/vietnam-shopping-markets-guide-2026',
  '/blog/vietnam-tropical-islands-paradise-2026',
  '/blog/vietnam-volcano-trekking-guide-2026',
  '/blog/vietnam-wildlife-nature-encounters-2026',
  '/blog/vietnamese-festivals-cultural-celebrations-2026',
  '/blog/vietnamese-music-arts-culture-2026',
  '/blog/vietnamese-wellness-spa-retreats-2026',
]);
