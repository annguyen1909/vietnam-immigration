/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Terms of Service',
  description:
    'Terms of service for Vietnam eVisa immigration assistance—eligibility, fees, responsibilities, and legal conditions.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <div className="bg-[#f7f9fb] min-h-screen flex flex-col w-full">
        <main className="flex-1">
          {/* Header Section */}
          <section className="w-full bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <h1 className="text-4xl font-extrabold text-brand-ink mb-4">
                Terms of Service Agreement
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
                    Terms of Service Agreement for Vietnam Official eVisa Immigration Assistance
                    Service
                  </h2>
                  <p className="text-brand-ink mb-4">
                    This Terms of Service Agreement (referred to as "Agreement") establishes a
                    contractual relationship between Vietnam Official eVisa Immigration Assistance
                    Service (referred to as "we," "us," or "our") and you, the user. This Agreement
                    becomes effective upon your electronic acceptance and outlines the terms and
                    conditions governing your use of our Vietnam Official eVisa Immigration
                    Assistance Service (referred to as "Services").
                  </p>
                  <p className="text-brand-ink">
                    By electronically accepting this Agreement, you confirm that you have read,
                    understood, and acknowledge all terms. You agree to be legally bound by this
                    Agreement, along with our Universal Terms of Service Agreement, any applicable
                    plan limitations, product disclaimers, or other restrictions displayed on our
                    website, all of which are included in this Agreement by reference.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    1. Vietnam eVisa Eligibility / Non-Eligibility
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      Eligibility Requirements:
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        Individuals holding valid passports from countries eligible according to our
                        website
                      </li>
                      <li>
                        Your passport must remain valid for a minimum of six months after your
                        planned departure date
                      </li>
                      <li>You must possess a functioning email address for correspondence</li>
                      <li>You must have an acceptable payment method to cover service charges</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">Non-Eligibility:</h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Individuals carrying Diplomatic or Official passports</li>
                      <li>Persons who are residents of Vietnam or currently employed in Vietnam</li>
                      <li>
                        Individuals who have been declared persona non grata by Vietnamn government
                        authorities
                      </li>
                      <li>
                        Persons appearing on blacklists, warning circulars, or similar restrictive
                        databases
                      </li>
                      <li>
                        Minors under the age of 18 who lack appropriate parental authorization
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    2. Visa Validity and Terms
                  </h2>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      The electronic visa permits single or multiple entry into Vietnam for up to 90
                      days, depending on the selected visa type
                    </li>
                    <li>This visa cannot be extended or converted to another visa type</li>
                    <li>
                      The visa will be delivered in electronic format and must be shown at
                      authorized entry points in Vietnam
                    </li>
                    <li>
                      Final entry authorization is determined by Vietnamese immigration officials at
                      the point of entry
                    </li>
                    <li>
                      The visa validity period commences from the approval date, not from when you
                      submitted your application
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">3. Client Obligations</h2>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      Submitting truthful and comprehensive personal details as specified on our
                      platform
                    </li>
                    <li>
                      Completing full payment for our services prior to the initiation of processing
                    </li>
                    <li>Executing the authorization form to validate the transaction</li>
                    <li>
                      Modifications requested after payment of the Vietnamese Government Fee will
                      result in charges for a new application
                    </li>
                    <li>
                      You must contact us within 3 days if the approval letter is not received
                    </li>
                    <li>
                      Submitting all necessary documentation within the designated time period
                    </li>
                    <li>Verifying that your passport satisfies all validity criteria</li>
                    <li>Adhering to all applicable Vietnamese immigration statutes and rules</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    4. Fees and Payment Terms
                  </h2>
                  <p className="text-brand-ink mb-4">
                    To secure your Vietnam eVisa, you are required to pay two distinct categories of
                    fees:
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">4.1 Service Fee</h3>
                    <p className="text-brand-ink mb-3">
                      Our service fee encompasses all aspects of your eVisa application processing,
                      which includes:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Accepting and examining your application materials</li>
                      <li>Forwarding your application to Vietnamese government agencies</li>
                      <li>Handling the processing and securing eVisa authorization</li>
                      <li>Delivering the approval letter via email</li>
                      <li>Round-the-clock customer assistance during the entire process</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.2 Government Fee
                    </h3>
                    <p className="text-brand-ink mb-3">
                      The government fee represents the payment made directly to the Vietnamn
                      Immigration Department for visa processing services. This fee is determined by
                      several factors:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Category of visa requested (Tourist or Business)</li>
                      <li>Entry frequency (Single or Multiple entry)</li>
                      <li>Your citizenship and country where you reside</li>
                      <li>Urgency of processing needs</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
                    <h4 className="font-semibold text-brand-ink mb-2">Important Payment Notes:</h4>
                    <ul className="text-sm text-brand-ink space-y-1">
                      <li>
                        • Application processing commences only upon receipt of complete payment
                      </li>
                      <li>• All charges must be paid in United States Dollars (USD)</li>
                      <li>• Fee retention is not allowed for any reason or claim</li>
                      <li>• The right to offset payments is not applicable</li>
                      <li>
                        • Fee structures may be modified at any time without prior notification
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    5. Our Responsibilities
                  </h2>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      Handling your visa application in accordance with your specified requirements
                    </li>
                    <li>Offering detailed visa information and expert guidance</li>
                    <li>Alerting you immediately when supplementary documentation is needed</li>
                    <li>Advising you of any processing setbacks that exceed standard timelines</li>
                    <li>
                      Delivering continuous customer support through email and telephone channels
                    </li>
                    <li>Protecting the security and privacy of your personal data</li>
                    <li>Following all relevant data protection regulations</li>
                  </ul>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                    <h4 className="font-semibold text-brand-ink mb-2">
                      Limitations of Responsibility:
                    </h4>
                    <ul className="text-sm text-brand-ink space-y-1">
                      <li>
                        • We cannot be held accountable for delays resulting from inaccurate email
                        addresses
                      </li>
                      <li>
                        • We are not liable if you do not inform us about non-receipt within the
                        3-day notification period
                      </li>
                      <li>
                        • We bear no responsibility for determinations made by Vietnamn immigration
                        officials
                      </li>
                      <li>
                        • We are not responsible for your travel bookings or hotel reservations
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">6. Payment Methods</h2>
                  <p className="text-brand-ink mb-4">
                    To accommodate your preferences, we support multiple payment options:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      <strong>Credit Cards:</strong> Visa, MasterCard, American Express
                    </li>
                    <li>
                      <strong>Digital Wallets:</strong> PayPal, Apple Pay, Google Pay
                    </li>
                    <li>
                      <strong>Bank Transfers:</strong> Available for certain regions
                    </li>
                    <li>
                      <strong>Cryptocurrency:</strong> Bitcoin and other major cryptocurrencies
                    </li>
                  </ul>
                  <p className="text-brand-ink mt-4">
                    All transactions are handled securely via accredited payment processing systems.
                    Your payment details are not retained on our servers.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    7. Disclaimer and Limitation of Liability
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-brand-ink mb-3">
                      <strong>Important Disclaimer:</strong> We cannot be held accountable for any
                      financial losses, delays, or cancellations affecting your airline tickets,
                      tour packages, or hotel reservations should your visa application or entry be
                      rejected by Vietnamese government authorities.
                    </p>
                    <p className="text-brand-ink">
                      Under these circumstances, we will provide a complete refund of all service
                      fees paid to us, however, we assume no liability for any additional costs you
                      may have experienced.
                    </p>
                  </div>

                  <div className="bg-brand-surface-alt border border-brand-border rounded-lg p-4">
                    <h4 className="font-semibold text-brand-ink mb-2">Recommendation:</h4>
                    <p className="text-brand-ink">
                      We highly advise submitting your Vietnam eVisa application a minimum of 1-2
                      weeks before your intended departure date to minimize potential complications
                      and ensure adequate processing time.
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    8. Definitions and Terminology
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-2">Date Format:</h4>
                      <p className="text-sm text-brand-ink">dd/mm/yyyy (e.g., 20th October 2024)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-2">Working Days:</h4>
                      <p className="text-sm text-brand-ink">
                        Monday through Friday, excluding national holidays
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-2">Working Hours:</h4>
                      <p className="text-sm text-brand-ink">9:00 AM to 6:00 PM EST (GMT-5)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-ink mb-2">Cut-off Time:</h4>
                      <p className="text-sm text-brand-ink">3:00 PM EST for same-day processing</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">9. Refund Policy</h2>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      9.1 Refundable Fees
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        <strong>Service Fee:</strong> Complete refund provided when your application
                        is rejected by Vietnamese government agencies
                      </li>
                      <li>
                        <strong>Processing Errors:</strong> Refund available when the mistake
                        originates from our processing procedures
                      </li>
                      <li>
                        <strong>Technical Issues:</strong> Refund applicable when we are unable to
                        process your application due to system or technical failures
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      9.2 Non-Refundable Fees
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        <strong>Government Fee:</strong> Cannot be refunded after submission to
                        Vietnamese government authorities
                      </li>
                      <li>
                        <strong>Approved Applications:</strong> Refunds are not available once the
                        approval letter has been dispatched
                      </li>
                      <li>
                        <strong>Change of Mind:</strong> No refunds granted if you alter your travel
                        arrangements after processing has commenced
                      </li>
                      <li>
                        <strong>Incomplete Applications:</strong> Refunds are not provided if you do
                        not submit necessary documentation within the 3-day deadline
                      </li>
                      <li>
                        <strong>Processing Fees:</strong> Non-refundable for any processing work
                        that has been completed
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <h4 className="font-semibold text-brand-ink mb-2">Refund Processing:</h4>
                    <ul className="text-sm text-brand-ink space-y-1">
                      <li>• Refunds are completed within 5-10 business days</li>
                      <li>• Refunds are returned to the original payment source</li>
                      <li>• Administrative fees may be deducted from refunds</li>
                      <li>• All refund requests must be made in written form</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    10. Intellectual Property Rights
                  </h2>
                  <p className="text-brand-ink mb-4">
                    All materials displayed on our website, such as text, graphics, logos, images,
                    and software, are owned by Vietnam Official eVisa Immigration Assistance Service
                    and safeguarded under copyright, trademark, and additional intellectual property
                    legislation.
                  </p>
                  <p className="text-brand-ink">
                    Reproduction, distribution, modification, or creation of derivative works from
                    any website content is prohibited without obtaining our explicit written
                    authorization.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    11. Privacy and Data Protection
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We prioritize your privacy. Your personal data is collected, utilized, and
                    safeguarded in compliance with our Privacy Policy, which forms an integral part
                    of this Agreement through incorporation by reference.
                  </p>
                  <p className="text-brand-ink">
                    Through your use of our services, you grant permission for the collection and
                    utilization of your information as outlined in our Privacy Policy.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    12. Governing Law and Dispute Resolution
                  </h2>
                  <p className="text-brand-ink mb-4">
                    This Agreement is subject to and interpreted according to the legal framework of
                    [Your Jurisdiction]. Conflicts or disagreements stemming from this Agreement
                    will be addressed through the following methods:
                  </p>
                  <ol className="list-decimal ml-6 text-brand-ink space-y-2">
                    <li>Direct discussions between both parties</li>
                    <li>Mediation conducted by a qualified mediator</li>
                    <li>Arbitration following the guidelines of [Arbitration Organization]</li>
                    <li>Court proceedings within the judicial system of [Your Jurisdiction]</li>
                  </ol>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">13. Force Majeure</h2>
                  <p className="text-brand-ink mb-4">
                    We cannot be held responsible for any performance failures or delays resulting
                    from situations outside our reasonable control, such as:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Natural catastrophes or acts of God</li>
                    <li>Governmental measures or regulatory changes</li>
                    <li>Technical malfunctions or system breakdowns</li>
                    <li>Workplace conflicts or industrial actions</li>
                    <li>Armed conflict, acts of terrorism, or social disturbances</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    14. Severability and Waiver
                  </h2>
                  <p className="text-brand-ink mb-4">
                    Should any clause of this Agreement be deemed invalid or unenforceable, all
                    other provisions will remain fully effective and binding. Any failure on our
                    part to exercise any right or enforce any provision does not represent a
                    relinquishment of such right or provision.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">15. Entire Agreement</h2>
                  <p className="text-brand-ink mb-4">
                    This Agreement, in conjunction with our Privacy Policy, Cookie Policy, and all
                    other policies mentioned within this document, represents the complete and
                    exclusive agreement between you and us concerning the utilization of our
                    services.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    16. Contact Information
                  </h2>
                  <p className="text-brand-ink mb-4">
                    If you have any questions about this Terms of Service Agreement, please contact
                    us:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink mb-2">
                          General Inquiries
                        </h3>
                        <p className="text-brand-ink text-sm mb-1">
                          Email:{' '}
                          <a
                            href="mailto:visa@unitedevisa.com"
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            visa@unitedevisa.com
                          </a>
                        </p>
                        <p className="text-brand-ink text-sm">
                          Phone: +1 323 286 4541{' '}
                          {/* / +44 5555 000000 (UK) - Hidden but not deleted */}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink mb-2">
                          Customer Support
                        </h3>
                        <p className="text-brand-ink text-sm mb-1">
                          Email:{' '}
                          <a
                            href="mailto:visa@unitedevisa.com"
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            visa@unitedevisa.com
                          </a>
                        </p>
                        <p className="text-brand-ink text-sm">
                          Address: Vietnam Official eVisa Immigration Assistance Service
                          <br />
                          1308 E Colorado Blvd #2244, Pasadena, CA 91106
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-surface-alt border-l-4 border-[var(--brand-primary)] p-4 rounded">
                  <h3 className="text-lg font-semibold text-brand-ink mb-2">Important Notice</h3>
                  <p className="text-brand-ink text-sm">
                    Through your use of our services, you confirm that you have read, comprehended,
                    and consent to be governed by these Terms of Service. To learn more about how we
                    handle data, please review our{' '}
                    <a
                      href="/privacy"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>{' '}
                    and{' '}
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
