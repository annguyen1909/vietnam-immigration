/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Disclaimers',
  description:
    'Disclaimers for Vietnam eVisa assistance—we are a private service, not affiliated with the Government of Vietnam.',
  path: '/disclaimers',
});

export default function DisclaimersPage() {
  return (
    <>
      <div className="bg-[#f7f9fb] min-h-screen flex flex-col w-full">
        <main className="flex-1">
          {/* Header Section */}
          <section className="w-full bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <h1 className="text-4xl font-extrabold text-brand-ink mb-4">
                Disclaimers & Legal Notices
              </h1>
              <p className="text-lg text-[#64748b]">
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    1. Company Information and Service Nature
                  </h2>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                    <p className="text-brand-ink mb-3">
                      <strong>Important Notice:</strong> vietnamemigration.com is managed by Vietnam
                      Vietnam eVisa Assistance Team, a privately-owned business that offers visa
                      application support and assistance services.
                    </p>
                    <p className="text-brand-ink font-semibold">
                      We have NO affiliation with the Government of Vietnam or any official
                      immigration agency.
                    </p>
                  </div>
                  <p className="text-brand-ink mb-4">
                    Our function is to help you with the visa application process by offering
                    guidance, document examination, and customer assistance. We function as an
                    intermediary service provider to streamline the application process for
                    international travelers.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    2. Legal Services Disclaimer
                  </h2>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
                    <p className="text-brand-ink font-semibold">
                      We are NOT a legal practice and do NOT offer legal guidance, legal opinions,
                      or legal representation of any kind.
                    </p>
                  </div>
                  <p className="text-brand-ink mb-4">
                    Our services are restricted to visa application support and assistance. We do
                    not offer legal counsel, interpret statutes, or represent clients in legal
                    proceedings. For legal guidance regarding immigration matters, please seek
                    advice from a qualified immigration lawyer.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    3. Government Application Alternative
                  </h2>
                  <p className="text-brand-ink mb-4">
                    You may opt to apply for an Vietnam eVisa directly through the official
                    government website for a reduced cost.
                  </p>
                  <p className="text-brand-ink mb-4">
                    Through your use of our service, you consent to remit both the official
                    government visa fee and an additional service fee for our processing and
                    support. All pricing is transparently disclosed throughout the application
                    process for complete transparency.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    4. Service Limitations and Disclaimers
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.1 Application Processing
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        We cannot assure visa authorization - final determinations are rendered by
                        Vietnamese immigration authorities
                      </li>
                      <li>
                        Processing durations are approximations and may fluctuate based on
                        government workload
                      </li>
                      <li>
                        We are not accountable for postponements caused by government processing or
                        system problems
                      </li>
                      <li>
                        Application success depends on the precision of data supplied by the
                        applicant
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.2 Information Accuracy
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        Although we endeavor for precision, information on our website may be
                        modified without prior notice
                      </li>
                      <li>
                        Visa requirements and fees are subject to modification by Vietnamn
                        authorities
                      </li>
                      <li>We advise confirming current requirements with official sources</li>
                      <li>
                        We are not accountable for determinations based on obsolete information
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.3 Travel Arrangements
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        We are not accountable for flight cancellations, delays, or travel
                        interruptions
                      </li>
                      <li>We do not offer travel insurance or cover travel-related costs</li>
                      <li>
                        We advise purchasing travel insurance before making travel arrangements
                      </li>
                      <li>We are not responsible for lodging or tour booking problems</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    5. Financial Disclaimers
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">5.1 Fee Structure</h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Service fees are non-refundable once processing commences</li>
                      <li>Government fees are non-refundable once submitted to authorities</li>
                      <li>Extra fees may apply for expedited processing or special services</li>
                      <li>All fees are transparently disclosed before payment</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">5.2 Refund Policy</h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        Service fees are refunded only if application is denied by authorities
                      </li>
                      <li>No refunds for authorized applications or change of mind</li>
                      <li>No refunds for incomplete applications or missing documentation</li>
                      <li>Processing fees are non-refundable</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    6. Data and Privacy Disclaimers
                  </h2>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      We gather and handle personal data in compliance with our Privacy Policy
                    </li>
                    <li>
                      Data may be disclosed to government authorities as necessary for visa
                      processing
                    </li>
                    <li>We employ security measures but cannot assure 100% data security</li>
                    <li>We are not accountable for data breaches caused by third-party services</li>
                    <li>
                      Users bear responsibility for maintaining the security of their account
                      credentials
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    7. Technical Disclaimers
                  </h2>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      We endeavor for 24/7 service availability but cannot assure uninterrupted
                      access
                    </li>
                    <li>
                      Website functionality may be impacted by technical problems or maintenance
                    </li>
                    <li>
                      We are not accountable for issues caused by user's internet connection or
                      device
                    </li>
                    <li>System updates may temporarily impact service availability</li>
                    <li>We advise using supported browsers for optimal functionality</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    8. Third-Party Services Disclaimer
                  </h2>
                  <p className="text-brand-ink mb-4">
                    Our services may utilize third-party providers for:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Payment handling and financial transactions</li>
                    <li>Email transmission and communication services</li>
                    <li>Website hosting and technical infrastructure</li>
                    <li>Analytics and performance tracking</li>
                    <li>Customer support and communication tools</li>
                  </ul>
                  <p className="text-brand-ink mt-4">
                    We are not accountable for the actions, policies, or practices of these
                    third-party providers. Each third-party service maintains its own terms of
                    service and privacy policy.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    9. Force Majeure Disclaimer
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We shall not be held responsible for any failure or delay in performance due to
                    circumstances outside our reasonable control, including but not limited to:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Natural catastrophes, acts of God, or severe weather conditions</li>
                    <li>Governmental actions, regulations, or policy modifications</li>
                    <li>Technical breakdowns, system outages, or cyber attacks</li>
                    <li>Labor conflicts, strikes, or work stoppages</li>
                    <li>War, terrorism, civil disturbances, or political instability</li>
                    <li>Pandemics, health crises, or travel restrictions</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    10. Limitation of Liability
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-brand-ink font-semibold mb-2">Limitation of Liability:</p>
                    <ul className="text-sm text-brand-ink space-y-1">
                      <li>
                        • Our cumulative liability shall not surpass the amount paid for our
                        services
                      </li>
                      <li>
                        • We are not responsible for indirect, incidental, or consequential losses
                      </li>
                      <li>
                        • We are not responsible for lost profits, data, or business opportunities
                      </li>
                      <li>• We are not responsible for emotional distress or mental anguish</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">11. Indemnification</h2>
                  <p className="text-brand-ink mb-4">
                    Through your use of our services, you consent to indemnify and absolve Vietnam
                    Vietnam eVisa Assistance Team, its officers, directors, employees, and agents
                    from and against any claims, damages, losses, or expenses resulting from:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Your utilization of our services</li>
                    <li>Your breach of our terms of service</li>
                    <li>Your breach of any relevant laws or regulations</li>
                    <li>Your submission of false or misleading data</li>
                    <li>Your non-compliance with visa requirements</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    12. Changes to Disclaimers
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We retain the entitlement to alter these disclaimers at any time. Modifications
                    will be effective immediately upon publication on our website. Your continued
                    utilization of our services following any modifications indicates your
                    acceptance of the revised disclaimers.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    13. Governing Law and Jurisdiction
                  </h2>
                  <p className="text-brand-ink mb-4">
                    These disclaimers are regulated by and interpreted in compliance with the laws
                    of the State of California, United States. Any conflicts arising from these
                    disclaimers shall be subject to the exclusive jurisdiction of the courts in
                    Pasadena, California.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    14. Contact Information
                  </h2>
                  <p className="text-brand-ink mb-4">
                    Should you have any inquiries regarding these disclaimers, please reach out to
                    us:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink mb-2">
                          Legal Department
                        </h3>
                        <p className="text-brand-ink text-sm mb-1">
                          Email:{' '}
                          <a
                            href="mailto:visa@vietnamemigration.com"
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            visa@vietnamemigration.com
                          </a>
                        </p>
                        <p className="text-brand-ink text-sm">
                          Phone: +1 323 286 4541{' '}
                          {/* / +44 5555 000000 (UK) - Hidden but not deleted */}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink mb-2">
                          General Inquiries
                        </h3>
                        <p className="text-brand-ink text-sm mb-1">
                          Email:{' '}
                          <a
                            href="mailto:visa@vietnamemigration.com"
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            visa@vietnamemigration.com
                          </a>
                        </p>
                        <p className="text-brand-ink text-sm">
                          Address: Vietnam eVisa Assistance Team
                          <br />
                          1308 E Colorado Blvd #2244
                          <br />
                          Pasadena, CA 91106
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-surface-alt border-l-4 border-[var(--brand-primary)] p-4 rounded">
                  <h3 className="text-lg font-semibold text-brand-ink mb-2">Important Notice</h3>
                  <p className="text-brand-ink text-sm">
                    These disclaimers are part of our dedication to transparency and legal
                    compliance. For comprehensive information about our services, please review our{' '}
                    <a
                      href="/terms"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Terms of Service
                    </a>
                    ,{' '}
                    <a
                      href="/privacy"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>
                    , and{' '}
                    <a
                      href="/cookie-policy"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Cookie Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
