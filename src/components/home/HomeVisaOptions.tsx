import Link from 'next/link';
import type { VietnamVisaTypeView } from '@/lib/vietnamVisa';

const SERVICE_FEE = 59.99;

type HomeVisaOptionsProps = {
  visaTypes: VietnamVisaTypeView[];
};

export default function HomeVisaOptions({ visaTypes }: HomeVisaOptionsProps) {
  return (
    <section className="py-16 sm:py-20" id="visa-options">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl">
            Official Vietnam eVisa options
          </h2>
          <p className="mt-3 text-brand-muted">
            Tourist and business routes, single or multiple entry — all valid up to 90 days.
            Government fee plus a flat ${SERVICE_FEE} service fee per traveler.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {visaTypes.map((plan, index) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md ${
                index === 0 ? 'border-brand-primary' : 'border-brand-border'
              }`}
            >
              {index === 0 && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-accent px-3 py-0.5 text-xs font-bold text-brand-primary-dark">
                  Popular
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
                {plan.category}
              </p>
              <h3 className="font-display mt-1 text-xl font-bold text-brand-ink">{plan.name}</h3>
              <p className="mt-1 text-sm text-brand-muted">
                {plan.entry} · up to {plan.durationDays} days
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-brand-primary">${plan.govFee}</span>
                <span className="text-brand-muted"> gov. fee</span>
                <span className="mt-1 block text-sm text-brand-muted">
                  + ${SERVICE_FEE} service fee per person
                </span>
              </p>
              <Link
                href={`/apply?type=${plan.applyQuery}`}
                className={`mt-8 block rounded-xl py-3 text-center font-semibold transition ${
                  index === 0
                    ? 'bg-brand-primary text-white hover:bg-brand-primary-dark'
                    : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-surface-alt'
                }`}
              >
                Apply now
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-brand-muted">
          <Link href="/fees" className="font-medium text-brand-primary hover:underline">
            View full fee breakdown →
          </Link>
        </p>
      </div>
    </section>
  );
}
