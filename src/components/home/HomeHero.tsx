import Image from 'next/image';
import Link from 'next/link';
import { VIETNAM_PROCESSING_TIME } from '@/lib/vietnamPricing';

const trustPoints = [
  `${VIETNAM_PROCESSING_TIME} processing`,
  '24/7 application support',
  'Secure online payment',
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-surface-alt to-brand-surface">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,var(--brand-primary)_0%,transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-primary shadow-sm ring-1 ring-brand-border">
              <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden />
              Vietnam eVisa assistance
            </p>
            <h1 className="font-display mt-6 text-4xl font-bold leading-[1.1] text-brand-ink sm:text-5xl lg:text-[3.25rem]">
              Get your Vietnam eVisa <span className="text-brand-primary">without the hassle</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-muted leading-relaxed">
              We guide you through each step—requirements, documents, and payment—so you can focus
              on planning your trip to Vietnam.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/apply" className="btn-primary text-center">
                Start your application
              </Link>
              <Link href="/check-requirement" className="btn-secondary text-center">
                Check if you need a visa
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-brand-muted">
                  <svg
                    className="h-5 w-5 shrink-0 text-brand-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-brand-border">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/img/vietnam-hero.jpg"
                  alt="Travel to Vietnam"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm ring-1 ring-brand-border">
                <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                  Typical turnaround
                </p>
                <p className="font-display text-lg font-bold text-brand-primary">
                  {VIETNAM_PROCESSING_TIME}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
