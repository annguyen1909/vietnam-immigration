/** Visa type lists on requirement pages are loaded from the database in the page component. */

import {
  VIETNAM_COUNTRY_FEES_LINES,
  VIETNAM_PROCESSING_TIME,
  getVietnamStayDurationFaqLine,
} from '@/lib/vietnamPricing';

export interface CountryVisaContentEntry {
  displayName: string;
  demonym?: string;
  requirements: string[];
  visaTypes: { name: string; description: string }[];
  fees: string[];
  faqs: { q: string; a: string }[];
  /** Country-specific eligibility copy (replaces generic paragraph when set). */
  eligibilityIntro?: string;
  /** Extra travel/visa tip shown in Travel Tips section. */
  travelInsight?: string;
}

export const countryVisaContent: { [key: string]: CountryVisaContentEntry & { demonym?: string } } =
  {
    'united-states': {
      displayName: 'United States',
      demonym: 'American',
      requirements: [
        'A valid US passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [
        {
          q: 'How long can US citizens stay?',
          a: getVietnamStayDurationFaqLine(),
        },
        {
          q: 'Can I extend my visa?',
          a: 'Extensions may be available at Vietnam Immigration Department offices before your e-Visa expires, subject to approval, visa type, and additional fees.',
        },
        {
          q: 'Do children need a visa?',
          a: 'Yes, all travelers including children need a visa application. Families or groups can apply for up to 15 passengers in a single application.',
        },
        {
          q: 'How do I check my visa status?',
          a: `Use your reference number and last name to check online. Results are sent by email typically within ${VIETNAM_PROCESSING_TIME}.`,
        },
      ],
    },
    'aland-islands': {
      displayName: 'Aland Islands',
      demonym: 'Aland Islands citizens',
      requirements: [
        'A valid Aland Islands passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    afghanistan: {
      displayName: 'Afghanistan',
      demonym: 'Afghan',
      requirements: [
        'A valid Afghanistan passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    albania: {
      displayName: 'Albania',
      demonym: 'Albanian',
      requirements: [
        'A valid Albania passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    algeria: {
      displayName: 'Algeria',
      demonym: 'Algerian',
      requirements: [
        'A valid Algeria passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    'american-samoa': {
      displayName: 'American Samoa',
      demonym: 'American Samoan',
      requirements: [
        'A valid American Samoa passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    andorra: {
      displayName: 'Andorra',
      demonym: 'Andorran',
      requirements: [
        'A valid Andorra passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    angola: {
      displayName: 'Angola',
      demonym: 'Angolan',
      requirements: [
        'A valid Angola passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    anguilla: {
      displayName: 'Anguilla',
      demonym: 'Anguillan',
      requirements: [
        'A valid Anguilla passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    'antigua-and-barbuda': {
      displayName: 'Antigua and Barbuda',
      demonym: 'Antiguan and Barbudan',
      requirements: [
        'A valid Antigua and Barbuda passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    argentina: {
      displayName: 'Argentina',
      demonym: 'Argentine',
      requirements: [
        'A valid Argentina passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    armenia: {
      displayName: 'Armenia',
      demonym: 'Armenian',
      requirements: [
        'A valid Armenia passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    aruba: {
      displayName: 'Aruba',
      demonym: 'Aruban',
      requirements: [
        'A valid Aruba passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    australia: {
      displayName: 'Australia',
      demonym: 'Australian',
      requirements: [
        'A valid Australia passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    austria: {
      displayName: 'Austria',
      demonym: 'Austrian',
      requirements: [
        'A valid Austria passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    azerbaijan: {
      displayName: 'Azerbaijan',
      demonym: 'Azerbaijani',
      requirements: [
        'A valid Azerbaijan passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    bahamas: {
      displayName: 'Bahamas',
      demonym: 'Bahamian',
      requirements: [
        'A valid Bahamas passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    bahrain: {
      displayName: 'Bahrain',
      demonym: 'Bahraini',
      requirements: [
        'A valid Bahrain passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    canada: {
      displayName: 'Canada',
      demonym: 'Canadian',
      requirements: [
        'A valid Canada passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    },
    default: {
      displayName: 'your country',
      demonym: '{country} citizens',
      requirements: [
        'A valid passport (at least 6 months validity from arrival date, 1 blank page)',
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [
        {
          q: 'How long can I stay?',
          a: getVietnamStayDurationFaqLine(),
        },
        {
          q: 'Can I extend my visa?',
          a: 'Extensions may be available at Vietnam Immigration Department offices before your e-Visa expires, subject to approval, visa type, and additional fees.',
        },
        {
          q: 'Do children need a visa?',
          a: 'Yes, all travelers including children need a visa application. Families or groups can apply for up to 15 passengers in a single application.',
        },
        {
          q: 'How do I check my visa status?',
          a: `Use your reference number and last name to check online. Results are sent by email typically within ${VIETNAM_PROCESSING_TIME}.`,
        },
      ],
    },
  };

export const sharedFaqs = [
  {
    q: 'What documents do {citizen} need to apply for a Vietnam e-Visa?',
    a: `To apply for a Vietnam e-Visa, {citizen} will need the following:\n\n- **Valid Passport:** Must have at least 6 months validity from your arrival date in Vietnam and at least 1 blank page.\n- **Completed Online Application:** Fill out the official Vietnam e-Visa form with accurate personal and travel details.\n- **Email Address:** A valid email to receive notifications and your approved e-Visa.\n- **Credit or Debit Card:** For secure online payment of government and service fees.\n\n*Tip: Double-check your information before submitting to avoid delays. A stable internet connection is recommended during the application process.*`,
  },
  {
    q: 'How long does it take to process a Vietnam e-Visa for {citizen}?',
    a: `The processing time for a Vietnam e-Visa for {citizen} is typically:\n\n- **Standard Processing:** ${VIETNAM_PROCESSING_TIME}\n\nOnce approved, your e-Visa will be sent directly to your email. We recommend {citizen} apply at least a few days before your intended travel date, though processing is usually very fast.\n\nYou can track your application status online at any time using your reference number.`,
  },
  {
    q: 'Do children from {country} need a visa?',
    a: `Yes, **every traveler** from {country}—including infants and children—must have their own e-Visa to enter Vietnam.\n\n- Children must be included in the application process and have their own passport or be listed on a parent's passport (if allowed by your country).\n- Group or family applications are available for up to 15 passengers in a single application to simplify the process for families traveling together.\n\nIf you have questions about applying for children, our support team is available 24/7 to assist you.`,
  },
  {
    q: 'How do {citizen} check their visa status?',
    a: `{citizen} can easily check the status of their Vietnam e-Visa application online:\n\n1. Log in to your [account dashboard](/account).\n2. Open your application to view the current status and any document requests.\n3. Approval emails are usually sent within ${VIETNAM_PROCESSING_TIME} once processing completes.\n\nIf you need help locating your reference number or have trouble accessing your status, contact our support team for assistance.`,
  },
  {
    q: 'How long can {citizen} stay in Vietnam with an e-Visa?',
    a: `The duration of stay for {citizen} depends on the type of e-Visa obtained. ${getVietnamStayDurationFaqLine()} See the visa types section on this page for current government fees.\n\nIf you need to stay longer, see the FAQ about visa extensions.`,
  },
  {
    q: 'Can {citizen} extend their visa?',
    a: `Yes, {citizen} may be able to extend their Vietnam e-Visa to stay longer:\n\n- **Extension:** Available in some cases at Vietnam Immigration Department offices before your e-Visa expires.\n- **Where to Apply:** Immigration offices in major cities such as Hanoi, Ho Chi Minh City, or Da Nang.\n- **Required Documents:** Passport, current e-Visa, application form, and fees as required by authorities.\n\nExtension approval is not guaranteed. Contact our support team for current rules and in-country extension guidance.`,
  },
];

countryVisaContent['default'] = {
  displayName: 'International',
  demonym: 'International travelers',
  requirements: [
    'A valid passport (at least 6 months validity from arrival date, 1 blank page)',
    'Completed online application form',
    'Payment by credit/debit card',
    'A valid email address to receive your e-Visa',
  ],
  visaTypes: [],
  fees: [...VIETNAM_COUNTRY_FEES_LINES],
  faqs: [],
};

// --- AUTO-GENERATED ENTRIES FOR MISSING COUNTRIES BELOW ---
import { countries } from './countries';
import { applyCountryVisaEnrichment } from './countryVisaEnrichment';

Object.values(countries).forEach((c) => {
  const slug = c.name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');
  const demonym = `${c.name} citizen`;
  if (!countryVisaContent[slug]) {
    countryVisaContent[slug] = {
      displayName: c.name,
      demonym,
      requirements: [
        `A valid ${c.name} passport (at least 6 months validity from arrival date, 1 blank page)`,
        'Completed online application form',
        'Payment by credit/debit card',
        'A valid email address to receive your e-Visa',
      ],
      visaTypes: [],
      fees: [...VIETNAM_COUNTRY_FEES_LINES],
      faqs: [],
    };
  }
});

applyCountryVisaEnrichment(countryVisaContent);
