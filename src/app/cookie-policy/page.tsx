/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import Head from 'next/head';
import type { Metadata } from 'next';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildStaticPageMetadata({
  title: 'Cookie Policy',
  description:
    'How vietnamemigration.com uses cookies and similar technologies, and how you can manage preferences.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Vietnam eVisa Services</title>
        <meta
          name="description"
          content="Learn about how we use cookies and similar technologies on our Vietnam eVisa website to improve your experience and provide better services."
        />
      </Head>
      <div className="bg-[#f7f9fb] min-h-screen flex flex-col w-full">
        <main className="flex-1">
          {/* Header Section */}
          <section className="w-full bg-white border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <h1 className="text-4xl font-extrabold text-brand-ink mb-4">Cookie Policy</h1>
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
                    This Cookie Policy outlines how Vietnam eVisa Assistance Team
                    Service (referred to as "we," "us," or "our") utilizes cookies and similar
                    technologies when you access our website at vietnamemigration.com (the
                    "Website"). This policy should be reviewed in conjunction with our Privacy
                    Policy, which outlines how we gather, utilize, and safeguard your personal data.
                  </p>
                  <p className="text-brand-ink">
                    Through your use of our Website, you authorize the utilization of cookies in
                    compliance with this Cookie Policy. Should you not consent to our use of
                    cookies, you should configure your browser settings accordingly or refrain from
                    using our Website.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">2. What Are Cookies?</h2>
                  <p className="text-brand-ink mb-4">
                    Cookies are small text files that are saved on your device (computer, tablet, or
                    mobile phone) when you access a website. They are commonly used to make websites
                    function more effectively and to supply information to website operators.
                  </p>
                  <p className="text-brand-ink">
                    Cookies can be "session" cookies (which are removed when you close your browser)
                    or "persistent" cookies (which remain on your device for a designated period or
                    until you remove them).
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">3. How We Use Cookies</h2>
                  <p className="text-brand-ink mb-4">
                    We use cookies for several purposes, including:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink mb-4 space-y-2">
                    <li>
                      <strong>Essential Cookies:</strong> These cookies are required for the website
                      to operate correctly. They facilitate basic functions such as page navigation,
                      access to secure areas, and form submissions.
                    </li>
                    <li>
                      <strong>Performance Cookies:</strong> These cookies assist us in understanding
                      how visitors engage with our website by gathering and reporting data
                      anonymously.
                    </li>
                    <li>
                      <strong>Functional Cookies:</strong> These cookies facilitate enhanced
                      functionality and personalization, such as retaining your preferences and
                      settings.
                    </li>
                    <li>
                      <strong>Analytics Cookies:</strong> These cookies assist us in examining
                      website traffic and understanding how our visitors utilize our site.
                    </li>
                    <li>
                      <strong>Marketing Cookies:</strong> These cookies are utilized to monitor
                      visitors across websites to display relevant and engaging advertisements.
                    </li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    4. Types of Cookies We Use
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.1 Essential Cookies
                    </h3>
                    <p className="text-brand-ink mb-2">
                      These cookies are necessary for the functioning of our website and cannot be
                      deactivated. They include:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>Authentication cookies to maintain your login status</li>
                      <li>Security cookies to safeguard against fraud</li>
                      <li>Session cookies to preserve your application progress</li>
                      <li>Load balancing cookies for website performance</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.2 Analytics Cookies
                    </h3>
                    <p className="text-brand-ink mb-2">
                      We utilize Google Analytics and similar services to understand how visitors
                      utilize our website. These cookies gather data such as:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>Pages accessed and duration spent on each page</li>
                      <li>Referral sources (how you discovered our website)</li>
                      <li>Device and browser data</li>
                      <li>Geographic location (country/region level)</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.3 Functional Cookies
                    </h3>
                    <p className="text-brand-ink mb-2">
                      These cookies improve your experience by retaining your preferences:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>Language preferences</li>
                      <li>Currency preferences</li>
                      <li>Form data (to prevent re-entry if you unintentionally close the page)</li>
                      <li>User interface preferences</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      4.4 Marketing Cookies
                    </h3>
                    <p className="text-brand-ink mb-2">
                      These cookies assist us in delivering relevant advertisements and measuring
                      their effectiveness:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>Retargeting cookies to display relevant ads</li>
                      <li>Conversion tracking cookies</li>
                      <li>Social media integration cookies</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">5. Third-Party Cookies</h2>
                  <p className="text-brand-ink mb-4">
                    Our website may also utilize cookies from third-party services, including:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink mb-4 space-y-2">
                    <li>
                      <strong>Google Analytics:</strong> For website analytics and performance
                      tracking
                    </li>
                    <li>
                      <strong>Google Ads:</strong> For advertising and conversion tracking
                    </li>
                    <li>
                      <strong>Facebook Pixel:</strong> For social media advertising and analytics
                    </li>
                    <li>
                      <strong>Payment Processors:</strong> For secure payment handling
                    </li>
                    <li>
                      <strong>Customer Support Tools:</strong> For live chat and support services
                    </li>
                  </ul>
                  <p className="text-brand-ink">
                    These third-party services maintain their own privacy policies and cookie
                    practices. We advise you to review their policies for additional information.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    6. Managing Your Cookie Preferences
                  </h2>
                  <p className="text-brand-ink mb-4">
                    You have several options for managing cookies:
                  </p>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      6.1 Browser Settings
                    </h3>
                    <p className="text-brand-ink mb-2">
                      Most web browsers enable you to manage cookies through their settings. You
                      can:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>Block all cookies</li>
                      <li>Permit only essential cookies</li>
                      <li>Remove existing cookies</li>
                      <li>Configure preferences for specific websites</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">
                      6.2 Cookie Consent
                    </h3>
                    <p className="text-brand-ink">
                      When you initially visit our website, you will see a cookie consent banner.
                      You can:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>Accept all cookies</li>
                      <li>Decline non-essential cookies</li>
                      <li>Personalize your preferences</li>
                      <li>Modify your preferences at any time</li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-brand-ink mb-3">6.3 Opt-Out Links</h3>
                    <p className="text-brand-ink mb-2">
                      You can opt out of particular third-party cookies:
                    </p>
                    <ul className="list-disc ml-6 text-brand-ink space-y-1">
                      <li>
                        <a
                          href="https://tools.google.com/dlpage/gaoptout"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          Google Analytics Opt-out
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/ads/preferences"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          Facebook Ad Preferences
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://adssettings.google.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          Google Ad Settings
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    7. Impact of Disabling Cookies
                  </h2>
                  <p className="text-brand-ink mb-4">
                    Should you choose to deactivate cookies, please be aware that:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Some website features may not operate correctly</li>
                    <li>You may need to re-enter data more frequently</li>
                    <li>Your user experience may be less customized</li>
                    <li>Some services may not be accessible</li>
                    <li>We may not be able to deliver you the best possible service</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">
                    8. Updates to This Policy
                  </h2>
                  <p className="text-brand-ink mb-4">
                    We may revise this Cookie Policy periodically to reflect modifications in our
                    practices or for other operational, legal, or regulatory reasons. We will inform
                    you of any substantial modifications by:
                  </p>
                  <ul className="list-disc ml-6 text-brand-ink space-y-2">
                    <li>Publishing the revised policy on our website</li>
                    <li>Modifying the "Last updated" date at the top of this policy</li>
                    <li>Dispatching an email notification (if required by law)</li>
                  </ul>
                  <p className="text-brand-ink">
                    Your continued utilization of our website following any modifications indicates
                    your acceptance of the revised policy.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-brand-ink mb-4">9. Contact Us</h2>
                  <p className="text-brand-ink mb-4">
                    Should you have any inquiries regarding this Cookie Policy or our use of
                    cookies, please reach out to us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-brand-ink mb-2">
                      <strong>Email:</strong>{' '}
                      <a
                        href="mailto:visa@vietnamemigration.com"
                        className="text-[var(--brand-primary)] hover:underline"
                      >
                        visa@vietnamemigration.com
                      </a>
                    </p>
                    <p className="text-brand-ink mb-2">
                      <strong>Address:</strong> Vietnam eVisa Assistance Team
                      Service
                      <br />
                      1308 E Colorado Blvd #2244, Pasadena, CA 91106
                    </p>
                    <p className="text-brand-ink">
                      <strong>Phone:</strong> +1 323 286 4541{' '}
                      {/* / +44 5555 000000 (UK) - Hidden but not deleted */}
                    </p>
                  </div>
                </div>

                <div className="bg-brand-surface-alt border-l-4 border-[var(--brand-primary)] p-4 rounded">
                  <h3 className="text-lg font-semibold text-brand-ink mb-2">Important Note</h3>
                  <p className="text-brand-ink text-sm">
                    This Cookie Policy is part of our broader dedication to transparency and data
                    protection. For additional information about how we handle your personal data,
                    please review our{' '}
                    <a
                      href="/privacy"
                      className="text-[var(--brand-primary)] hover:underline font-semibold"
                    >
                      Privacy Policy
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
