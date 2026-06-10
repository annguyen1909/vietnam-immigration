'use client';
import React from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import ContactForm from '@/components/ui/ContactForm';
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function ContactPage() {
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
                Contact & Support
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Vietnam eVisa
              <span className="block text-brand-primary">Support Experts</span>
            </h1>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Get your visa questions answered quickly. Available 24/7 with instant response and
              100% human support—never a chatbot.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <div className="bg-white border-4 border-brand-primary rounded-lg p-6 shadow-xl text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Live Chat</h3>
              <p className="text-gray-700 text-sm">Instant response from real experts</p>
            </div>
            <div className="bg-white border-4 border-brand-primary rounded-lg p-6 shadow-xl text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-700 text-sm">Get detailed answers via email</p>
            </div>
            <div className="bg-white border-4 border-brand-primary rounded-lg p-6 shadow-xl text-center">
              <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-700 text-sm">Speak directly with our team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                  <span className="text-sm font-bold text-white uppercase tracking-wide">
                    Contact Form
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
                <p className="text-gray-600">
                  Fill out the form below and our team will respond within 24 hours
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Support Hours */}
              <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <ClockIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">24/7 Support</h3>
                    <p className="text-gray-600 text-sm">Available around the clock</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our certified immigration specialists are available 24 hours a day, 7 days a week
                  to assist with your application and answer all your questions. Every inquiry is
                  handled by a real human—never a chatbot.
                </p>
              </div>

              {/* Contact Details */}
              <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                    <span className="text-sm font-bold text-white uppercase tracking-wide">
                      Contact Information
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <EnvelopeIcon className="w-6 h-6 text-brand-primary" />
                      <span className="font-semibold text-gray-900">Email:</span>
                    </div>
                    <a
                      href="mailto:visa@unitedevisa.com"
                      className="text-brand-primary hover:underline font-medium"
                    >
                      visa@unitedevisa.com
                    </a>
                  </div>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <PhoneIcon className="w-6 h-6 text-brand-primary" />
                      <span className="font-semibold text-gray-900">Phone:</span>
                    </div>
                    <a
                      href="tel:+13232864541"
                      className="text-brand-primary hover:underline font-medium"
                    >
                      +1 323 286 4541
                    </a>
                    <p className="text-gray-600 text-sm mt-1">United States</p>
                  </div>
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-brand-primary" />
                      <span className="font-semibold text-gray-900">Live Chat:</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Available 24/7 through our website chat widget
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="bg-gradient-to-br from-gray-50 to-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Contact Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-brand-primary font-bold mt-1">✓</span>
                    <span className="text-gray-700">
                      Expert guidance on visa requirements and documentation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-primary font-bold mt-1">✓</span>
                    <span className="text-gray-700">
                      Help with application form completion and review
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-primary font-bold mt-1">✓</span>
                    <span className="text-gray-700">
                      Status updates and processing timeline information
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-brand-primary font-bold mt-1">✓</span>
                    <span className="text-gray-700">
                      Answers to all your Vietnam eVisa questions
                    </span>
                  </li>
                </ul>
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
                By using our professional service, you agree to pay the government visa fee plus our
                service fee, which is clearly disclosed throughout the application process.
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
