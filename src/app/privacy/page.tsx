/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Privacy Policy',
  description:
    'How we collect, use, and protect your personal information when you use our Vietnam eVisa immigration assistance service.',
  path: '/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-[#f7f9fb] min-h-screen flex flex-col w-full">
        <main className="flex-1">
          {/* Header Section */}
          <section className="w-full bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <h1 className="text-4xl font-extrabold text-brand-ink mb-4">Privacy Policy</h1>
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
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">1. Introduction</h2>
                  <p className="text-brand-ink mb-4">
                    Vietnam eVisa Assistance Team (referred to as "we,"
                    "us," or "our") is dedicated to safeguarding your privacy and maintaining the
                    security of your personal data. This Privacy Policy outlines how we gather,
                    utilize, share, and protect your data when you access our website at
                    vietnamemigration.com and utilize our Vietnam eVisa Assistance Team
                    Assistance Service.
                  </p>
                  <p className="text-brand-ink">
                    Through your use of our services, you authorize the gathering and utilization of
                    your data as outlined in this Privacy Policy. Should you not consent to our
                    policies and practices, please refrain from using our services.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    2. Information We Collect
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      2.1 Personal Information
                    </h3>
                    <p className="text-brand-ink mb-3">
                      We gather personal data that you supply directly to us, which includes:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        <strong>Identification Information:</strong> Complete name, birth date,
                        citizenship, passport number, passport expiration date
                      </li>
                      <li>
                        <strong>Contact Information:</strong> Email address, telephone number,
                        postal address
                      </li>
                      <li>
                        <strong>Travel Information:</strong> Travel dates, reason for visit, lodging
                        information
                      </li>
                      <li>
                        <strong>Payment Information:</strong> Credit card information, billing
                        address (handled securely via third-party payment processors)
                      </li>
                      <li>
                        <strong>Communication Records:</strong> Email correspondence, chat messages,
                        support requests
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      2.2 Automatically Collected Information
                    </h3>
                    <p className="text-brand-ink mb-3">
                      When you access our website, we automatically gather specific data, which
                      includes:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>
                        <strong>Device Information:</strong> IP address, browser type, operating
                        system, device identifiers
                      </li>
                      <li>
                        <strong>Usage Information:</strong> Pages accessed, duration spent on pages,
                        click behavior, search queries
                      </li>
                      <li>
                        <strong>Location Information:</strong> Country/region determined by IP
                        address (not exact location)
                      </li>
                      <li>
                        <strong>Technical Information:</strong> Cookies, web beacons, log files,
                        analytics data
                      </li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      2.3 Information from Third Parties
                    </h3>
                    <p className="text-brand-ink mb-3">
                      We may obtain data from external parties, which includes:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Payment processors for transaction validation</li>
                      <li>Governmental agencies for visa processing</li>
                      <li>Analytics providers for website usage data</li>
                      <li>Social media platforms (if you link your accounts)</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    3. How We Use Your Information
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We utilize the data we gather for the following objectives:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-brand-surface-alt rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Service Provision</h4>
                      <ul className="text-sm text-brand-ink space-y-1">
                        <li>• Handle visa applications</li>
                        <li>• Validate identity and documentation</li>
                        <li>• Handle payment transactions</li>
                        <li>• Dispatch confirmation emails</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Customer Support</h4>
                      <ul className="text-sm text-brand-ink space-y-1">
                        <li>• Address inquiries</li>
                        <li>• Deliver technical assistance</li>
                        <li>• Resolve problems</li>
                        <li>• Dispatch notifications</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Website Improvement</h4>
                      <ul className="text-sm text-brand-ink space-y-1">
                        <li>• Examine usage trends</li>
                        <li>• Enhance user experience</li>
                        <li>• Resolve technical problems</li>
                        <li>• Enhance performance</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Legal Compliance</h4>
                      <ul className="text-sm text-brand-ink space-y-1">
                        <li>• Adhere to legal requirements</li>
                        <li>• Prevent fraudulent activity</li>
                        <li>• Safeguard entitlements</li>
                        <li>• Preserve security</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    4. Legal Basis for Processing
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We handle your personal data based on the following legal foundations:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>
                      <strong>Contract Performance:</strong> To deliver the services you have
                      requested
                    </li>
                    <li>
                      <strong>Legitimate Interest:</strong> To enhance our services and deter
                      fraudulent activity
                    </li>
                    <li>
                      <strong>Legal Obligation:</strong> To adhere to relevant laws and regulatory
                      requirements
                    </li>
                    <li>
                      <strong>Consent:</strong> For promotional communications and non-essential
                      cookies
                    </li>
                    <li>
                      <strong>Vital Interest:</strong> To safeguard your safety or the safety of
                      other individuals
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    5. Information Sharing and Disclosure
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We may disclose your data in the following situations:
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      5.1 Service Providers
                    </h3>
                    <p className="text-brand-ink mb-3">
                      We disclose data to reliable third-party service providers who help us with:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Payment handling and fraud deterrence</li>
                      <li>Website hosting and technical assistance</li>
                      <li>Email transmission and customer correspondence</li>
                      <li>Analytics and performance tracking</li>
                      <li>Document validation and identity verification</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      5.2 Government Authorities
                    </h3>
                    <p className="text-brand-ink mb-3">
                      We may disclose data to governmental agencies when:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Mandated by law or regulatory requirements</li>
                      <li>Handling visa applications</li>
                      <li>Examining fraud or unlawful conduct</li>
                      <li>Adhering to judicial orders or legal demands</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      5.3 Business Transfers
                    </h3>
                    <p className="text-brand-ink">
                      Should a merger, acquisition, or asset sale occur, your data may be
                      transferred to the acquiring entity, subject to equivalent privacy safeguards.
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">6. Data Security</h2>
                  <p className="text-brand-ink mb-4">
                    We employ suitable technical and organizational safeguards to protect your
                    personal data:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Technical Measures</h4>
                      <ul className="text-sm text-brand-ink space-y-1">
                        <li>• SSL/TLS encryption</li>
                        <li>• Protected data centers</li>
                        <li>• Periodic security updates</li>
                        <li>• Access restrictions</li>
                      </ul>
                    </div>

                    <div className="bg-brand-surface-alt rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Organizational Measures</h4>
                      <ul className="text-sm text-brand-ink space-y-1">
                        <li>• Staff training</li>
                        <li>• Data access protocols</li>
                        <li>• Incident management procedures</li>
                        <li>• Periodic reviews</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">7. Data Retention</h2>
                  <p className="text-brand-ink mb-4">
                    We maintain your personal data for the duration required to:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink mb-4 space-y-2">
                    <li>Deliver our services and preserve your account</li>
                    <li>Adhere to legal and regulatory mandates</li>
                    <li>Settle conflicts and enforce agreements</li>
                    <li>Deter fraud and maintain security</li>
                  </ul>
                  <p className="text-brand-ink">
                    Specific retention durations differ by data category and purpose. We will remove
                    or anonymize your data when it is no longer required.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">8. Your Rights</h2>
                  <p className="text-brand-ink mb-4">
                    Based on your location, you may possess the following entitlements regarding
                    your personal data:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Access & Portability</h4>
                      <p className="text-sm text-brand-ink">
                        Request access to your data and obtain a copy in a portable format.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Correction</h4>
                      <p className="text-sm text-brand-ink">
                        Request correction of incorrect or incomplete data.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Deletion</h4>
                      <p className="text-sm text-brand-ink">
                        Request removal of your personal data (subject to legal obligations).
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Restriction</h4>
                      <p className="text-sm text-brand-ink">
                        Request limitation of processing under specific circumstances.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Objection</h4>
                      <p className="text-sm text-brand-ink">
                        Object to processing based on legitimate interests.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Withdraw Consent</h4>
                      <p className="text-sm text-brand-ink">
                        Revoke consent for processing based on consent.
                      </p>
                    </div>
                  </div>

                  <p className="text-brand-ink">
                    To exercise these entitlements, please reach out to us using the contact details
                    provided in the "Contact Us" section below.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    9. International Data Transfers
                  </h2>
                  <p className="text-brand-ink mb-4">
                    Your personal data may be transmitted to and handled in nations other than your
                    own. We maintain suitable protective measures for such transfers:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                    <li>Adequacy determinations by relevant authorities</li>
                    <li>Certification programs and codes of conduct</li>
                    <li>Additional suitable safeguards as mandated by law</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">10. Children's Privacy</h2>
                  <p className="text-brand-ink mb-4">
                    Our services are not designed for minors under the age of 16. We do not
                    intentionally gather personal data from children under 16. Should you suspect we
                    have collected data from a child under 16, please contact us immediately.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    11. Changes to This Privacy Policy
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We may revise this Privacy Policy periodically. We will inform you of any
                    substantial modifications by:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Publishing the revised policy on our website</li>
                    <li>Modifying the "Last updated" date</li>
                    <li>Dispatching an email notification for significant modifications</li>
                    <li>Showing a notice on our website</li>
                  </ul>
                  <p className="text-brand-ink">
                    Your continued utilization of our services following any modifications indicates
                    your acceptance of the revised policy.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">12. Contact Us</h2>
                  <p className="text-brand-ink mb-4">
                    Should you have any inquiries regarding this Privacy Policy or our data handling
                    practices, please reach out to us:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink mb-2">
                          Data Protection Officer
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
                          General Privacy Inquiries
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
                          1308 E Colorado Blvd #2244, Pasadena, CA 91106
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-surface-alt border-l-4 border-[var(--brand-primary)] p-4 rounded">
                  <h3 className="text-lg font-semibold text-brand-ink mb-2">
                    Additional Information
                  </h3>
                  <p className="text-brand-ink text-sm">
                    For details about how we utilize cookies and similar technologies, please review
                    our{' '}
                    <a
                      href="/cookie-policy"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Cookie Policy
                    </a>
                    . For details about our adherence to EU regulations, please review our{' '}
                    <a
                      href="/digital-services-act"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Digital Services Act
                    </a>{' '}
                    page.
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
