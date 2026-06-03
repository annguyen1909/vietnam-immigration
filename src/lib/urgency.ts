import {
  VIETNAM_URGENCY_FEE_SUPER_URGENT,
  VIETNAM_URGENCY_FEE_URGENT,
  VIETNAM_NORMAL_LABEL,
  VIETNAM_PROCESSING_TIME,
  VIETNAM_URGENCY_SUPER_LABEL,
  VIETNAM_URGENCY_URGENT_LABEL,
} from './vietnamPricing';

export type UrgencyValue = '' | 'super_urgent_24h' | 'urgent_48h';

const VIETNAM_TZ = 'Asia/Ho_Chi_Minh';

export const URGENCY_OPTIONS: {
  value: Exclude<UrgencyValue, ''>;
  label: string;
  description: string;
}[] = [
  {
    value: 'super_urgent_24h',
    label: VIETNAM_URGENCY_SUPER_LABEL,
    description: 'Within 1 business day',
  },
  {
    value: 'urgent_48h',
    label: VIETNAM_URGENCY_URGENT_LABEL,
    description: 'Within 3 business days',
  },
];

/** Display order: Normal → Urgent → Super Urgent */
export const PROCESSING_OPTION_ORDER: UrgencyValue[] = ['', 'urgent_48h', 'super_urgent_24h'];

export interface ProcessingAvailability {
  normal: boolean;
  urgent: boolean;
  superUrgent: boolean;
  /** Super Urgent only; auto-selected and cannot change */
  locked: boolean;
  forcedUrgency?: Exclude<UrgencyValue, ''>;
}

/** Before arrival date is chosen — all options selectable. */
export const DEFAULT_PROCESSING_AVAILABILITY: ProcessingAvailability = {
  normal: true,
  urgent: true,
  superUrgent: true,
  locked: false,
};

export function getProcessingAvailabilityForArrival(
  arrivalDateStr?: string
): ProcessingAvailability {
  if (!arrivalDateStr) return DEFAULT_PROCESSING_AVAILABILITY;
  return getProcessingAvailability(arrivalDateStr);
}

export function getVietnamTodayDateString(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: VIETNAM_TZ }).format(now);
}

/** Calendar days from today (Vietnam) until arrival date. */
export function daysUntilArrival(arrivalDateStr: string, now = new Date()): number | null {
  if (!arrivalDateStr) return null;

  const todayStr = getVietnamTodayDateString(now);
  const today = new Date(`${todayStr}T00:00:00`);
  const arrival = new Date(`${arrivalDateStr}T00:00:00`);
  if (Number.isNaN(arrival.getTime())) return null;

  return Math.round((arrival.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Arrival 1–3 days away: Super Urgent only (locked).
 * 4–5 days: Super Urgent + Urgent (Normal needs 5 days).
 * 6+ days: all three including Normal.
 */
export function getProcessingAvailability(arrivalDateStr: string): ProcessingAvailability {
  const days = daysUntilArrival(arrivalDateStr);

  if (days === null || days < 0) {
    return { normal: false, urgent: false, superUrgent: false, locked: false };
  }

  if (days <= 3) {
    return {
      normal: false,
      urgent: false,
      superUrgent: true,
      locked: true,
      forcedUrgency: 'super_urgent_24h',
    };
  }

  if (days >= 4 && days <= 5) {
    return { normal: false, urgent: true, superUrgent: true, locked: false };
  }

  return { normal: true, urgent: true, superUrgent: true, locked: false };
}

export function isUrgencyAllowed(
  urgency: UrgencyValue,
  availability: ProcessingAvailability
): boolean {
  if (availability.locked) return urgency === availability.forcedUrgency;
  if (urgency === '') return availability.normal;
  if (urgency === 'urgent_48h') return availability.urgent;
  if (urgency === 'super_urgent_24h') return availability.superUrgent;
  return false;
}

/** Default urgency when arrival date changes (not manual). */
export function suggestUrgencyFromArrival(arrivalDateStr: string): UrgencyValue {
  const availability = getProcessingAvailability(arrivalDateStr);
  if (availability.locked && availability.forcedUrgency) {
    return availability.forcedUrgency;
  }

  const days = daysUntilArrival(arrivalDateStr);
  if (days === null || days < 0) return '';
  if (days >= 6) return '';
  if (days >= 4) return 'urgent_48h';
  return 'super_urgent_24h';
}

/** Keep selection valid when availability changes. */
export function clampUrgencyToAvailability(
  urgency: UrgencyValue | undefined,
  arrivalDateStr: string
): UrgencyValue {
  const availability = getProcessingAvailability(arrivalDateStr);
  if (availability.locked && availability.forcedUrgency) {
    return availability.forcedUrgency;
  }

  const current = urgency ?? '';
  if (isUrgencyAllowed(current, availability)) return current;

  return suggestUrgencyFromArrival(arrivalDateStr);
}

export function getNormalProcessingSubtitle(waitTime?: string | null): string {
  const trimmed = waitTime?.trim();
  if (trimmed && !isLegacyWaitTime(trimmed)) return trimmed;
  return VIETNAM_PROCESSING_TIME;
}

function isLegacyWaitTime(waitTime: string): boolean {
  return (
    /^from\s+1\s+working\s+day\s+to\s+3\s+working\s+days?$/i.test(waitTime) ||
    /^from\s+3\s+working\s+days?\s+to\s+1\s+working\s+day$/i.test(waitTime) ||
    /^3\s+working\s+days?\s+to\s+1\s+working\s+day$/i.test(waitTime)
  );
}

export function getProcessingOptionTitle(value: UrgencyValue): string {
  if (value === '') return VIETNAM_NORMAL_LABEL;
  if (value === 'urgent_48h') return VIETNAM_URGENCY_URGENT_LABEL;
  return VIETNAM_URGENCY_SUPER_LABEL;
}

export function getProcessingOptionSubtitle(value: UrgencyValue, waitTime?: string | null): string {
  if (value === '') return getNormalProcessingSubtitle(waitTime);
  return URGENCY_OPTIONS.find((o) => o.value === value)?.description ?? '';
}

export function formatVietnamLocalTimeLine(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: VIETNAM_TZ,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).formatToParts(now);

  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';

  const time = `${pick('hour')}:${pick('minute')} ${pick('dayPeriod')}`.trim();
  const weekday = pick('weekday');
  const month = pick('month');
  const day = pick('day');

  return `Local time in Vietnam: ${time} ${weekday}, ${month} ${day} (UTC+07:00)`;
}

/** Names must match AddOnConfig rows in BudPal CRM (case-insensitive type match). */
export const URGENCY_ADDON_NAME_BY_VALUE: Record<Exclude<UrgencyValue, ''>, string> = {
  super_urgent_24h: 'Super Urgent - 24 hrs to Vietnam',
  urgent_48h: 'Urgent - 48 hrs to Vietnam',
};

export const FALLBACK_URGENCY_FEE_PER_PAX: Record<Exclude<UrgencyValue, ''>, number> = {
  super_urgent_24h: VIETNAM_URGENCY_FEE_SUPER_URGENT,
  urgent_48h: VIETNAM_URGENCY_FEE_URGENT,
};

/** Client-side: load all rush fees keyed by urgency value. */
export async function loadUrgencyFeesByValue(): Promise<Record<Exclude<UrgencyValue, ''>, number>> {
  const fees = { ...FALLBACK_URGENCY_FEE_PER_PAX };

  try {
    const response = await fetch('/api/add-ons?type=urgency');
    if (!response.ok) return fees;

    const data = await response.json();
    for (const value of Object.keys(URGENCY_ADDON_NAME_BY_VALUE) as Exclude<UrgencyValue, ''>[]) {
      const targetName = URGENCY_ADDON_NAME_BY_VALUE[value];
      const match = data.addOns?.find(
        (addon: { name: string; pricePerPax: number; isActive?: boolean }) =>
          addon.isActive !== false && addon.name === targetName
      );
      if (match?.pricePerPax != null) fees[value] = match.pricePerPax;
    }
  } catch {
    // use fallbacks
  }

  return fees;
}

export function getUrgencyLabel(value: UrgencyValue): string {
  return getProcessingOptionTitle(value);
}

function isMissingAddOnTable(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: string }).code === 'P2021'
  );
}

/** Server-side: resolve urgency fee from AddOnConfig when available. */
export async function resolveUrgencyFeePerPax(
  urgency: UrgencyValue,
  loadAddOn?: (name: string) => Promise<number | null>
): Promise<number> {
  if (!urgency) return 0;

  if (loadAddOn) {
    try {
      const price = await loadAddOn(URGENCY_ADDON_NAME_BY_VALUE[urgency]);
      if (price != null) return price;
    } catch (error) {
      if (!isMissingAddOnTable(error)) throw error;
    }
  }

  return FALLBACK_URGENCY_FEE_PER_PAX[urgency];
}

/** Client-side: fetch urgency fee from add-ons API. */
export async function getUrgencyFeePerPax(urgency: UrgencyValue): Promise<number> {
  if (!urgency) return 0;

  try {
    const response = await fetch('/api/add-ons?type=urgency');
    if (response.ok) {
      const data = await response.json();
      const targetName = URGENCY_ADDON_NAME_BY_VALUE[urgency];
      const match = data.addOns?.find(
        (addon: { name: string; pricePerPax: number; isActive?: boolean }) =>
          addon.isActive !== false && addon.name === targetName
      );
      if (match?.pricePerPax != null) return match.pricePerPax;
    }
  } catch {
    // use fallback below
  }

  return FALLBACK_URGENCY_FEE_PER_PAX[urgency];
}

export function getUrgencyFeePerPaxSync(urgency: UrgencyValue): number {
  if (!urgency) return 0;
  return FALLBACK_URGENCY_FEE_PER_PAX[urgency];
}
