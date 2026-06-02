import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Refund Policy',
  description:
    'Refund policy for Vietnam eVisa assistance—refundable and non-refundable fees, processing times, and money-back conditions.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Refund Policy</h1>
              <p className="text-xl text-gray-800 mb-8">
                Clear and equitable refund conditions for our Vietnam Official eVisa Immigration
                Assistance Service
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>Last Updated: {new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>Version 1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Money Back Guarantee Banner */}
            <div className="bg-gradient-to-r from-brand-surface-alt to-brand-surface border border-green-200 rounded-lg p-8 mb-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-16 h-16 text-green-600"
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
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Money-Back Guarantee</h2>
                <p className="text-xl text-gray-800 mb-6">
                  <strong>
                    Visa denied? Receive a complete refund of your service fees—guaranteed.
                  </strong>
                </p>
                <p className="text-gray-700">
                  We support our services with a thorough refund policy intended to safeguard your
                  investment and offer reassurance.
                </p>
              </div>
            </div>

            {/* Quick Overview */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Refundable
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Service fees if visa is denied</li>
                  <li>• Processing mistakes on our part</li>
                  <li>• Technical problems preventing processing</li>
                  <li>• Change of mind (before processing commences)</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Non-Refundable
                </h3>
                <ul className="space-y-2 text-gray-800">
                  <li>• Government fees once submitted</li>
                  <li>• Authorized applications</li>
                  <li>• Change of mind after processing commences</li>
                  <li>• Incomplete applications</li>
                </ul>
              </div>
            </div>

            {/* Detailed Refund Policy */}
            <div className="space-y-8">
              {/* Section 1: Refundable Fees */}
              <section className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Refundable Fees</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-3">
                      1.1 Service Fee Refund
                    </h3>
                    <p className="text-gray-800 mb-3">
                      <strong>Complete refund of service fees</strong> if your Vietnam eVisa
                      application is rejected by Vietnamese immigration authorities.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 text-sm">
                        <strong>Our Guarantee:</strong> If the Vietnamese government denies your
                        visa application, we will refund 100% of our service fees, without any
                        questions asked.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-3">
                      1.2 Processing Errors
                    </h3>
                    <p className="text-gray-800 mb-3">
                      Complete refund if the mistake is due to our processing error or system
                      malfunction.
                    </p>
                    <ul className="list-disc pl-6 text-gray-800 space-y-1">
                      <li>Inaccurate data entry on our part</li>
                      <li>System malfunctions preventing application submission</li>
                      <li>Technical breakdowns during processing</li>
                      <li>Postponements caused by our operational problems</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-green-700 mb-3">
                      1.3 Technical Issues
                    </h3>
                    <p className="text-gray-800 mb-3">
                      Refund if we are unable to process your application due to technical
                      difficulties on our side.
                    </p>
                    <ul className="list-disc pl-6 text-gray-800 space-y-1">
                      <li>Website or system unavailability</li>
                      <li>Payment handling failures</li>
                      <li>Email transmission issues</li>
                      <li>Document upload difficulties</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2: Non-Refundable Fees */}
              <section className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Non-Refundable Fees</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-3">2.1 Government Fees</h3>
                    <p className="text-gray-800 mb-3">
                      <strong>Government fees are non-refundable</strong> once submitted to
                      Vietnamese authorities, regardless of the outcome.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm">
                        <strong>Important:</strong> Government fees are remitted directly to the
                        Vietnamese government and are beyond our control. These fees cannot be
                        refunded by us.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-3">
                      2.2 Approved Applications
                    </h3>
                    <p className="text-gray-800 mb-3">
                      No refund once the authorization letter is dispatched, regardless of whether
                      you utilize the visa or not.
                    </p>
                    <ul className="list-disc pl-6 text-gray-800 space-y-1">
                      <li>Visa authorized but not utilized</li>
                      <li>Change of travel arrangements after authorization</li>
                      <li>Personal situations preventing travel</li>
                      <li>Flight cancellations or travel interruptions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-3">2.3 Change of Mind</h3>
                    <p className="text-gray-800 mb-3">
                      <strong>Before Processing:</strong> Change of mind refunds are available if
                      requested before we commence processing your application.
                    </p>
                    <p className="text-gray-800 mb-3">
                      <strong>After Processing Commences:</strong> No refund if you alter your
                      travel plans after processing has already commenced.
                    </p>
                    <div className="bg-brand-surface-alt border border-brand-border rounded-lg p-4 mb-4">
                      <p className="text-brand-primary-dark text-sm">
                        <strong>Processing Start:</strong> Processing commences immediately after
                        payment confirmation and document submission. Once we begin reviewing your
                        documents or submitting to government authorities, change of mind refunds
                        are no longer available.
                      </p>
                    </div>
                    <ul className="list-disc pl-6 text-gray-800 space-y-1">
                      <li>Deciding not to travel after processing commences</li>
                      <li>Choosing a different travel date after processing commences</li>
                      <li>Selecting a different visa type after processing commences</li>
                      <li>Personal preference changes after processing commences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-3">
                      2.4 Incomplete Applications
                    </h3>
                    <p className="text-gray-800 mb-3">
                      <strong>Critical:</strong> No refund if you do not supply required documents
                      within 3 days of application submission.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>3-Day Rule:</strong> All necessary documents must be supplied within
                        3 days of application submission. Failure to do so will result in loss of
                        all fees.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-3">2.5 Processing Fees</h3>
                    <p className="text-gray-800 mb-3">
                      Processing fees are non-refundable for any completed processing activities.
                    </p>
                    <ul className="list-disc pl-6 text-gray-800 space-y-1">
                      <li>Document examination and validation</li>
                      <li>Application form preparation</li>
                      <li>Government fee submission</li>
                      <li>Customer support services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-red-700 mb-3">
                      2.4 Government Fees - Why They&apos;re Non-Refundable
                    </h3>
                    <p className="text-gray-800 mb-3">
                      Government fees are remitted directly to Vietnamese authorities and are{' '}
                      <strong>never refundable</strong>, regardless of the application outcome.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-yellow-800 text-sm">
                        <strong>Important:</strong> Even if your visa is denied, government fees
                        cannot be refunded because they cover the administrative expenses of
                        processing your application, regardless of the final determination.
                      </p>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Why Government Fees Are Non-Refundable:
                    </h4>
                    <ul className="list-disc pl-6 text-gray-800 space-y-2 mb-4">
                      <li>
                        <strong>Administrative Costs:</strong> The government bears expenses to
                        examine, process, and render decisions on all applications
                      </li>
                      <li>
                        <strong>Resource Allocation:</strong> Government officials dedicate time and
                        resources to reviewing your documents and application
                      </li>
                      <li>
                        <strong>System Usage:</strong> Your application utilizes government systems
                        and databases regardless of the outcome
                      </li>
                      <li>
                        <strong>Processing Time:</strong> Government staff time is expended during
                        the review period
                      </li>
                      <li>
                        <strong>Decision Making:</strong> The fee covers the expense of rendering an
                        official decision on your application
                      </li>
                    </ul>
                    <h4 className="font-semibold text-gray-800 mb-2">What You Pay For:</h4>
                    <ul className="list-disc pl-6 text-gray-800 space-y-1">
                      <li>Document validation and verification</li>
                      <li>Background checks and security screening</li>
                      <li>Application handling and review</li>
                      <li>Official decision notification</li>
                      <li>Government system maintenance and support</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3: Refund Process */}
              <section className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Refund Process</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      3.1 How to Request a Refund
                    </h3>
                    <ol className="list-decimal pl-6 text-gray-800 space-y-2">
                      <li>
                        <strong>Submit in Writing:</strong> All refund requests must be submitted in
                        written form via email
                      </li>
                      <li>
                        <strong>Include Details:</strong> Supply your application reference number
                        and reason for refund
                      </li>
                      <li>
                        <strong>Supporting Documents:</strong> Include any relevant documentation
                        (denial letter, etc.)
                      </li>
                      <li>
                        <strong>Contact Information:</strong> Ensure your contact details are
                        up-to-date and accurate
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      3.2 Processing Timeline
                    </h3>
                    <div className="bg-brand-surface-alt border border-brand-border rounded-lg p-4">
                      <p className="text-brand-primary-dark font-semibold mb-2">
                        Refund Processing Time:
                      </p>
                      <p className="text-brand-primary-dark">
                        Refunds are handled within <strong>5-10 business days</strong> from the date
                        of authorization.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Refund Method</h3>
                    <ul className="list-disc pl-6 text-gray-800 space-y-2">
                      <li>
                        <strong>Original Payment Method:</strong> Refunds are returned to the
                        original payment method utilized
                      </li>
                      <li>
                        <strong>Processing Fees:</strong> May apply to refunds depending on payment
                        method
                      </li>
                      <li>
                        <strong>Bank Processing:</strong> Extra time may be needed by your bank or
                        payment provider
                      </li>
                      <li>
                        <strong>Currency Conversion:</strong> Refunds in original currency,
                        conversion charges may apply
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4: Important Conditions */}
              <section className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Important Conditions</h2>
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-800 mb-3">
                      4.1 Critical Time Limits
                    </h3>
                    <ul className="list-disc pl-6 text-red-800 space-y-2">
                      <li>
                        <strong>3-Day Document Rule:</strong> All necessary documents must be
                        supplied within 3 days of application submission
                      </li>
                      <li>
                        <strong>Notification Period:</strong> You must inform us within 3 days if
                        you do not receive the authorization letter
                      </li>
                      <li>
                        <strong>Refund Requests:</strong> Must be submitted within 30 days of the
                        relevant occurrence
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Exclusions</h3>
                    <ul className="list-disc pl-6 text-gray-800 space-y-2">
                      <li>Travel arrangements, flights, or lodging bookings</li>
                      <li>Third-party service fees or charges</li>
                      <li>Bank fees or currency conversion charges</li>
                      <li>Any costs beyond our service fees</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      4.3 Our Limitations
                    </h3>
                    <ul className="list-disc pl-6 text-gray-800 space-y-2">
                      <li>
                        We are not accountable for determinations made by Vietnamese immigration
                        authorities
                      </li>
                      <li>We cannot affect or accelerate government processing durations</li>
                      <li>We are not responsible for travel interruptions or cancellations</li>
                      <li>Our responsibility is limited to the amount paid for our services</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5: Contact Information */}
              <section className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Refund Requests</h3>
                    <p className="text-brand-primary-dark font-medium mb-2">
                      Visa@VietnamEmigration.com
                    </p>
                    <p className="text-sm text-gray-600">For all refund inquiries and requests</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">General Support</h3>
                    <p className="text-brand-primary-dark font-medium mb-2">
                      Visa@VietnamEmigration.com
                    </p>
                    <p className="text-sm text-gray-600">For general questions and assistance</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Response Time:</strong> We strive to reply to all refund inquiries
                    within 24-48 hours during business days.
                  </p>
                </div>
              </section>
            </div>

            {/* Summary Box */}
            <div className="mt-12 bg-gradient-to-r from-brand-surface-alt to-brand-surface border border-brand-border rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Summary of Our Refund Policy
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✅ You Get a Refund When:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Vietnamese authorities deny your visa</li>
                      <li>• We commit a processing mistake</li>
                      <li>• Technical problems prevent processing</li>
                      <li>• You change your mind (before processing commences)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">❌ No Refund When:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Government fees (once submitted)</li>
                      <li>• Visa is authorized</li>
                      <li>• You change your mind after processing commences</li>
                      <li>• Documents not supplied within 3 days</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-gray-800 font-semibold">
                    Our Promise: If your visa is denied by Vietnamese authorities, we will refund
                    100% of our service fees—guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
