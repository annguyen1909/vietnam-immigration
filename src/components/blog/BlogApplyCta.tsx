import Link from 'next/link';

type BlogApplyCtaProps = {
  className?: string;
  compact?: boolean;
};

/** Keeps blog readers on the site apply funnel instead of scattering to FAQ/blog links. */
export default function BlogApplyCta({ className = '', compact = false }: BlogApplyCtaProps) {
  if (compact) {
    return (
      <div
        className={`flex flex-col gap-3 rounded-lg border-2 border-brand-primary bg-brand-surface-alt px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
      >
        <p className="text-sm font-medium text-brand-ink">
          Ready to apply? Use our guided 4-step form on this site.
        </p>
        <Link
          href="/apply"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95"
        >
          Apply for Vietnam eVisa
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border-2 border-brand-primary bg-gradient-to-br from-brand-surface-alt to-white p-6 shadow-md ${className}`}
    >
      <h2 className="font-display text-xl font-bold text-brand-ink">
        Apply on vietnamemigration.com
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        Start your Vietnam eVisa here — visa type, travel dates, passenger details, secure payment,
        and document upload. No need to leave this site for another application page.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/apply"
          className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:opacity-95"
        >
          Start application
        </Link>
        <Link
          href="/check-requirement"
          className="inline-flex items-center justify-center text-sm font-semibold text-brand-primary underline-offset-2 hover:underline"
        >
          Check requirements first
        </Link>
      </div>
    </div>
  );
}
