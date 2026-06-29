/**
 * Canonical Vietnam eVisa pricing and marketing copy.
 * Government fees in checkout come from VisaType.fees (DB); values here match seed defaults.
 * Keep in sync with scripts/seed-vietnam.js — these values are hardcoded site-wide.
 */
export const VIETNAM_SERVICE_FEE_PER_PAX = 59.99;

export const VIETNAM_GOV_FEE_SINGLE = 55;
export const VIETNAM_GOV_FEE_MULTIPLE = 80;

export const VIETNAM_URGENCY_FEE_URGENT = 110;
export const VIETNAM_URGENCY_FEE_SUPER_URGENT = 220;

export const VIETNAM_STAY_DAYS = 90;

/** Standard (Normal) processing — matches VisaType.waitTime in DB. */
export const VIETNAM_PROCESSING_TIME = 'Within 5 business days';

/** Processing tiers at apply (our handling windows). */
export const VIETNAM_NORMAL_LABEL = 'Normal (5 days)';
export const VIETNAM_URGENCY_URGENT_LABEL = 'Urgent (3 days)';
export const VIETNAM_URGENCY_SUPER_LABEL = 'Super Urgent (1 day)';

export const VIETNAM_VISA_PRODUCTS = [
  {
    id: 'vietnam-tourist-single-90-days',
    label: 'Tourist eVisa (Single Entry for 90 days)',
    govFee: VIETNAM_GOV_FEE_SINGLE,
  },
  {
    id: 'vietnam-tourist-multiple-90-days',
    label: 'Tourist eVisa (Multiple Entries for 90 days)',
    govFee: VIETNAM_GOV_FEE_MULTIPLE,
  },
  {
    id: 'vietnam-business-single-90-days',
    label: 'Business eVisa (Single Entry for 90 days)',
    govFee: VIETNAM_GOV_FEE_SINGLE,
  },
  {
    id: 'vietnam-business-multiple-90-days',
    label: 'Business eVisa (Multiple Entries for 90 days)',
    govFee: VIETNAM_GOV_FEE_MULTIPLE,
  },
] as const;

export function formatUsd(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

/**
 * All-in per-applicant price (government fee + flat service fee) for each visa
 * product. Used to build Offer / AggregateOffer JSON-LD on /fees and /apply.
 */
export function getVietnamVisaOffers() {
  const offers = VIETNAM_VISA_PRODUCTS.map((product) => ({
    id: product.id,
    label: product.label,
    price: Number((product.govFee + VIETNAM_SERVICE_FEE_PER_PAX).toFixed(2)),
  }));
  const prices = offers.map((o) => o.price);
  return {
    offers,
    currency: 'USD',
    lowPrice: Math.min(...prices).toFixed(2),
    highPrice: Math.max(...prices).toFixed(2),
  };
}

/** e.g. "$55 single / $80 multiple" */
export const VIETNAM_GOV_FEE_SUMMARY = `${formatUsd(VIETNAM_GOV_FEE_SINGLE)} single / ${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} multiple`;

/** Country requirement pages — fee bullet list (per country). */
export const VIETNAM_COUNTRY_FEES_LINES = [
  "Government Fee: Set by Vietnam's immigration authorities",
  'Service Fee: For application support, review, and 24/7 assistance',
  `Visa turnaround: ${VIETNAM_PROCESSING_TIME}`,
] as const;

export function getVietnamVisaTypesFaqMarkdown(options?: {
  includeProcessingNote?: boolean;
  extraFooter?: string;
}): string {
  const lines = VIETNAM_VISA_PRODUCTS.map((p) => `- **${p.label}** – ${formatUsd(p.govFee)}`);
  let text = `Vietnam offers four official eVisa types (all up to ${VIETNAM_STAY_DAYS} days):\n\n${lines.join('\n')}`;
  if (options?.includeProcessingNote !== false) {
    text += `\n\nProcessing time: Typically ${VIETNAM_PROCESSING_TIME}.`;
  }
  if (options?.extraFooter) {
    text += `\n\n${options.extraFooter}`;
  }
  return text;
}

/** Main FAQ registry answer for visa types. */
export function getVietnamVisaTypesFaqAnswer(): string {
  return `${getVietnamVisaTypesFaqMarkdown({ includeProcessingNote: false })}

Processing time: All Vietnam eVisas are typically processed ${VIETNAM_PROCESSING_TIME}.

Note: Families or groups can apply for up to 15 passengers in a single application. Children also need visa applications.

See [Visa Types & Fees](/fees) for more details.`;
}

export function getVietnamStayDurationFaqLine(): string {
  return `Standard eVisas allow up to ${VIETNAM_STAY_DAYS} days — single entry (${formatUsd(VIETNAM_GOV_FEE_SINGLE)}) or multiple entries (${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)}), tourist or business.`;
}

export function getVietnamFeesMetaDescription(): string {
  return `Vietnam eVisa fees: ${formatUsd(VIETNAM_GOV_FEE_SINGLE)} single / ${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} multiple entry (${VIETNAM_STAY_DAYS} days), ${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee per passenger, optional Urgent processing at apply.`;
}

export function getVietnamFeesHeroSubtitle(): string {
  return 'Transparent pricing with no hidden charges, no rush fees—just clear, official fees for total peace of mind.';
}

export function getVietnamFeesStructureSubtitle(): string {
  return `Government fee (${formatUsd(VIETNAM_GOV_FEE_SINGLE)} single entry / ${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} multiple entry, ${VIETNAM_STAY_DAYS}-day visas) + ${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee per passenger. Optional rush processing is chosen during apply.`;
}

export function getVietnamAboutTransparentFeesDesc(): string {
  return `Clear fees: government charge by visa type (${VIETNAM_GOV_FEE_SUMMARY}, ${VIETNAM_STAY_DAYS} days), flat ${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee per passenger, optional Urgent processing at apply, plus a service-fee refund guarantee if the Government of Vietnam rejects your application.`;
}

export function getVietnamBlogResourcesFeeDesc(): string {
  return `${formatUsd(VIETNAM_GOV_FEE_SINGLE)}/${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} government fees by visa type, ${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee, optional Urgent at apply.`;
}

export function getVietnamDefaultSiteDescription(): string {
  return `Apply for your official Vietnam eVisa online. Fast, secure, and reliable processing with 24/7 support. Processing typically takes ${VIETNAM_PROCESSING_TIME}.`;
}

export function getVietnamHomePageDescription(): string {
  return `Apply for your Vietnam eVisa with guided online assistance. Fast processing (${VIETNAM_PROCESSING_TIME}), clear fees, and 24/7 support.`;
}

export function getVietnamProcessingPageDescription(): string {
  return `How long does a Vietnam eVisa take? Standard processing from ${VIETNAM_PROCESSING_TIME}, with clear steps from application to approval.`;
}

export function getVietnamApplyLayoutDescription(): string {
  return `Start your Vietnam eVisa application online. Secure payment, document upload, and processing in as little as ${VIETNAM_PROCESSING_TIME}.`;
}
