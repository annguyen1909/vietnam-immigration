import type { ReactNode } from 'react';
import {
  LockClosedIcon,
  ClockIcon,
  ArrowPathIcon,
  DocumentCheckIcon,
} from '@heroicons/react/24/outline';

export type TrustBadgeItem = {
  icon: ReactNode;
  label: string;
  detail?: string;
};

const DEFAULT_BADGES: TrustBadgeItem[] = [
  {
    icon: <LockClosedIcon className="h-6 w-6" aria-hidden />,
    label: 'SSL Secure Checkout',
    detail: '256-bit encrypted payments',
  },
  {
    icon: <DocumentCheckIcon className="h-6 w-6" aria-hidden />,
    label: 'Gov-Compliant Application',
    detail: 'Aligned with Vietnam eVisa rules',
  },
  {
    icon: <ClockIcon className="h-6 w-6" aria-hidden />,
    label: '100% On-Time Guarantee',
    detail: 'Rush options when you need speed',
  },
  {
    icon: <ArrowPathIcon className="h-6 w-6" aria-hidden />,
    label: 'Full Refund if Rejected',
    detail: 'Service fee back per our policy',
  },
];

export type TrustBadgesProps = {
  badges?: TrustBadgeItem[];
  layout?: 'row' | 'grid';
  /** light: default surfaces; dark: footer / ink backgrounds */
  variant?: 'light' | 'dark';
  className?: string;
};

/** Reassurance strip for footer, checkout, and apply flows. */
export default function TrustBadges({
  badges = DEFAULT_BADGES,
  layout = 'row',
  variant = 'light',
  className = '',
}: TrustBadgesProps) {
  const isDark = variant === 'dark';
  const layoutClass =
    layout === 'grid'
      ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
      : 'flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-between';

  return (
    <div
      className={`rounded-xl border px-4 py-5 sm:px-6 ${
        isDark ? 'border-white/15 bg-white/5' : 'border-brand-border bg-brand-surface-alt/80'
      } ${className}`}
      role="list"
      aria-label="Trust and security guarantees"
    >
      <ul className={layoutClass}>
        {badges.map((badge) => (
          <li
            key={badge.label}
            role="listitem"
            className={`flex min-w-[200px] flex-1 items-center gap-3 rounded-lg px-4 py-3 shadow-sm border ${
              isDark
                ? 'border-white/15 bg-white/10 text-white'
                : 'border-brand-border/60 bg-white/90'
            }`}
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                isDark
                  ? 'bg-white/15 text-brand-accent-light'
                  : 'bg-brand-primary/10 text-brand-primary'
              }`}
            >
              {badge.icon}
            </span>
            <span className="min-w-0">
              <span
                className={`block text-sm font-bold leading-snug ${
                  isDark ? 'text-white' : 'text-brand-ink'
                }`}
              >
                {badge.label}
              </span>
              {badge.detail ? (
                <span
                  className={`mt-0.5 block text-xs ${isDark ? 'text-white/70' : 'text-brand-muted'}`}
                >
                  {badge.detail}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
