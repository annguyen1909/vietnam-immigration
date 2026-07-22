import {
  VIETNAM_GOV_FEE_MULTIPLE,
  VIETNAM_GOV_FEE_SINGLE,
  VIETNAM_SERVICE_FEE_PER_PAX,
  VIETNAM_URGENCY_FEE_SUPER_URGENT,
  VIETNAM_URGENCY_FEE_URGENT,
  formatUsd,
} from '@/lib/vietnamPricing';

/** Fee FAQ for /fees — used by FAQPage schema + on-page FAQ. */
export const FEES_FAQ_ITEMS = [
  {
    question: 'What is the Vietnam visa fee in 2026?',
    answer: `On our portal, the government fee is ${formatUsd(VIETNAM_GOV_FEE_SINGLE)} for single entry and ${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} for multiple entry (standard 90-day tourist or business eVisa). Add ${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee per passenger, plus optional urgent tiers if you select them.`,
  },
  {
    question: 'How much does a Vietnam eVisa cost with assistance?',
    answer: `Total cost = government fee (${formatUsd(VIETNAM_GOV_FEE_SINGLE)} single / ${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} multiple) + ${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee per passenger + any Urgent (+${formatUsd(VIETNAM_URGENCY_FEE_URGENT)}) or Super Urgent (+${formatUsd(VIETNAM_URGENCY_FEE_SUPER_URGENT)}) add-on. Use the calculator on this page for your exact total before paying.`,
  },
  {
    question: 'What is the difference between government fee and service fee?',
    answer: `The government fee is the mandatory visa charge for your eVisa product. The service fee (${formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} per passenger) covers private application assistance—document checks, preparation support, and 24/7 help. It does not replace the government charge.`,
  },
  {
    question: 'Is multiple entry more expensive than single entry?',
    answer: `Yes. Multiple entry uses a ${formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} government fee versus ${formatUsd(VIETNAM_GOV_FEE_SINGLE)} for single entry. The service fee is the same per passenger. Choose multiple entry if you will leave and re-enter Vietnam during the visa validity window.`,
  },
  {
    question: 'Do children pay the same Vietnam visa fee?',
    answer: `Yes. Government fees follow visa type, not age. Budget the same per-passport government fee plus service fee for each traveler, including minors.`,
  },
  {
    question: 'Can I get a refund if my Vietnam eVisa is rejected?',
    answer:
      'Government fees are typically non-refundable once submitted. Our service fee may be refundable if immigration rejects your application—see the refund policy for exact conditions.',
  },
] as const;
