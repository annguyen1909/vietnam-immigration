import SiteFooter from '@/components/layout/SiteFooter';
import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import glob from 'fast-glob';
import { Metadata } from 'next';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { extractFaqAnswerSnippet } from '@/lib/contentExcerpt';
import FAQSchema from '@/components/seo/FAQSchema';

interface FAQ {
  question: string;
  slug: string;
  answerSnippet: string;
}

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Find comprehensive answers to common questions about Vietnam eVisa requirements, application process, processing times, and entry regulations. Get expert guidance on Vietnam visa questions.',
  keywords: [
    'Vietnam eVisa FAQ',
    'Vietnam visa questions',
    'Vietnam visa FAQ',
    'Vietnam visa help',
    'Vietnam visa answers',
    'Vietnam visa information',
    'Vietnam visa requirements FAQ',
    'Vietnam visa application FAQ',
    'Vietnam visa process FAQ',
    'Vietnam visa support',
  ],
  alternates: {
    canonical: 'https://vietnamemigration.com/faq',
  },
  openGraph: {
    type: 'website',
    url: 'https://vietnamemigration.com/faq',
    title: 'Frequently Asked Questions (FAQ)',
    description:
      'Find comprehensive answers to common questions about Vietnam eVisa requirements, application process, processing times, and entry regulations.',
    siteName: 'Vietnam Official eVisa',
    images: [
      {
        url: '/img/vietnam-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vietnam eVisa FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vietnam_immigration',
    creator: '@vietnam_immigration',
    title: 'Frequently Asked Questions (FAQ)',
    description:
      'Find comprehensive answers to common questions about Vietnam eVisa requirements, application process, processing times, and entry regulations.',
    images: ['/img/vietnam-hero.jpg'],
  },
};

export default function FAQPage() {
  // Read all FAQ markdown files
  let faqs: FAQ[] = [];
  try {
    const faqDir = path.join(process.cwd(), 'src/data/faqs');
    const files = glob.sync('*.md', { cwd: faqDir });
    faqs = files.map((file) => {
      const fileContent = fs.readFileSync(path.join(faqDir, file), 'utf8');
      const { data, content } = matter(fileContent);
      return {
        question: data.question,
        slug: data.slug,
        answerSnippet: extractFaqAnswerSnippet(content),
      };
    });
  } catch (e) {
    // If there's an error reading FAQs, use empty array
    faqs = [];
  }

  const faqSchemaItems = faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answerSnippet || faq.question,
  }));

  return (
    <>
      <FAQSchema items={faqSchemaItems} />
      <main className="relative min-h-screen w-full bg-white text-gray-900">
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
                  Help Center
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Frequently Asked
                <span className="block text-brand-primary">Questions</span>
              </h1>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Find comprehensive answers to common questions about Vietnam eVisa requirements,
                application procedures, processing times, and entry regulations.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ List Section */}
        <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl mb-8">
              <div className="flex items-center gap-3 mb-8">
                <QuestionMarkCircleIcon className="w-8 h-8 text-brand-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Common Questions</h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const number = idx + 1;
                  return (
                    <Link
                      key={faq.slug}
                      href={`/faq/${faq.slug}`}
                      className="block bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-brand-primary transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-primary text-white font-bold text-lg rounded-full flex items-center justify-center border-2 border-white shadow-md">
                          {number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-lg font-semibold text-gray-900 group-hover:text-brand-primary transition-colors block">
                            {faq.question}
                          </span>
                          {faq.answerSnippet && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                              {faq.answerSnippet}
                            </p>
                          )}
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-brand-primary transition-colors flex-shrink-0 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
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
                  at a lower cost. By using our professional service, you agree to pay the
                  government visa fee plus our service fee, which is clearly disclosed throughout
                  the application process.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="relative w-full px-4 pb-10"></div>
        <SiteFooter />
      </main>
    </>
  );
}
