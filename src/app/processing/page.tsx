'use client';
import SiteFooter from '@/components/layout/SiteFooter';
import React from 'react';
import {
  DocumentTextIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  {
    title: 'Submit Application',
    desc: 'Complete the official online application form with all required information and documentation as per Vietnamese immigration requirements.',
    details: [
      'Fill in your personal information accurately',
      'Provide travel dates and accommodation details',
      'Select your visa type (tourist or business, single or multiple entry, 90 days)',
      'Review all information before submission',
    ],
    icon: DocumentTextIcon,
  },
  {
    title: 'Secure Payment',
    desc: 'Process payment through our secure payment gateway. All fees are clearly displayed with no hidden charges.',
    details: [
      'Pay government visa fee and service fee',
      'Secure payment via credit/debit card or bank transfer',
      'Instant payment confirmation',
      'Transparent pricing with no hidden fees',
    ],
    icon: CreditCardIcon,
  },
  {
    title: 'Document Review',
    desc: 'Our specialists review and verify all submitted documents to ensure compliance with official Vietnamese immigration requirements.',
    details: [
      'Professional document verification',
      'Compliance check with immigration standards',
      'Notification if additional documents needed',
      'Real-time status updates via email',
    ],
    icon: DocumentCheckIcon,
  },
  {
    title: 'Receive Your eVisa',
    desc: 'Upon approval, your official Vietnam eVisa will be delivered electronically to your registered email address.',
    details: [
      'eVisa delivered to your email',
      'Print and carry with your passport',
      'Valid for entry at designated ports',
      'Processing typically 3 hours to 3 working days',
    ],
    icon: EnvelopeIcon,
  },
];

const benefits = [
  {
    title: 'Fast Processing',
    desc: 'Most visas approved within 3 hours to 3 working days',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Secure & Reliable',
    desc: 'Professional processing with official standards and certified expertise',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    desc: 'Round-the-clock assistance from our professional support team',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Money-Back Guarantee',
    desc: 'Full refund of service fees if your visa application is rejected',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function ProcessingPage() {
  return (
    <main className={`relative min-h-screen w-full bg-brand-surface text-brand-ink`}>
      {/* Official Header Banner */}
      <div className="brand-banner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Official Service
            </span>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-white via-gray-50 to-white py-16 md:py-24 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
              <span className="text-sm font-bold text-white uppercase tracking-wide">
                Application Process
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Official Vietnam
              <span className="block text-brand-primary">eVisa Application Process</span>
            </h1>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Simple, secure, and efficient four-step process to obtain your official Vietnam eVisa.
              Professional assistance with official standards and certified expertise.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border-4 border-brand-primary shadow-2xl">
              <Image
                src="/img/processing.png"
                alt="Vietnam eVisa application process"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-primary/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these four simple steps to get your Vietnam eVisa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.title}
                  className="bg-white border-4 border-brand-primary rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-lg">
                      {idx + 1}
                    </div>
                    <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center text-white border-2 border-white shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-brand-primary mt-1">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Step-by-Step Guide
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Detailed Application Process
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            </div>

            <div className="space-y-8">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.title} className="flex gap-6 items-start">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-lg">
                        {idx + 1}
                      </div>
                      {idx < steps.length - 1 && (
                        <div className="w-1 h-32 bg-gradient-to-b from-brand-primary to-gray-300 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-brand-primary transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center text-white border-2 border-white shadow-md">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">Step {idx + 1} of 4</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{step.desc}</p>
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                          What You Need to Do:
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIdx) => (
                            <li
                              key={detailIdx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <span className="text-brand-primary mt-1 font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/apply"
                className="px-10 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-base border-2 border-brand-primary"
              >
                Start Your Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Service
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional immigration services with official standards and certified expertise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-brand-primary transition-all shadow-md hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center mb-4 border-2 border-white shadow-md text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Service Fee Refund Guarantee
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  In the event that your visa application is rejected by the immigration
                  authorities, we will provide a full refund of our service fees. This guarantee
                  ensures your confidence in our professional assistance service.
                </p>
                <div className="bg-brand-primary border-2 border-white rounded-lg p-4 text-white text-center md:text-left">
                  <p className="font-bold text-lg">
                    ✓ 100% Service Fees Returned if Visa is Rejected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-50 to-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-lg">
                    24/7
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Professional Support</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  Our certified immigration specialists are available around the clock to assist
                  with your application and answer all your questions. Every inquiry is handled by a
                  real human—never a chatbot.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-brand-primary transition-colors">
                    <p className="font-bold text-gray-900 mb-1">Dedicated Support Team</p>
                    <p className="text-sm text-gray-700">
                      Experienced immigration specialists available 24/7 to assist with your
                      application
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-brand-primary transition-colors">
                    <p className="font-bold text-gray-900 mb-1">Document Assistance</p>
                    <p className="text-sm text-gray-700">
                      Professional guidance for document preparation and formatting to meet official
                      standards
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all border-2 border-white shadow-md uppercase tracking-wide text-sm"
                >
                  Contact Support
                </Link>
              </div>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Processing Timeline</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                      ⚡
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Fast Processing</p>
                      <p className="text-sm text-gray-600">Typically 3 hours to 3 working days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Real-Time Updates</p>
                      <p className="text-sm text-gray-600">Email notifications at every stage</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-md">
                      📧
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email Delivery</p>
                      <p className="text-sm text-gray-600">eVisa sent directly to your inbox</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Disclaimer */}
      <section className="relative w-full bg-white py-12 border-b-2 border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-50 border-4 border-brand-primary rounded-lg p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900">Official Disclaimer</h3>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">vietnamimmigration.com</strong> is operated by
                Vietnam Official eVisa Immigration Assistance Service, a private company providing
                professional visa application preparation and support services. We are{' '}
                <strong>not affiliated with</strong> the Government of Vietnam or any official
                immigration authority.
              </p>
              <p>
                Visa applications may be submitted directly through the official government portal
                at a lower cost. By using our professional service, you agree to pay the government
                visa fee plus our service fee, which is clearly disclosed throughout the application
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative w-full px-4 pb-10"></div>
      <SiteFooter />
    </main>
  );
}
