import Link from 'next/link';

const steps = [
  {
    title: 'Submit application',
    desc: 'Complete the online form with contact details, visa type, travel dates, and passenger count.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Secure payment',
    desc: 'Pay government and service fees through our encrypted checkout. All charges shown upfront.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    title: 'Document review',
    desc: 'Upload passport and photo. Our team verifies files before your application proceeds.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Receive eVisa',
    desc: 'Approved eVisas are sent to your email. Print a copy to present at immigration in Vietnam.',
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function HomeProcessDetailed() {
  return (
    <section className="bg-white py-16 sm:py-20 border-y border-brand-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Application process
          </h2>
          <p className="mt-3 text-brand-muted">
            Four clear steps from start to approved eVisa—most travelers finish in under 15 minutes.
          </p>
        </div>

        <ol className="mt-12 space-y-0">
          {steps.map((step, idx) => (
            <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
              {idx < steps.length - 1 && (
                <span
                  className="absolute left-7 top-14 bottom-0 w-0.5 bg-brand-border"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white shadow-md ring-4 ring-white">
                {idx + 1}
              </span>
              <div className="flex-1 rounded-xl bg-brand-surface p-5 ring-1 ring-brand-border pt-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-brand-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <Link href="/apply" className="btn-primary">
            Start application
          </Link>
        </div>
      </div>
    </section>
  );
}
