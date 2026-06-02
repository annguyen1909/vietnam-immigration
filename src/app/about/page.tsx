'use client';
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import Lottie from 'lottie-react';
import howItWorksLottie from 'public/img/Animation - 1751187180561.json';
import {
  UserGroupIcon,
  BoltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { VIETNAM_PROCESSING_TIME, getVietnamAboutTransparentFeesDesc } from '@/lib/vietnamPricing';

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    title: 'Submit Application',
    desc: 'Complete the official online application form with all required information and documentation as per Vietnamese immigration requirements.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z"
        />
      </svg>
    ),
    title: 'Professional Review',
    desc: 'Each application undergoes comprehensive review by certified Vietnam immigration specialists to ensure accuracy and compliance with official requirements.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Receive Your eVisa',
    desc: `Upon approval, your official Vietnam eVisa will be delivered electronically to your registered email address, typically within ${VIETNAM_PROCESSING_TIME}.`,
  },
];

const features = [
  {
    icon: UserGroupIcon,
    title: 'Certified Immigration Specialists',
    desc: 'Our team consists of certified Vietnam immigration specialists with extensive experience in processing official visa applications. Each specialist stays current with the latest Vietnamese immigration regulations and requirements.',
    color: 'bg-brand-primary',
  },
  {
    icon: BoltIcon,
    title: 'Efficient Processing Service',
    desc: `Secure and efficient processing of official Vietnam entry visas with bank-level security for all data and payment transactions. Processing typically completed within ${VIETNAM_PROCESSING_TIME}.`,
    color: 'bg-green-600',
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Transparent Fee Structure',
    desc: getVietnamAboutTransparentFeesDesc(),
    color: 'bg-yellow-500',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Trusted Professional Service',
    desc: 'Professional visa application assistance service trusted by travelers, families, and businesses worldwide. Over 15,000+ applications processed with official standards and certified expertise.',
    color: 'bg-purple-600',
  },
  {
    icon: DocumentTextIcon,
    title: 'Official Requirements & Information',
    desc: 'Comprehensive information service providing the latest official requirements, embassy contact details, and travel advisories for Vietnam in accordance with government regulations.',
    color: 'bg-red-600',
  },
  {
    icon: HeartIcon,
    title: 'Dedicated Professional Support',
    desc: 'Every application receives dedicated professional attention with expert care and meticulous review to ensure compliance with official Vietnamese immigration standards.',
    color: 'bg-pink-600',
  },
];

export default function AboutPage() {
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
              <span className="text-sm font-bold text-white uppercase tracking-wide">About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              About Vietnam
              <span className="block text-brand-primary">Official eVisa Service</span>
            </h1>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Vietnam Official eVisa Immigration Assistance Service provides professional visa
              application preparation and support services. We facilitate the application process in
              accordance with official Vietnamese immigration requirements, ensuring accuracy,
              compliance, and efficient processing.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              Our mission is to provide professional visa application assistance and support
              services that facilitate the Vietnam eVisa application process in accordance with
              official immigration requirements. We combine advanced technology, certified
              expertise, and dedicated human support to ensure accurate, compliant, and efficient
              processing of your visa application. Our goal is to simplify the visa application
              process by offering comprehensive guidance, document review, and professional customer
              support to international travelers seeking entry authorization for Vietnam.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section with Lottie */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
              <span className="text-sm font-bold text-white uppercase tracking-wide">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and efficient process to obtain your official Vietnam eVisa
            </p>
          </div>

          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center text-white border-4 border-white shadow-lg">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <Lottie
                    animationData={howItWorksLottie}
                    loop
                    autoplay
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
              <span className="text-sm font-bold text-white uppercase tracking-wide">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional immigration services with official standards and certified expertise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white border-4 border-brand-primary rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all"
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-4 border-2 border-white shadow-md`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Our Promise
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Promise to You
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              We are committed to providing consistent, professional service to all applicants,
              regardless of travel purpose or group size. Our certified immigration specialists
              ensure that every application receives the same level of expert review and attention
              to detail. Our dedicated support team is available 24/7 to address inquiries and
              provide guidance throughout the application process. We maintain official standards
              and certified expertise in all aspects of visa application processing, ensuring your
              confidence in our professional assistance service.
            </p>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                  <span className="text-sm font-bold text-white uppercase tracking-wide">
                    Contact Us
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <div className="w-24 h-1 bg-brand-primary mb-6 mx-auto md:mx-0"></div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our professional support team is available 24 hours a day, 7 days a week to assist
                  with your visa application inquiries and provide guidance throughout the process.
                  Every inquiry is handled by certified immigration specialists—never automated
                  systems.
                </p>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-brand-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      <span className="font-semibold">Email:</span>{' '}
                      <a
                        href="mailto:Visa@VietnamEmigration.com"
                        className="text-brand-primary hover:underline"
                      >
                        Visa@VietnamEmigration.com
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-brand-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>
                      <span className="font-semibold">Phone:</span>{' '}
                      <a href="tel:+13232864541" className="text-brand-primary hover:underline">
                        +1 323 286 4541
                      </a>{' '}
                      <span className="text-gray-600">(United States)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-brand-primary"
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
                    <span>
                      <span className="font-semibold">Live Chat:</span> 24/7 via website
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <a
                  href="mailto:Visa@VietnamEmigration.com"
                  className="inline-flex items-center px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-sm border-2 border-brand-primary w-full justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Us
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-brand-primary font-bold rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-sm border-2 border-brand-primary w-full justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Contact Support
                </Link>
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
                <strong className="text-gray-900">vietnamemigration.com</strong> is operated by
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
