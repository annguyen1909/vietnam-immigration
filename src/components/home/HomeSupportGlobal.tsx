import Link from 'next/link';
import AnimatedFlagRow from '@/components/ui/AnimatedFlagRow';

const supportFeatures = [
  {
    title: 'Dedicated support team',
    desc: 'Immigration specialists available 24/7 to help with your application and answer questions.',
  },
  {
    title: 'Document assistance',
    desc: 'Guidance on passport photos, scans, and formatting to meet Vietnamese requirements.',
  },
  {
    title: 'Money-back guarantee',
    desc: 'Full refund of service fees if your visa application is rejected by the Government of Vietnam.',
  },
];

export default function HomeSupportGlobal() {
  return (
    <section className="bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-border">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white">
                24/7
              </span>
              <h2 className="font-display text-2xl font-bold text-brand-ink">
                Professional support
              </h2>
            </div>
            <p className="mt-4 text-brand-muted leading-relaxed">
              Our team is here around the clock to guide you through requirements, documents, and
              application status.
            </p>
            <ul className="mt-6 space-y-3">
              {supportFeatures.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl bg-brand-surface p-4 ring-1 ring-brand-border"
                >
                  <p className="font-semibold text-brand-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-brand-muted">{item.desc}</p>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-primary mt-6 inline-block">
              Contact support
            </Link>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-surface-alt to-white p-8 shadow-sm ring-1 ring-brand-border">
            <span className="inline-block rounded-full bg-brand-primary px-3 py-1 text-xs font-bold uppercase text-white">
              Global service
            </span>
            <h2 className="font-display mt-4 text-2xl font-bold text-brand-ink">
              Trusted worldwide
            </h2>
            <p className="mt-2 text-brand-muted">
              We assist travelers from countries around the world with Vietnam eVisa applications.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl bg-white p-4 ring-1 ring-brand-border">
              <AnimatedFlagRow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
