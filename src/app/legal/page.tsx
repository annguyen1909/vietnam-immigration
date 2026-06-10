/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Metadata } from 'next';
import SiteFooter from '@/components/layout/SiteFooter';
import { buildStaticPageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildStaticPageMetadata({
    title: 'Legal Information',
    description:
      'Legal terms, privacy, disclaimers, and policies for Vietnam eVisa immigration assistance services.',
    path: '/legal',
  }),
  keywords: [
    'Vietnam eVisa legal terms',
    'terms of service',
    'legal agreement',
    'visa services legal',
    'immigration legal',
  ],
};

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Legal Terms & Conditions
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Complete legal structure that regulates our Vietnam Official eVisa Immigration
                Assistance Service operations
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>Last Updated: {new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>Version 2.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Important Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    IMPORTANT LEGAL NOTICE
                  </h3>
                  <p className="text-red-800">
                    PLEASE REVIEW THIS UNIVERSAL TERMS OF SERVICE AGREEMENT THOROUGHLY, AS IT
                    INCLUDES CRITICAL DETAILS CONCERNING YOUR LEGAL ENTITLEMENTS AND RECOURSE
                    OPTIONS. THROUGH YOUR USE OF OUR SERVICES, YOU CONFIRM THAT YOU HAVE REVIEWED,
                    COMPREHENDED, AND CONSENT TO BE GOVERNED BY THESE TERMS AND CONDITIONS.
                  </p>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#overview"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        1. Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="#eligibility"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        2. Eligibility & Authority
                      </a>
                    </li>
                    <li>
                      <a
                        href="#accounts"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        3. Accounts & Data Transfer
                      </a>
                    </li>
                    <li>
                      <a
                        href="#availability"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        4. Service Availability
                      </a>
                    </li>
                    <li>
                      <a
                        href="#conduct"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        5. General Rules of Conduct
                      </a>
                    </li>
                    <li>
                      <a
                        href="#rights"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        6. Reservation of Rights
                      </a>
                    </li>
                    <li>
                      <a
                        href="#third-party"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        7. Third-Party Links
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#liability"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        8. Limitation of Liability
                      </a>
                    </li>
                    <li>
                      <a
                        href="#fees"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        9. Fees & Payments
                      </a>
                    </li>
                    <li>
                      <a
                        href="#indemnity"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        10. Indemnity
                      </a>
                    </li>
                    <li>
                      <a
                        href="#visa-specific"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        11. Visa-Specific Terms
                      </a>
                    </li>
                    <li>
                      <a
                        href="#government"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        12. Government Relations
                      </a>
                    </li>
                    <li>
                      <a
                        href="#compliance"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        13. Legal Compliance
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="text-brand-primary-dark hover:text-blue-900 font-medium"
                      >
                        14. Contact Information
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Sections */}
            <div className="space-y-8">
              {/* Section 1: Overview */}
              <section id="overview" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. OVERVIEW</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    This Universal Terms of Service Agreement (referred to as "Agreement")
                    establishes a contractual relationship between Vietnam Official eVisa
                    Immigration Assistance Service (referred to as "Vietnam Official eVisa
                    Immigration Assistance Service") and you, the user, and becomes effective upon
                    your use of this website ("Site") or upon your electronic acceptance. This
                    Agreement outlines the general terms and conditions governing your utilization
                    of the Site and the products and services acquired or accessed via this Site
                    (individually and collectively, the "Services"), and supplements (rather than
                    replaces) any specific terms and conditions applicable to particular Services.
                  </p>
                  <p className="mb-4 text-gray-800">
                    Regardless of whether you are merely browsing, using this Site, or purchasing
                    Services, your utilization of this Site and your electronic acceptance of this
                    Agreement confirms that you have reviewed, comprehended, acknowledge and consent
                    to be governed by this Agreement, together with the following policies and
                    relevant product agreements, which are included in this Agreement by reference:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                    <li>Digital Services Act Compliance</li>
                    <li>Disclaimers</li>
                    <li>Refund Policy</li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    The terminology "we", "us" or "our" refers to Vietnam Official eVisa Immigration
                    Assistance Service. The terminology "you", "your", "User" or "customer" refers
                    to any person or organization that accepts this Agreement, possesses access to
                    your account or utilizes the Services. No provision in this Agreement shall be
                    interpreted as granting any third-party entitlements or advantages.
                  </p>
                  <p className="mb-4 text-gray-800">
                    Vietnam Official eVisa Immigration Assistance Service reserves the right, in its
                    exclusive and absolute judgment, to alter or amend this Agreement, along with
                    any policies or agreements incorporated within, at any time, and such
                    alterations or amendments become effective immediately when published on this
                    Site. Your continued use of this Site or the Services following such alterations
                    or amendments constitutes your acceptance of this Agreement as most recently
                    revised.
                  </p>
                </div>
              </section>

              {/* Section 2: Eligibility */}
              <section id="eligibility" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  2. ELIGIBILITY & AUTHORITY
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    This Site and the Services are accessible exclusively to Users who possess the
                    capacity to create legally enforceable agreements in accordance with relevant
                    law. Through your use of this Site or the Services, you declare and guarantee
                    that you meet the following criteria:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>You have reached the minimum age of eighteen (18) years</li>
                    <li>
                      You are otherwise acknowledged as having the legal capacity to enter into
                      legally binding agreements under relevant law
                    </li>
                    <li>
                      You are not prohibited from acquiring or receiving the Services according to
                      the legal frameworks of the United States, Vietnam, or other relevant
                      jurisdictions
                    </li>
                    <li>
                      You are legally qualified to submit an application for an Vietnam eVisa in
                      compliance with current immigration statutes and regulatory requirements
                    </li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    Should you be executing this Agreement as a representative of a business entity,
                    you declare and guarantee that you possess the legal authorization to commit
                    such business entity to the terms and conditions set forth in this Agreement, in
                    which instance the terminology "you", "your", "User" or "customer" refers to
                    such business entity.
                  </p>
                </div>
              </section>

              {/* Section 3: Accounts */}
              <section id="accounts" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  3. ACCOUNTS & DATA TRANSFER
                </h2>
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Accounts</h3>
                  <p className="mb-4 text-gray-800">
                    To utilize certain features of this Site or access specific Services, you must
                    establish an Account. You declare and guarantee to Vietnam Official eVisa
                    Immigration Assistance Service that all data you provide when establishing your
                    Account is truthful, up-to-date and comprehensive, and that you will maintain
                    your Account data truthful, up-to-date and comprehensive.
                  </p>
                  <p className="mb-4 text-gray-800">
                    You bear exclusive responsibility for all activities that take place on your
                    Account, regardless of whether authorized by you or not, and you must maintain
                    your Account data secure, including but not limited to your customer
                    number/login credentials, password, and Payment Method(s).
                  </p>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    Transfer of Data Abroad
                  </h3>
                  <p className="mb-4 text-gray-800">
                    If you are accessing this Site from a nation different from the nation where our
                    servers are situated, your interactions with us may involve the transmission of
                    data (including your Account data) across international borders. By accessing
                    this Site and communicating electronically with us, you authorize such
                    transmissions.
                  </p>
                  <p className="mb-4 text-gray-800">
                    <strong>Data Protection:</strong> We adhere to relevant data protection statutes
                    and regulatory requirements, including but not limited to GDPR, CCPA, and
                    Vietnamese data protection legislation. Your personal information will be
                    handled in compliance with our Privacy Policy.
                  </p>
                </div>
              </section>

              {/* Section 4: Availability */}
              <section id="availability" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  4. AVAILABILITY OF WEBSITE/SERVICES
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    In accordance with the terms and conditions of this Agreement and our additional
                    policies and procedures, we will employ commercially reasonable endeavors to
                    provide this Site and the Services on a continuous basis, operating twenty-four
                    (24) hours per day, seven (7) days per week.
                  </p>
                  <p className="mb-4 text-gray-800">
                    You recognize and consent that periodically this Site may become unavailable or
                    non-functional for various reasons including, but not limited to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>Equipment breakdowns</li>
                    <li>Scheduled maintenance, repairs or equipment replacements</li>
                    <li>Governmental system maintenance or system updates</li>
                    <li>Network overload or other system failures</li>
                    <li>Circumstances outside our reasonable control</li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    <strong>Visa Processing Times:</strong> Although we endeavor to handle
                    applications effectively, actual processing durations depend on governmental
                    processing timetables, system accessibility, and the thoroughness of provided
                    documentation. We cannot assure specific processing durations.
                  </p>
                </div>
              </section>

              {/* Section 5: Conduct */}
              <section id="conduct" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  5. GENERAL RULES OF CONDUCT
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">You recognize and consent that:</p>
                  <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-800">
                    <li>
                      Your utilization of this Site and the Services, including any materials you
                      provide, will adhere to this Agreement and all relevant local, state, national
                      and international statutes, rules and regulatory requirements.
                    </li>
                    <li>
                      You will refrain from collecting or gathering any confidential or personally
                      identifiable data about another User or any other individual or organization
                      without their explicit prior written authorization.
                    </li>
                    <li>
                      You will not utilize this Site or the Services in any way that:
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-800">
                        <li>Violates the law, or advocates or encourages unlawful conduct</li>
                        <li>
                          Advocates, encourages or participates in terrorism, violence directed at
                          individuals, animals, or property
                        </li>
                        <li>
                          Violates the intellectual property entitlements of another User or any
                          other individual or organization
                        </li>
                        <li>
                          Includes misleading or fraudulent statements concerning Vietnam Official
                          eVisa Immigration Assistance Service or our Services
                        </li>
                        <li>Seeks to bypass governmental visa application systems or processes</li>
                      </ul>
                    </li>
                    <li>
                      You will supply truthful, comprehensive, and honest data in all visa
                      applications and associated documentation.
                    </li>
                    <li>
                      You will not seek to acquire visas through deceptive methods or false
                      statements.
                    </li>
                  </ol>
                </div>
              </section>

              {/* Section 6: Rights */}
              <section id="rights" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  6. ADDITIONAL RESERVATION OF RIGHTS
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    Vietnam Official eVisa Immigration Assistance Service explicitly retains the
                    entitlement to refuse, cancel, end, suspend, lock, or alter access to (or
                    control over) any Account or Services for any purpose, including but not limited
                    to the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>
                      To rectify errors committed by Vietnam Official eVisa Immigration Assistance
                      Service in providing or delivering any Services
                    </li>
                    <li>
                      To safeguard the reliability and consistency of our systems and business
                      partner relationships
                    </li>
                    <li>To support fraud and abuse identification and prevention initiatives</li>
                    <li>
                      To adhere to judicial orders and relevant statutes, rules and regulatory
                      requirements
                    </li>
                    <li>
                      To adhere to requests from law enforcement agencies, including subpoena
                      requests
                    </li>
                    <li>
                      To adhere to governmental visa application mandates and regulatory
                      requirements
                    </li>
                    <li>
                      To prevent any civil or criminal legal exposure on the part of Vietnam
                      Official eVisa Immigration Assistance Service
                    </li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    Vietnam Official eVisa Immigration Assistance Service explicitly retains the
                    entitlement to discontinue, without providing notice to you, any and all
                    Services where, in Vietnam Official eVisa Immigration Assistance Service's
                    exclusive judgment, you are engaging in harassment or making threats against
                    Vietnam Official eVisa Immigration Assistance Service and/or any of Vietnam
                    Official eVisa Immigration Assistance Service's staff members.
                  </p>
                </div>
              </section>

              {/* Section 7: Third-Party */}
              <section id="third-party" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  7. LINKS TO THIRD-PARTY WEBSITES
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    This Site and the Services available at this Site may include links to external
                    websites that are not owned or managed by Vietnam Official eVisa Immigration
                    Assistance Service. Vietnam Official eVisa Immigration Assistance Service
                    accepts no accountability for the materials, terms and conditions, privacy
                    policies, or operational practices of any external websites.
                  </p>
                  <p className="mb-4 text-gray-800">
                    Through your use of this Site or the Services available at this Site, you
                    explicitly absolve Vietnam Official eVisa Immigration Assistance Service from
                    any and all legal responsibility resulting from your utilization of any external
                    website.
                  </p>
                  <p className="mb-4 text-gray-800">
                    Therefore, Vietnam Official eVisa Immigration Assistance Service recommends that
                    you remain vigilant when you exit this Site or the Services available at this
                    Site and that you examine the terms and conditions, privacy policies, and other
                    regulatory documents of each additional website that you may access.
                  </p>
                </div>
              </section>

              {/* Section 8: Liability */}
              <section id="liability" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  8. LIMITATION OF LIABILITY
                </h2>
                <div className="prose prose-gray max-w-none">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-900 font-semibold">
                      UNDER NO CIRCUMSTANCES SHALL Vietnam Official eVisa Immigration Assistance
                      Service, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND ALL THIRD PARTY
                      SERVICE PROVIDERS, BE HELD ACCOUNTABLE TO YOU OR ANY OTHER INDIVIDUAL OR
                      ENTITY FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR
                      CONSEQUENTIAL LOSSES OF ANY KIND.
                    </p>
                  </div>
                  <p className="mb-4 text-gray-800">
                    This restriction encompasses losses arising from:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>The precision, thoroughness, or materials of this Site</li>
                    <li>
                      The precision, thoroughness, or materials of any websites connected to this
                      Site
                    </li>
                    <li>
                      The Services available at this Site or any websites connected to this Site
                    </li>
                    <li>Bodily harm or property loss of any type whatsoever</li>
                    <li>External party actions of any type whatsoever</li>
                    <li>
                      Any unapproved access to or utilization of our servers and/or any materials
                      stored within
                    </li>
                    <li>Any disruption or termination of Services</li>
                    <li>
                      Any malicious software, worms, bugs, Trojan horses, or similar threats
                      transmitted to or from this Site
                    </li>
                    <li>
                      Visa application postponements, denials, or governmental processing
                      complications
                    </li>
                    <li>Travel interruptions or cancellations associated with visa processing</li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    <strong>Statute of Limitations:</strong> Any legal claim arising from or
                    connected to this Site or the Services must be initiated within one (1) year
                    following the date when the claim arises, otherwise such claim shall be
                    permanently precluded.
                  </p>
                  <p className="mb-4 text-gray-800">
                    <strong>Maximum Liability:</strong> Under no circumstances shall Vietnam
                    Official eVisa Immigration Assistance Service's cumulative total liability
                    surpass the total sum paid by you for the specific Services that are the focus
                    of the legal claim.
                  </p>
                </div>
              </section>

              {/* Section 9: Fees */}
              <section id="fees" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. FEES & PAYMENTS</h2>
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">General Terms</h3>
                  <p className="mb-4 text-gray-800">
                    You consent to remit any and all charges and fees owed for Services acquired or
                    accessed at this Site at the moment you place your order for the Services.
                    Vietnam Official eVisa Immigration Assistance Service explicitly retains the
                    entitlement to alter or adjust its pricing and fees at any time.
                  </p>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">Payment Methods</h3>
                  <p className="mb-4 text-gray-800">
                    You may remit payment for Services by using any of the following Payment
                    Methods:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>Valid credit card (Visa, MasterCard, American Express)</li>
                    <li>Electronic check from your personal or business checking account</li>
                    <li>PayPal</li>
                    <li>Additional payment methods as may be made available periodically</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    Currency and Pricing
                  </h3>
                  <p className="mb-4 text-gray-800">
                    We utilize USD (US Dollar) as the primary currency for all our services.
                    Transaction handling is available in USD and certain other currencies. If the
                    currency chosen is not a Supported Currency, the transaction will be handled in
                    USD with an approximate conversion rate.
                  </p>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">Refund Policy</h3>
                  <p className="mb-4 text-gray-800">
                    <strong>Important:</strong> All necessary documentation must be supplied within
                    3 days of application submission. Otherwise, refund requests will not be
                    honored.
                  </p>
                  <p className="mb-4 text-gray-800">
                    Refunds are handled in accordance with our Refund Policy and may be subject to
                    handling fees and administrative costs.
                  </p>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    Credit Card Authorization
                  </h3>
                  <p className="mb-4 text-gray-800">
                    To verify cardholder consent to remit our service fees, our Risk Management team
                    may require:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>Filling out an Authorization form with cardholder signature</li>
                    <li>
                      Scan or photograph of the actual credit card (with 8 middle digits concealed)
                    </li>
                    <li>
                      Electronic authorization from the cardholder's issuing financial institution
                    </li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    Non-compliance with these requirements may lead to service termination, and we
                    will not be accountable for any losses or harm.
                  </p>
                </div>
              </section>

              {/* Section 10: Indemnity */}
              <section id="indemnity" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">10. INDEMNITY</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    You consent to safeguard, defend, indemnify and absolve Vietnam Official eVisa
                    Immigration Assistance Service and its officers, directors, employees, agents,
                    and third party service providers from and against any and all legal claims,
                    demands, costs, expenses, losses, liabilities and harm of every type and
                    category (including, without limitation, reasonable legal fees) imposed upon or
                    sustained by Vietnam Official eVisa Immigration Assistance Service directly or
                    indirectly resulting from:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>
                      Your utilization of and access to this Site or the Services available at this
                      Site
                    </li>
                    <li>
                      Your breach of any clause of this Agreement or the policies included within
                    </li>
                    <li>
                      Your infringement of any third-party entitlement, including intellectual
                      property entitlements
                    </li>
                    <li>
                      Your submission of false, incorrect, or incomplete data in visa applications
                    </li>
                    <li>
                      Your non-compliance with governmental visa mandates or regulatory requirements
                    </li>
                    <li>
                      Any travel interruptions or complications associated with visa processing
                    </li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    The indemnification responsibilities under this section shall remain in effect
                    following any termination or expiration of this Agreement or your use of this
                    Site or the Services available at this Site.
                  </p>
                </div>
              </section>

              {/* Section 11: Visa-Specific Terms */}
              <section id="visa-specific" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">11. VISA-SPECIFIC TERMS</h2>
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Application Process</h3>
                  <p className="mb-4 text-gray-800">
                    Our services encompass support with Vietnam eVisa applications. Through your use
                    of our services, you recognize that:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>We function as a facilitator between you and the Vietnamese government</li>
                    <li>
                      Final visa authorization rests entirely with Vietnamese immigration officials
                    </li>
                    <li>We cannot assure visa authorization or specific processing durations</li>
                    <li>You bear responsibility for supplying truthful and comprehensive data</li>
                    <li>
                      You must satisfy all eligibility criteria for the requested visa category
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    Documentation Requirements
                  </h3>
                  <p className="mb-4 text-gray-800">
                    You consent to supply all necessary documentation in the designated format and
                    within the designated time period. Non-compliance may lead to:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>Application postponements or denial</li>
                    <li>Loss of service fees</li>
                    <li>Extra processing charges</li>
                    <li>Service discontinuation</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    Travel Responsibility
                  </h3>
                  <p className="mb-4 text-gray-800">You recognize that:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>You bear responsibility for verifying your travel documents are current</li>
                    <li>Visa authorization does not ensure entry into Vietnam</li>
                    <li>Entry depends on immigration officer judgment at the entry point</li>
                    <li>
                      You must adhere to all Vietnamese statutes and regulatory requirements during
                      your visit
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 12: Government Relations */}
              <section id="government" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">12. GOVERNMENT RELATIONS</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    Vietnam Official eVisa Immigration Assistance Service is a privately-owned
                    business offering visa application support services. We have no affiliation
                    with, endorsement from, or authorization to act on behalf of the Government of
                    Vietnam or any governmental organization.
                  </p>
                  <p className="mb-4 text-gray-800">
                    <strong>Important Disclaimers:</strong>
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>
                      We are not a governmental organization or official visa processing facility
                    </li>
                    <li>Our services are intended to facilitate the application process</li>
                    <li>
                      All visa determinations are rendered by Vietnamese immigration officials
                    </li>
                    <li>Governmental fees are distinct from our service fees</li>
                    <li>We cannot affect or accelerate governmental processing durations</li>
                  </ul>
                  <p className="mb-4 text-gray-800">
                    <strong>Alternative Application Methods:</strong> You may submit applications
                    directly through the official Vietnamese government website or at Vietnamn
                    embassies/consulates. Our services are voluntary and intended to offer
                    convenience and support.
                  </p>
                </div>
              </section>

              {/* Section 13: Compliance */}
              <section id="compliance" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">13. LEGAL COMPLIANCE</h2>
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">Applicable Laws</h3>
                  <p className="mb-4 text-gray-800">
                    This Agreement and your utilization of our Services are regulated by and
                    interpreted in compliance with the legal framework of the jurisdiction where
                    Vietnam Official eVisa Immigration Assistance Service conducts business, without
                    consideration of conflict of law doctrines.
                  </p>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    International Compliance
                  </h3>
                  <p className="mb-4 text-gray-800">
                    We adhere to relevant international statutes and regulatory requirements,
                    including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800">
                    <li>General Data Protection Regulation (GDPR)</li>
                    <li>California Consumer Privacy Act (CCPA)</li>
                    <li>Digital Services Act (DSA)</li>
                    <li>Vietnamese data protection and privacy legislation</li>
                    <li>Anti-money laundering (AML) regulatory requirements</li>
                    <li>Know Your Customer (KYC) mandates</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">
                    Dispute Resolution
                  </h3>
                  <p className="mb-4 text-gray-800">
                    Any conflicts arising from this Agreement or our Services will be addressed
                    through:
                  </p>
                  <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-800">
                    <li>Direct discussions between parties</li>
                    <li>Mediation (if mandated by relevant law)</li>
                    <li>Arbitration or judicial proceedings in the appropriate jurisdiction</li>
                  </ol>

                  <h3 className="text-xl font-semibold mb-4 mt-8 text-gray-900">Severability</h3>
                  <p className="mb-4 text-gray-800">
                    Should any clause of this Agreement be determined to be unenforceable or
                    invalid, the remaining clauses will remain fully effective and binding. The
                    unenforceable clause will be adjusted to the minimal extent required to render
                    it enforceable.
                  </p>
                </div>
              </section>

              {/* Section 14: Contact */}
              <section id="contact" className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">14. CONTACT INFORMATION</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="mb-4 text-gray-800">
                    Should you have any inquiries regarding these Terms of Service, Privacy Policy,
                    or any other legal concerns, please reach out to us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Email Contact</h3>
                      <p className="text-brand-primary-dark font-medium">visa@vietnamemigration.com</p>
                      <p className="text-sm text-gray-700 mt-2">
                        For legal questions and compliance issues
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">General Support</h3>
                      <p className="text-brand-primary-dark font-medium">visa@vietnamemigration.com</p>
                      <p className="text-sm text-gray-700 mt-2">
                        For general inquiries and support
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Response Time:</strong> We strive to reply to all legal inquiries
                      within 2-3 business days. For pressing matters, please include "URGENT" in
                      your email subject line.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Notice */}
            <div className="mt-12 bg-brand-surface-alt border border-brand-border rounded-lg p-6">
              <div className="text-center">
                <p className="text-blue-900 font-semibold mb-2">Agreement Acceptance</p>
                <p className="text-brand-primary-dark text-sm">
                  Through your use of our services, you confirm that you have reviewed,
                  comprehended, and consented to be governed by these Terms of Service. Should you
                  not consent to these terms, please refrain from using our services.
                </p>
                <p className="text-brand-primary-dark text-xs mt-4">
                  Last updated: {new Date().toLocaleDateString()} | Version 2.0
                </p>
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
