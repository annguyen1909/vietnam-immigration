import Link from 'next/link';

/** End-of-article CTA — apply on this site; avoid sending readers through multiple internal pages. */
export default function BlogVisaResources() {
  return (
    <aside
      className="mt-10 rounded-lg border-2 border-brand-primary bg-brand-surface p-6"
      aria-label="Apply for Vietnam eVisa"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Ready to apply for your Vietnam eVisa?
      </h2>
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        Complete the application on this website — the same guided flow linked throughout our
        guides. You do not need to open a separate FAQ or blog page to start.
      </p>
      <Link
        href="/apply"
        className="flex w-full items-center justify-center rounded-lg bg-brand-primary px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:opacity-95"
      >
        Apply for Vietnam eVisa
      </Link>
      <p className="mt-4 text-center text-xs text-gray-500">
        Eligibility questions only?{' '}
        <Link
          href="/check-requirement"
          className="font-semibold text-brand-primary hover:underline"
        >
          Check requirements by country
        </Link>
      </p>
    </aside>
  );
}
