import { VIETNAM_PROCESSING_TIME } from '@/lib/vietnamPricing';

const features = [
  {
    title: 'Assisted eVisa processing',
    desc: 'Secure handling of Vietnam entry eVisas for tourism and short visits in line with current regulations.',
  },
  {
    title: 'Professional application assistance',
    desc: 'Step-by-step guidance so your form, dates, and traveler details match official requirements.',
  },
  {
    title: 'Real-time application tracking',
    desc: 'Check status online anytime with updates as your application moves through review.',
  },
  {
    title: '24/7 customer support',
    desc: 'Reach our team day or night for help with forms, documents, or payment questions.',
  },
  {
    title: 'Expedited processing options',
    desc: `Standard turnaround of ${VIETNAM_PROCESSING_TIME}, with clear timelines before you pay.`,
  },
];

export default function HomeServicePackage() {
  return (
    <section className="bg-brand-surface-alt py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white p-8 sm:p-10 shadow-sm ring-1 ring-brand-border">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block rounded-full bg-brand-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Service package
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-brand-ink sm:text-4xl">
              Everything included in your application
            </h2>
            <p className="mt-3 text-brand-muted">
              One comprehensive service covering review, support, and delivery of your Vietnam
              eVisa.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-xl bg-brand-surface p-5 ring-1 ring-brand-border"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-brand-ink">{feature.title}</h3>
                  <p className="mt-1 text-sm text-brand-muted leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-brand-primary px-6 py-4 text-center">
            <p className="font-semibold text-white">
              Money-back guarantee: full refund of service fees if your visa application is rejected
              by Vietnamese authorities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
