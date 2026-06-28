import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export type RelatedResourceLink = {
  href: string;
  title: string;
  description?: string;
};

/** Curated cross-links to the strongest hub pages — strengthens internal linking. */
export const DEFAULT_RELATED_RESOURCES: RelatedResourceLink[] = [
  {
    href: '/blog/vietnam-evisa-requirements-guide-2026',
    title: 'Vietnam eVisa Requirements 2026',
    description: 'Full checklist: documents, photo rules, eligibility, and entry ports.',
  },
  {
    href: '/processing',
    title: 'Processing Times & Steps',
    description: 'How long an eVisa takes and the full application-to-approval flow.',
  },
  {
    href: '/fees',
    title: 'Fees & Pricing',
    description: 'Government fees by visa type plus our transparent service fee.',
  },
  {
    href: '/troubleshooting',
    title: 'Fix eVisa Errors',
    description: 'Emergency guides for payment failures, name mismatches, and delays.',
  },
  {
    href: '/check-requirement',
    title: 'Requirements by Country',
    description: 'Check eVisa eligibility and documents for your nationality.',
  },
];

type RelatedResourcesProps = {
  title?: string;
  links?: RelatedResourceLink[];
  /** Hide any link whose href starts with one of these paths (avoid self-links). */
  excludePaths?: string[];
  className?: string;
};

export default function RelatedResources({
  title = 'Helpful Vietnam eVisa resources',
  links = DEFAULT_RELATED_RESOURCES,
  excludePaths = [],
  className = '',
}: RelatedResourcesProps) {
  const visible = links.filter(
    (link) => !excludePaths.some((path) => link.href === path || link.href.startsWith(`${path}/`))
  );

  if (visible.length === 0) return null;

  return (
    <section
      className={`rounded-xl border-2 border-brand-border bg-white p-6 shadow-md ${className}`}
    >
      <h2 className="mb-5 font-display text-xl font-bold text-brand-ink">{title}</h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visible.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full flex-col rounded-lg border-2 border-gray-200 bg-gray-50 p-4 transition hover:border-brand-primary"
            >
              <span className="flex items-center gap-1.5 font-semibold text-brand-ink group-hover:text-brand-primary">
                {link.title}
                <ArrowRightIcon className="h-4 w-4 shrink-0" aria-hidden />
              </span>
              {link.description ? (
                <span className="mt-1 text-sm text-brand-muted">{link.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
