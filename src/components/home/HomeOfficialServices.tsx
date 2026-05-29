const services = [
  {
    title: 'Expert Application Review',
    copy: 'Each application is reviewed by specialists familiar with Vietnam eVisa requirements to help ensure accuracy before submission.',
    badge: 'Certified',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: 'Document Verification',
    copy: 'We help you prepare and verify passport scans, photos, and supporting documents to meet Vietnamese immigration standards.',
    badge: 'Official',
    icon: (
      <svg
        className="h-8 w-8"
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
    title: 'Transparent Process',
    copy: 'Clear fees, progress updates, and no hidden charges—you always know what you are paying for and where your application stands.',
    badge: 'Guaranteed',
    icon: (
      <svg
        className="h-8 w-8"
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
];

export default function HomeOfficialServices() {
  return (
    <section className="bg-white py-16 sm:py-20 border-y border-brand-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Why travelers choose our service
          </h2>
          <p className="mt-3 text-brand-muted">
            Professional immigration assistance with clear standards and dedicated expertise.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl bg-brand-surface p-6 ring-1 ring-brand-border transition hover:shadow-md hover:ring-brand-primary/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary text-white shadow-sm">
                {service.icon}
              </div>
              <span className="mt-4 inline-block rounded-full bg-brand-accent/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-primary-dark">
                {service.badge}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-brand-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
