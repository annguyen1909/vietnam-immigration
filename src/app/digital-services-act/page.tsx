/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Digital Services Act Compliance',
  description:
    'EU Digital Services Act (DSA) compliance information and user rights for vietnamemigration.com.',
  path: '/digital-services-act',
});

export default function DigitalServicesActPage() {
  return (
    <>
      <div className="bg-[#f7f9fb] min-h-screen flex flex-col w-full">
        <main className="flex-1">
          {/* Header Section */}
          <section className="w-full bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <h1 className="text-4xl font-extrabold text-brand-ink mb-4">
                Digital Services Act (DSA) Compliance
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
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">1. Introduction</h2>
                  <p className="text-brand-ink mb-4">
                    Vietnam Official eVisa Immigration Assistance Service ("we," "us," or "our") is
                    committed to compliance with the European Union's Digital Services Act (DSA)
                    Regulation (EU) 2022/2065. This page explains how we comply with the DSA and
                    your rights as a user of our digital services.
                  </p>
                  <p className="text-brand-ink">
                    The DSA aims to create a safer digital space where the fundamental rights of
                    users are protected and to establish a level playing field for businesses
                    operating in the EU digital market.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    2. About the Digital Services Act
                  </h2>
                  <p className="text-brand-ink mb-4">
                    The Digital Services Act (DSA) is a comprehensive EU regulation that:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink mb-4 space-y-2">
                    <li>Protects users' fundamental rights online</li>
                    <li>Establishes clear responsibilities for digital service providers</li>
                    <li>Promotes transparency and accountability</li>
                    <li>Creates a safer digital environment</li>
                    <li>Ensures fair competition in the digital market</li>
                  </ul>
                  <p className="text-brand-ink">
                    The DSA applies to all digital services that serve users in the EU, regardless
                    of where the service provider is located.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    3. Our Services Under the DSA
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We provide the following digital services that fall under the scope of the DSA:
                  </p>

                  <div className="bg-brand-surface-alt rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      Online Intermediation Services
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Visa application processing and submission</li>
                      <li>Online payment processing</li>
                      <li>Document verification services</li>
                      <li>Customer support and communication platforms</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      Information Society Services
                    </h3>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Website hosting and content delivery</li>
                      <li>Email communication services</li>
                      <li>Online forms and data collection</li>
                      <li>Analytics and performance monitoring</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    4. Our DSA Compliance Measures
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.1 Transparency Requirements
                    </h3>
                    <p className="text-brand-ink mb-3">
                      We maintain transparency in our operations by:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Providing clear terms of service and privacy policies</li>
                      <li>Disclosing our business practices and data handling procedures</li>
                      <li>Maintaining public contact information</li>
                      <li>Publishing annual transparency reports</li>
                      <li>Clearly explaining our fee structure and pricing</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.2 Content Moderation
                    </h3>
                    <p className="text-brand-ink mb-3">
                      We implement content moderation practices to ensure:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Prohibition of illegal content and activities</li>
                      <li>Protection against fraud and scams</li>
                      <li>Maintenance of service quality and reliability</li>
                      <li>Compliance with applicable laws and regulations</li>
                      <li>Fair and transparent moderation procedures</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.3 User Rights Protection
                    </h3>
                    <p className="text-brand-ink mb-3">We protect your fundamental rights by:</p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-2">
                      <li>Ensuring freedom of expression and information</li>
                      <li>Protecting personal data and privacy</li>
                      <li>Providing non-discriminatory access to services</li>
                      <li>Maintaining service availability and reliability</li>
                      <li>Offering effective dispute resolution mechanisms</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    5. Your Rights Under the DSA
                  </h2>
                  <p className="text-brand-ink mb-4">
                    As a user of our services, you have the following rights:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Right to Information</h4>
                      <p className="text-sm text-brand-ink">
                        Access clear information about our services, terms, and policies.
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Right to Redress</h4>
                      <p className="text-sm text-brand-ink">
                        Submit complaints and seek resolution for issues with our services.
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Right to Appeal</h4>
                      <p className="text-sm text-brand-ink">
                        Appeal decisions made by our content moderation systems.
                      </p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-brand-ink mb-2">Right to Representation</h4>
                      <p className="text-sm text-brand-ink">
                        Be represented by designated organizations in disputes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    6. Reporting Illegal Content
                  </h2>
                  <p className="text-brand-ink mb-4">
                    If you encounter illegal content on our platform, you can report it through the
                    following channels:
                  </p>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                    <h3 className="text-lg font-semibold text-brand-ink mb-2">
                      Report Illegal Content
                    </h3>
                    <p className="text-brand-ink mb-3">
                      Email:{' '}
                      <a
                        href="mailto:Visa@VietnamEmigration.com"
                        className="text-[var(--brand-primary)] hover:underline"
                      >
                        Visa@VietnamEmigration.com
                      </a>
                    </p>
                    <p className="text-brand-ink text-sm">
                      Please include detailed information about the content, including URLs,
                      screenshots, and reasons for the report.
                    </p>
                  </div>

                  <p className="text-brand-ink mb-4">
                    We will review all reports within 24 hours and take appropriate action in
                    accordance with our content moderation policies and applicable laws.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">7. Dispute Resolution</h2>
                  <p className="text-brand-ink mb-4">
                    We provide multiple channels for dispute resolution:
                  </p>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-brand-ink mb-2">
                        Internal Dispute Resolution
                      </h3>
                      <p className="text-brand-ink text-sm mb-2">
                        Contact our customer support team for initial resolution attempts.
                      </p>
                      <p className="text-brand-ink text-sm">
                        Email:{' '}
                        <a
                          href="mailto:Visa@VietnamEmigration.com"
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          Visa@VietnamEmigration.com
                        </a>
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-brand-ink mb-2">
                        Alternative Dispute Resolution
                      </h3>
                      <p className="text-brand-ink text-sm mb-2">
                        If internal resolution fails, you may seek resolution through designated ADR
                        providers.
                      </p>
                      <p className="text-brand-ink text-sm">
                        We are committed to cooperating with certified ADR providers in the EU.
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-brand-ink mb-2">Legal Recourse</h3>
                      <p className="text-brand-ink text-sm">
                        You retain the right to seek legal recourse through courts or other legal
                        channels as provided by applicable law.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    8. Annual Transparency Report
                  </h2>
                  <p className="text-brand-ink mb-4">
                    In accordance with DSA requirements, we publish annual transparency reports that
                    include:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink mb-4 space-y-2">
                    <li>Number of content moderation decisions</li>
                    <li>Types of illegal content removed</li>
                    <li>Average response times to user reports</li>
                    <li>Number of appeals and their outcomes</li>
                    <li>Measures taken to ensure service reliability</li>
                    <li>Complaints received and their resolution</li>
                  </ul>
                  <p className="text-brand-ink">
                    Our latest transparency report is available upon request. Please contact us at{' '}
                    <a
                      href="mailto:Visa@VietnamEmigration.com"
                      className="text-[var(--brand-primary)] hover:underline"
                    >
                      Visa@VietnamEmigration.com
                    </a>
                    .
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">9. Contact Information</h2>
                  <p className="text-brand-ink mb-4">
                    For questions about our DSA compliance or to exercise your rights, please
                    contact us:
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
                            href="mailto:Visa@VietnamEmigration.com"
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            Visa@VietnamEmigration.com
                          </a>
                        </p>
                        <p className="text-brand-ink text-sm">
                          Phone: +1 323 286 4541{' '}
                          {/* / +44 5555 000000 (UK) - Hidden but not deleted */}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-brand-ink mb-2">
                          Legal Department
                        </h3>
                        <p className="text-brand-ink text-sm mb-1">
                          Email:{' '}
                          <a
                            href="mailto:Visa@VietnamEmigration.com"
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            Visa@VietnamEmigration.com
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
                    This DSA compliance page is part of our commitment to transparency and user
                    protection. For more information about our data practices, please read our{' '}
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
