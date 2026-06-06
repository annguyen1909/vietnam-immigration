import React from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/layout/SiteFooter';
import { buildStaticPageMetadata } from '@/lib/seo';
import { VIETNAM_PROCESSING_TIME } from '@/lib/vietnamPricing';

export const metadata = buildStaticPageMetadata({
  title: 'Embassies in Vietnam: Locations, Contacts, and FAQs',
  description:
    'Guide to foreign embassies and consulates in Vietnam—locations, contacts, and FAQs for travelers and expats alongside your eVisa planning.',
  path: '/embassy',
});

export default function EmbassyPage() {
  return (
    <div className="bg-[#f7f9fb] min-h-screen flex flex-col w-full">
      <main className="flex flex-col md:flex-row w-full max-w-6xl mx-auto py-8 px-2 gap-8 flex-1">
        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white p-8 rounded-xl shadow-md">
          <style>{`.prose, .prose * { color: #1a202c !important; }`}</style>
          <article className="prose lg:prose-xl max-w-none">
            <h1 className="text-4xl font-extrabold text-brand-ink mb-2">
              Embassies in Vietnam: Locations, Contacts, and FAQs
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Your complete guide to foreign embassies and consulates in Vietnam. Find addresses,
              phone numbers, services, and answers to the most common questions for travelers,
              expats, and Vietnamese citizens.
            </p>

            {/* Table of Contents */}
            <nav className="mb-8 bg-brand-surface-alt border-l-4 border-[var(--brand-primary)] p-4 rounded">
              <h2 className="text-xl font-bold mb-2 text-[var(--brand-primary)]">
                Table of Contents
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-base">
                <li>
                  <a href="#overview">Overview</a>
                </li>
                <li>
                  <a href="#major-embassies">Major Embassies in Hanoi & Ho Chi Minh City</a>
                </li>
                <li>
                  <a href="#consulates">Consulates in Other Cities</a>
                </li>
                <li>
                  <a href="#services">What Services Do Embassies Provide?</a>
                </li>
                <li>
                  <a href="#emergency">Emergency Contacts</a>
                </li>
                <li>
                  <a href="#faq">Frequently Asked Questions</a>
                </li>
              </ul>
            </nav>

            <h2 id="overview">Overview</h2>
            <p>
              Embassies and consulates in Vietnam represent the interests of their home countries,
              providing vital services to their citizens and supporting diplomatic relations. Most
              embassies are in Hanoi (the capital), with many countries also maintaining consulates
              in Ho Chi Minh City and other major cities such as Da Nang.
            </p>

            <h2 id="major-embassies">Major Embassies in Hanoi & Ho Chi Minh City</h2>
            <p>
              Below is a sample of prominent foreign missions in Vietnam. For a full, up-to-date
              list, visit the{' '}
              <a href="https://www.mofa.gov.vn/" target="_blank" rel="noopener">
                Vietnamese Ministry of Foreign Affairs
              </a>
              .
            </p>
            <table className="table-auto border-collapse w-full mb-6">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Phone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">United States</td>
                  <td className="border px-4 py-2">7 Lang Ha, Ba Dinh, Hanoi</td>
                  <td className="border px-4 py-2">+84 24 3850 5000</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">United Kingdom</td>
                  <td className="border px-4 py-2">
                    Central Post Office Building, 4 Le Loi, District 1, HCMC
                  </td>
                  <td className="border px-4 py-2">+84 28 3825 1381</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Australia</td>
                  <td className="border px-4 py-2">8 Dao Tan, Ba Dinh, Hanoi</td>
                  <td className="border px-4 py-2">+84 24 3774 0100</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Japan</td>
                  <td className="border px-4 py-2">27 Lieu Giai, Ba Dinh, Hanoi</td>
                  <td className="border px-4 py-2">+84 24 3846 3000</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">China</td>
                  <td className="border px-4 py-2">
                    175 Hai Ba Trung, District 3, Ho Chi Minh City
                  </td>
                  <td className="border px-4 py-2">+84 28 3829 5584</td>
                </tr>
              </tbody>
            </table>

            <h2 id="consulates">Consulates in Other Cities</h2>
            <p>
              Some countries maintain consulates in Ho Chi Minh City, Da Nang, and other cities to
              provide additional support to their citizens and travelers.
            </p>

            <h2 id="services">What Services Do Embassies Provide?</h2>
            <ul>
              <li>Passport and visa services</li>
              <li>Assistance in emergencies</li>
              <li>Notarial and legal services</li>
              <li>Support for citizens in distress</li>
              <li>Information on local laws and customs</li>
            </ul>

            <h2 id="emergency">Emergency Contacts</h2>
            <p>
              If you are a foreign national in Vietnam and need urgent help, contact your embassy or
              consulate immediately. For police, fire, or medical emergencies in Vietnam, dial{' '}
              <strong>113</strong> for police, <strong>114</strong> for fire, and{' '}
              <strong>115</strong> for ambulance.
            </p>

            <h2 id="faq">Frequently Asked Questions</h2>
            <h3>How do I find my country&rsquo;s embassy in Vietnam?</h3>
            <p>
              Visit the{' '}
              <a href="https://www.mofa.gov.vn/" target="_blank" rel="noopener">
                Vietnamese Ministry of Foreign Affairs
              </a>{' '}
              for a full list of embassies and consulates in Vietnam.
            </p>
            <h3>Can I get a visa at my embassy in Vietnam?</h3>
            <p>
              Most embassies do not issue Vietnamese visas. You should apply online for an eVisa
              before traveling. Embassies can assist with other consular services.
            </p>
            <h3>What should I do if I lose my passport in Vietnam?</h3>
            <p>
              Contact your embassy immediately for assistance with emergency travel documents and to
              report the loss to local police.
            </p>
            <h3>What are the opening hours of embassies in Vietnam?</h3>
            <p>
              Most embassies are open Monday to Friday, 8:30am–4:30pm, but hours may vary. Always
              check the embassy&apos;s website or call ahead.
            </p>
            <h3>Can embassies help with legal problems or arrests?</h3>
            <p>
              Embassies can provide guidance, contact family, and recommend local lawyers, but they
              cannot intervene in legal proceedings or pay fines.
            </p>
            <h3>How do I contact the Vietnamese Ministry of Foreign Affairs?</h3>
            <p>
              Visit{' '}
              <a href="https://www.mofa.gov.vn/" target="_blank" rel="noopener">
                mofa.gov.vn
              </a>{' '}
              for official information.
            </p>
          </article>
        </div>
        {/* Sidebar */}
        <aside className="w-full md:w-[340px] flex flex-col gap-6">
          {/* 24/7 Help Box */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-[var(--brand-primary)] mb-3 flex items-center">
              <svg
                className="h-6 w-6 mr-2 text-brand-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              EXPERTS AVAILABLE 24/7
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:visa@unitedevisa.com"
                  className="text-brand-primary hover:underline"
                >
                  visa@unitedevisa.com
                </a>
              </p>
              <div className="flex items-center gap-2 text-gray-800">
                <span className="text-xl">🇺🇸</span>
                <span className="font-medium">United States</span>
                <span className="ml-auto font-semibold tracking-wide">+1 323 286 4541</span>
              </div>
              {/* UK phone number hidden but not deleted */}
              {/* <div className="flex items-center gap-2 text-gray-800">
                <span className="text-xl">🇬🇧</span>
                <span className="font-medium">United Kingdom</span>
                <span className="ml-auto font-semibold tracking-wide">+44 5555 000000</span>
              </div> */}
              <Link
                href="/worldwide-phone"
                className="text-brand-primary underline font-medium text-sm pt-1 block text-center w-full"
              >
                Worldwide phone support
              </Link>
            </div>
          </div>
          {/* Apply with Confidence Box */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center">
              <svg
                className="h-6 w-6 mr-2 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              APPLY WITH CONFIDENCE
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <span>Fast, secure, and reliable visa processing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <span>Safe online payment—no hidden fees</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <span>Most visas approved within {VIETNAM_PROCESSING_TIME}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <span>
                  Optional Urgent (3 days) / Super Urgent (1 day) processing—fees shown at checkout
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <span>Transparent pricing, no surprises</span>
              </li>
              <li className="flex items-start font-semibold">
                <span className="text-green-500 mr-2 mt-1">✔</span>
                <span>100% Service Fees Returned if Rejected</span>
              </li>
            </ul>
          </div>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
