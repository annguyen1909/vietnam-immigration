import type { Metadata } from 'next';
import Link from 'next/link';
import { WrenchScrewdriverIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import SiteFooter from '@/components/layout/SiteFooter';
import HelpFloatingBox from '@/components/ui/HelpFloatingBox';
import { buildStaticPageMetadata, troubleshootingPath } from '@/lib/seo';
import { formatTroubleshootingDate, getAllTroubleshootingGuides } from '@/lib/troubleshooting';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Vietnam eVisa Troubleshooting & Emergency Fixes',
  description:
    'Fix payment failures, name mismatches, and last-minute Vietnam eVisa errors. Step-by-step guides with rush support in 2–4 hours.',
  path: '/troubleshooting',
});

export default function TroubleshootingIndexPage() {
  const guides = getAllTroubleshootingGuides();

  return (
    <main className="relative min-h-screen w-full bg-brand-surface text-brand-ink">
      <div className="brand-banner">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-white">
            eVisa troubleshooting
          </span>
        </div>
      </div>

      <section className="border-b-2 border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-lg border-2 border-white bg-brand-primary px-4 py-2 shadow-md">
            <WrenchScrewdriverIcon className="h-5 w-5 text-white" aria-hidden />
            <span className="text-sm font-bold uppercase tracking-wide text-white">The Fixer</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            Vietnam eVisa Troubleshooting
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted leading-relaxed">
            Emergency guides for payment errors, application mistakes, and travel-day deadlines —
            with rush options when you need approval fast.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          {guides.length === 0 ? (
            <p className="text-center text-brand-muted">Guides coming soon.</p>
          ) : (
            <ul className="space-y-4">
              {guides.map((guide) => {
                const updated = formatTroubleshootingDate(
                  guide.metadata.updated || guide.metadata.date
                );
                return (
                  <li key={guide.slug}>
                    <Link
                      href={troubleshootingPath(guide.slug)}
                      className="group flex flex-col gap-2 rounded-xl border-2 border-brand-border bg-white p-6 shadow-md transition hover:border-brand-primary hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 text-left">
                        <h2 className="font-display text-xl font-bold text-brand-ink group-hover:text-brand-primary">
                          {guide.metadata.title}
                        </h2>
                        <p className="mt-2 text-sm text-brand-muted line-clamp-2">
                          {guide.metadata.description}
                        </p>
                        {updated ? (
                          <p className="mt-2 text-xs text-brand-muted">Updated {updated}</p>
                        ) : null}
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-primary">
                        Read guide
                        <ArrowRightIcon className="h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <HelpFloatingBox />
      <SiteFooter />
    </main>
  );
}
