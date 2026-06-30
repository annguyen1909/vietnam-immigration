import React from 'react';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  ClockIcon,
  DocumentTextIcon,
  BoltIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface EssentialEvisaResourcesProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export default function EssentialEvisaResources({
  className = '',
  title = 'Essential E-Visa Resources',
  subtitle = 'Quick access to our most requested guides, transparent pricing tools, and practical urgent-processing references.',
}: EssentialEvisaResourcesProps) {
  const strategicLinks = [
    {
      href: '/fees',
      anchor: 'Vietnam Visa Fees & Calculator',
      description:
        'Check official government visa fees and calculate transparent pricing for all passport holders.',
      icon: CurrencyDollarIcon,
      badge: 'Popular',
      highlight: false,
    },
    {
      href: '/processing',
      anchor: 'E-Visa Processing Guide',
      description:
        'Review standard timelines, common delay factors, and how to plan for urgent travel.',
      icon: ClockIcon,
      badge: 'Important',
      highlight: false,
    },
    {
      href: '/blog/vietnam-evisa-multiple-entry-guide-2026',
      anchor: '90-Day Multiple Entry Guide',
      description:
        'Detailed walk-through for obtaining the 90-day multiple-entry eVisa for tourism or business.',
      icon: DocumentTextIcon,
      badge: 'Guide',
      highlight: false,
    },
    {
      href: '/blog/vietnam-evisa-processing-time-2026',
      anchor: 'Processing & Delay Guide',
      description:
        'Understand business-day timing, holiday slowdowns, and when 1-day or 3-day handling may help.',
      icon: BoltIcon,
      badge: 'Official Guide',
      highlight: false,
    },
    {
      href: '/faq/24-hour-vietnam-evisa',
      anchor: 'Urgent E-Visa Options',
      description:
        'Compare Super Urgent (1 day) and Urgent (3 days) assisted handling for close departure dates.',
      icon: SparklesIcon,
      badge: 'Emergency',
      highlight: true,
    },
  ];

  return (
    <section className={`w-full ${className}`}>
      <div className="rounded-2xl border-4 border-brand-primary bg-white p-6 sm:p-8 shadow-2xl">
        <div className="mb-8 text-left">
          <div className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/30 rounded-full mb-3">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              Top Requested Services
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-base text-gray-600 max-w-3xl leading-relaxed">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategicLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex flex-col justify-between rounded-xl border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  link.highlight
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 hover:border-amber-600'
                    : 'bg-gray-50 border-gray-200 hover:border-brand-primary hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 shadow-sm ${
                        link.highlight
                          ? 'bg-amber-500 border-white text-white'
                          : 'bg-brand-primary border-white text-white'
                      }`}
                    >
                      <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        link.highlight
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-white text-brand-primary border-gray-200'
                      }`}
                    >
                      {link.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold mb-2 transition-colors duration-200 ${
                      link.highlight
                        ? 'text-gray-900 group-hover:text-amber-900'
                        : 'text-gray-900 group-hover:text-brand-primary'
                    }`}
                  >
                    {link.anchor}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{link.description}</p>
                </div>

                <div
                  className={`flex items-center gap-2 text-sm font-bold pt-4 border-t ${
                    link.highlight
                      ? 'border-amber-200 text-amber-700 group-hover:text-amber-900'
                      : 'border-gray-200 text-brand-primary group-hover:text-brand-primary/80'
                  }`}
                >
                  <span>Explore Service</span>
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
