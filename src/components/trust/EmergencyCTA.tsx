'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BoltIcon, ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';

export type EmergencyCTAProps = {
  headline?: string;
  subtext?: string;
  buttonLabel?: string;
  href?: string;
  /** inline: content-width block; banner: full-width section; sticky: bottom bar */
  variant?: 'inline' | 'banner' | 'sticky';
  /** Sticky only: pin to viewport (true) or stick within a scroll container (false, for previews). */
  fixed?: boolean;
  /** Sticky only: show close control. Default true — recommended for all pages. */
  dismissible?: boolean;
  /** sessionStorage key when dismissed (per page slug in production). */
  storageKey?: string;
  className?: string;
};

const DEFAULT_HEADLINE = 'Flight leaving soon? eVisa delayed or rejected?';
const DEFAULT_SUBTEXT =
  'Our experts can fix your application and get your emergency eVisa in 2 to 4 hours.';
const DEFAULT_BUTTON = 'Apply for Rush Service Now ⚡';
const DEFAULT_STORAGE_KEY = 'emergency-cta-dismissed';

/** High-urgency CTA for troubleshooting / "Fixer" pages. */
export default function EmergencyCTA({
  headline = DEFAULT_HEADLINE,
  subtext = DEFAULT_SUBTEXT,
  buttonLabel = DEFAULT_BUTTON,
  href = '/apply',
  variant = 'inline',
  fixed = true,
  dismissible = true,
  storageKey = DEFAULT_STORAGE_KEY,
  className = '',
}: EmergencyCTAProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (variant !== 'sticky' || !dismissible) return;
    try {
      if (sessionStorage.getItem(storageKey) === '1') {
        setDismissed(true);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [variant, dismissible, storageKey]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(storageKey, '1');
    } catch {
      // ignore
    }
  };

  if (variant === 'sticky' && dismissed) {
    return null;
  }

  const content = (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="min-w-0 flex-1">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900">
          <ClockIcon className="h-4 w-4" aria-hidden />
          Urgent travel support
        </div>
        <h2 className="font-display text-xl font-bold leading-tight text-brand-ink sm:text-2xl">
          {headline}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted sm:text-base">{subtext}</p>
      </div>
      <Link
        href={href}
        className="btn-primary shrink-0 gap-2 bg-brand-highlight text-center shadow-lg hover:bg-[#b84a34] focus-visible:outline-brand-highlight"
      >
        <BoltIcon className="h-5 w-5" aria-hidden />
        {buttonLabel}
      </Link>
    </div>
  );

  const inner = (
    <div
      className={`relative overflow-hidden rounded-xl border-2 border-amber-400/80 bg-gradient-to-br from-amber-50 via-white to-brand-surface-alt p-5 shadow-lg sm:p-6 ${variant === 'sticky' ? 'rounded-none border-x-0 border-b-0 sm:rounded-t-xl' : ''}`}
    >
      {variant === 'sticky' && dismissible ? (
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-2 top-2 z-10 rounded-full p-1.5 text-brand-muted transition hover:bg-amber-100 hover:text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-label="Dismiss urgent assistance banner"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden />
        </button>
      ) : null}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-300/30 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-brand-primary/10 blur-2xl"
        aria-hidden
      />
      <div className={`relative ${variant === 'sticky' && dismissible ? 'pr-8' : ''}`}>
        {content}
      </div>
    </div>
  );

  if (variant === 'sticky') {
    const positionClass = fixed
      ? 'fixed bottom-0 left-0 right-0 z-40'
      : 'sticky bottom-0 z-10 w-full';

    return (
      <div
        className={`${positionClass} border-t-2 border-amber-400/90 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md ${className}`}
        role="complementary"
        aria-label="Urgent eVisa assistance"
      >
        <div className="mx-auto max-w-5xl px-4 py-3 sm:py-4">{inner}</div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <section
        className={`w-full border-y-2 border-amber-300/60 bg-amber-50/50 py-6 sm:py-8 ${className}`}
        aria-label="Emergency eVisa assistance"
      >
        <div className="mx-auto max-w-5xl px-4">{inner}</div>
      </section>
    );
  }

  return (
    <div className={className} role="complementary" aria-label="Emergency eVisa assistance">
      {inner}
    </div>
  );
}
