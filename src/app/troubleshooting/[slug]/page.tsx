import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CalendarIcon, ArrowLeftIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import MarkdownContent from '@/components/ui/MarkdownContent';
import MarkdownArticleWithToc from '@/components/ui/MarkdownArticleWithToc';
import { extractMarkdownHeadings } from '@/lib/markdown-headings';
import SiteFooter from '@/components/layout/SiteFooter';
import HelpFloatingBox from '@/components/ui/HelpFloatingBox';
import BreadcrumbSchema, { troubleshootingBreadcrumbs } from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import { buildTroubleshootingMetadata, troubleshootingPath } from '@/lib/seo';
import {
  formatTroubleshootingDate,
  getAllTroubleshootingGuides,
  getTroubleshootingGuide,
  getTroubleshootingSlugs,
} from '@/lib/troubleshooting';
import AuthorBio from '@/components/trust/AuthorBio';
import EmergencyCTA from '@/components/trust/EmergencyCTA';
import { EDITORIAL_TEAM_BIO } from '@/components/trust';
import RelatedResources from '@/components/ui/RelatedResources';

export async function generateStaticParams() {
  return getTroubleshootingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getTroubleshootingGuide(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  const { metadata } = guide;

  return buildTroubleshootingMetadata({
    title: metadata.title,
    description: metadata.description,
    slug: guide.slug,
    ogImage: metadata.image,
    index: metadata.index !== false,
    publishedTime: metadata.date,
    modifiedTime: metadata.updated || metadata.date,
  });
}

export default async function TroubleshootingGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getTroubleshootingGuide(slug);

  if (!guide) {
    notFound();
  }

  const { metadata, content, faq, howToSteps, howToTotalTime } = guide;
  const tocItems = extractMarkdownHeadings(content);
  const lastUpdated = formatTroubleshootingDate(metadata.updated || metadata.date);
  const pageTitle = metadata.title;

  const relatedGuides = getAllTroubleshootingGuides()
    .filter((g) => g.slug !== guide.slug)
    .slice(0, 4);

  return (
    <>
      <BreadcrumbSchema items={troubleshootingBreadcrumbs(guide.slug, pageTitle)} />
      <FAQSchema items={faq} />
      <HowToSchema
        name={`How to fix: ${pageTitle}`}
        description={metadata.description}
        steps={howToSteps}
        totalTime={howToTotalTime}
        url={troubleshootingPath(guide.slug)}
      />

      <main className="relative min-h-screen w-full bg-brand-surface text-brand-ink">
        <div className="brand-banner">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white" />
              <span className="text-sm font-semibold uppercase tracking-wider text-white">
                eVisa troubleshooting
              </span>
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <section className="border-b-2 border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white py-10 md:py-14">
          <div className="mx-auto max-w-4xl px-4">
            <Link
              href="/troubleshooting"
              className="mb-6 inline-flex items-center gap-2 font-semibold text-brand-muted transition-colors hover:text-brand-primary"
            >
              <ArrowLeftIcon className="h-5 w-5" aria-hidden />
              All troubleshooting guides
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-lg border-2 border-white bg-brand-primary px-4 py-2 shadow-md">
              <WrenchScrewdriverIcon className="h-5 w-5 text-white" aria-hidden />
              <span className="text-sm font-bold uppercase tracking-wide text-white">
                The Fixer
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              {pageTitle}
            </h1>

            {lastUpdated ? (
              <p className="mt-4 flex items-center gap-2 text-sm text-brand-muted">
                <CalendarIcon className="h-5 w-5 shrink-0 text-brand-primary" aria-hidden />
                Last updated:{' '}
                <time dateTime={metadata.updated || metadata.date}>{lastUpdated}</time>
              </p>
            ) : null}

            <div className="mt-8">
              <EmergencyCTA variant="banner" className="-mx-4 rounded-xl sm:mx-0" />
            </div>
          </div>
        </section>

        <section className="border-b-2 border-gray-200 bg-white py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <MarkdownArticleWithToc items={tocItems}>
              <article className="rounded-xl border-4 border-brand-primary bg-white p-6 shadow-xl sm:p-10">
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-ink prose-a:text-brand-primary">
                  <MarkdownContent content={content} />
                </div>
              </article>
            </MarkdownArticleWithToc>

            <div className="mt-10 space-y-8">
              <EmergencyCTA variant="inline" />

              {relatedGuides.length > 0 ? (
                <section className="rounded-xl border-2 border-brand-border bg-white p-6 shadow-md">
                  <h2 className="mb-5 font-display text-xl font-bold text-brand-ink">
                    Related troubleshooting guides
                  </h2>
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {relatedGuides.map((related) => (
                      <li key={related.slug}>
                        <Link
                          href={troubleshootingPath(related.slug)}
                          className="group flex h-full flex-col rounded-lg border-2 border-gray-200 bg-gray-50 p-4 transition hover:border-brand-primary"
                        >
                          <span className="font-semibold text-brand-ink group-hover:text-brand-primary">
                            {related.metadata.title}
                          </span>
                          <span className="mt-1 text-sm text-brand-muted line-clamp-2">
                            {related.metadata.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <RelatedResources excludePaths={['/troubleshooting']} />

              <AuthorBio {...EDITORIAL_TEAM_BIO} />
            </div>
          </div>
        </section>

        <HelpFloatingBox />
        <SiteFooter />
      </main>
    </>
  );
}
