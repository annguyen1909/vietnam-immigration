import Link from 'next/link';

const items = [
  {
    title: 'Not sure you need a visa?',
    desc: 'Check requirements for your nationality in one click.',
    href: '/check-requirement',
    cta: 'Country checker',
  },
  {
    title: 'Questions before you apply?',
    desc: 'Browse FAQs on processing, entry ports, and documents.',
    href: '/faq',
    cta: 'Read FAQ',
  },
  {
    title: 'Already applied?',
    desc: 'Track status or upload documents for an existing application.',
    href: '/applications',
    cta: 'My applications',
  },
];

export default function HomeHelpStrip() {
  return (
    <section className="py-14 bg-brand-surface-alt">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl bg-white p-6 ring-1 ring-brand-border transition hover:ring-brand-primary hover:shadow-md"
            >
              <h3 className="font-semibold text-brand-ink group-hover:text-brand-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted">{item.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-primary">
                {item.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
