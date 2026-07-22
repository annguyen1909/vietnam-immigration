import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import SiteFooter from '@/components/layout/SiteFooter';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import HelpFloatingBox from '@/components/ui/HelpFloatingBox';
import RelatedResources from '@/components/ui/RelatedResources';
import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import {
  VIETNAM_GOV_FEE_MULTIPLE,
  VIETNAM_GOV_FEE_SINGLE,
  VIETNAM_SERVICE_FEE_PER_PAX,
  VIETNAM_URGENCY_FEE_SUPER_URGENT,
  VIETNAM_URGENCY_FEE_URGENT,
  formatUsd,
} from '@/lib/vietnamPricing';

export const metadata: Metadata = buildPageMetadata({
  title: 'Urgent eVisa Vietnam 2026 — Emergency & Rush (1-Day / 3-Day)',
  description:
    'Urgent eVisa Vietnam and emergency rush options: Super Urgent (1 day) or Urgent (3 days). See fees, timelines, and how to apply when your flight is close.',
  path: '/faq/24-hour-vietnam-evisa',
  ogType: 'website',
  keywords: [
    'urgent evisa vietnam',
    'urgent vietnam evisa',
    'emergency evisa vietnam',
    'emergency vietnam evisa',
    'rush evisa to vietnam',
    'emergency vietnam visa',
    'urgent vietnam visa',
  ],
});

const FAQ_ITEMS = [
  {
    question: 'How do I get an urgent eVisa Vietnam when my flight is soon?',
    answer:
      'Apply online, upload a clear passport scan and portrait, then choose Urgent (3 days) or Super Urgent (1 day) if available for your case. Contact support with your reference and flight date if departure is within 24–48 hours.',
  },
  {
    question: 'What is the difference between urgent and emergency Vietnam eVisa tiers?',
    answer:
      'On this site, Urgent targets 3-day assisted handling and Super Urgent targets 1-day assisted handling. Both are private rush services—final approval still comes from Vietnam immigration and depends on clean documents.',
  },
  {
    question: 'Can I get a rush eVisa to Vietnam in 24 hours?',
    answer:
      'Super Urgent targets 1-day assisted handling when your documents are ready and the tier is available. It is not a government guarantee. Apply immediately, avoid photo/passport errors, and keep support updated with your travel details.',
  },
  {
    question: 'How much does an urgent Vietnam eVisa cost?',
    answer:
      'Total = government fee ($55 single / $80 multiple) + $59.99 service fee per passenger + urgency add-on ($110 Urgent or $220 Super Urgent). See the fee examples on this page and the full calculator on /fees.',
  },
  {
    question: 'Is emergency Vietnam eVisa approval guaranteed?',
    answer:
      'No. Faster handling speeds our preparation and follow-up, but immigration decides approval and timing. Wrong photos, name mismatches, or holiday backlogs can still delay results.',
  },
  {
    question: 'Do weekends and holidays affect urgent Vietnam visa processing?',
    answer:
      'Yes. Support stays available, but government review still follows business days and public holidays. Near Tet or major holidays, apply as early as possible even if you select a rush tier.',
  },
  {
    question: 'What should I fix first if my urgent application is stuck?',
    answer:
      'Check payment status, passport scan clarity, and portrait compliance. See our troubleshooting guides for payment failed, photo rejected, and processing delays—then contact support with your reference number.',
  },
];

const URGENT_RELATED = [
  {
    href: '/fees',
    title: 'Vietnam Visa Fees & Calculator',
    description: 'Full $55/$80 government fee breakdown plus service and rush add-ons.',
  },
  {
    href: '/troubleshooting/payment-failed',
    title: 'Payment Failed?',
    description: 'Fix checkout errors before you lose your rush window.',
  },
  {
    href: '/troubleshooting/photo-rejected',
    title: 'Photo Rejected',
    description: 'Fix portrait rules that delay urgent submissions.',
  },
  {
    href: '/troubleshooting/evisa-processing-48-hours',
    title: 'Still Processing After 48 Hours',
    description: 'What to do when a rush case has not moved.',
  },
  {
    href: '/processing',
    title: 'Standard Processing Times',
    description: 'Compare normal timelines vs Urgent and Super Urgent.',
  },
];

export default function UrgentEVisaLandingPage() {
  const standardSingleTotal = VIETNAM_GOV_FEE_SINGLE + VIETNAM_SERVICE_FEE_PER_PAX;
  const urgentSingleTotal = standardSingleTotal + VIETNAM_URGENCY_FEE_URGENT;
  const superUrgentSingleTotal = standardSingleTotal + VIETNAM_URGENCY_FEE_SUPER_URGENT;

  return (
    <>
      <FAQSchema items={FAQ_ITEMS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'FAQ', href: '/faq' },
          { name: 'Urgent eVisa Vietnam', href: '/faq/24-hour-vietnam-evisa' },
        ]}
      />
      <main className="relative min-h-screen w-full bg-white text-gray-900 selection:bg-amber-100 selection:text-amber-900">
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-amber-600 py-2.5 px-4 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
            <BoltIcon className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
              URGENT EVISA SUPPORT • SUPER URGENT (1 DAY) OR URGENT (3 DAYS)
            </span>
            <BoltIcon className="w-5 h-5 text-yellow-300 flex-shrink-0" />
          </div>
        </div>

        <section className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 lg:py-24 overflow-hidden border-b-4 border-amber-500">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 text-sm font-bold tracking-wide backdrop-blur-sm">
                  <ShieldCheckIcon className="w-5 h-5 text-amber-400" />
                  Private assisted service for last-minute travel
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                  Urgent eVisa Vietnam &amp; Emergency Rush{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
                    1-Day &amp; 3-Day Options (2026)
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Flight departing soon? Our{' '}
                  <strong className="text-white font-semibold">urgent evisa vietnam</strong>{' '}
                  guidance helps you choose the right assisted handling tier, avoid document
                  mistakes, and understand what is still dependent on immigration review.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto lg:mx-0">
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center lg:items-start text-center lg:text-left backdrop-blur-md shadow-xl hover:border-red-500/50 transition-all group">
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all mb-3">
                      <BoltIcon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Super Urgent
                    </span>
                    <span className="text-2xl font-black text-white mt-1">1 Day</span>
                    <span className="text-xs text-amber-400 mt-1 font-medium">
                      Closest departures
                    </span>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center lg:items-start text-center lg:text-left backdrop-blur-md shadow-xl hover:border-amber-500/50 transition-all group">
                    <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all mb-3">
                      <ClockIcon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Urgent
                    </span>
                    <span className="text-2xl font-black text-white mt-1">3 Days</span>
                    <span className="text-xs text-amber-400 mt-1 font-medium">
                      Tight but manageable trips
                    </span>
                  </div>

                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col items-center lg:items-start text-center lg:text-left backdrop-blur-md shadow-xl hover:border-slate-500/50 transition-all group">
                    <div className="p-3 bg-slate-600/20 border border-slate-500/30 rounded-lg text-slate-300 group-hover:bg-slate-500 group-hover:text-white transition-all mb-3">
                      <ShieldCheckIcon className="w-7 h-7" />
                    </div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Standard
                    </span>
                    <span className="text-2xl font-black text-white mt-1">3-5 Days</span>
                    <span className="text-xs text-amber-400 mt-1 font-medium">
                      Best for planned travel
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600"></div>

                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                      Request Urgent Visa Support
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Choose your tier at checkout and keep your documents accurate
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="font-bold block text-gray-900">
                          Document Pre-Verification
                        </span>
                        <span className="text-gray-600 text-xs">
                          Reduce delays caused by passport or portrait mistakes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="font-bold block text-gray-900">Clear Tier Selection</span>
                        <span className="text-gray-600 text-xs">
                          Pick Standard, Urgent (3 days), or Super Urgent (1 day)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                      <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="font-bold block text-gray-900">
                          Real-Time Support Follow-Up
                        </span>
                        <span className="text-gray-600 text-xs">
                          Contact support quickly if your departure date is very close
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/apply"
                      className="w-full py-4 px-6 bg-gradient-to-r from-red-600 hover:from-red-700 to-amber-600 hover:to-amber-700 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 group"
                    >
                      <span>Start Urgent Application</span>
                      <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="text-center text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                      <span>SSL secured • Refund policy available on eligible cases</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-20 bg-slate-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold text-amber-600 uppercase tracking-widest block mb-2">
                Tier Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Choose the Right Processing Speed
              </h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                These timelines describe our assisted handling tiers. Final approval still depends
                on Vietnam immigration and on the quality of your submitted documents.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-16">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider font-bold">
                      <th className="py-5 px-6">Service Tier</th>
                      <th className="py-5 px-6">Target Handling Time</th>
                      <th className="py-5 px-6">Sample Total (Single)</th>
                      <th className="py-5 px-6">Best Suited For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-700 font-medium">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-900">Super Urgent</td>
                      <td className="py-5 px-6 font-extrabold text-red-600">1 day</td>
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {formatUsd(superUrgentSingleTotal)}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        Flights that are extremely close and still eligible for rush handling
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-900">Urgent</td>
                      <td className="py-5 px-6 font-extrabold text-amber-600">3 days</td>
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {formatUsd(urgentSingleTotal)}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        Upcoming trips that need faster handling than the standard window
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-5 px-6 font-bold text-slate-900">Standard</td>
                      <td className="py-5 px-6 font-extrabold text-slate-700">3-5 business days</td>
                      <td className="py-5 px-6 font-bold text-slate-900">
                        {formatUsd(standardSingleTotal)}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        Travelers applying early who want the normal processing route
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 px-6 py-4 border-t border-gray-100">
                Sample totals use single-entry government fee + service fee + urgency add-on. Full
                breakdown and multiple-entry pricing:{' '}
                <Link href="/fees" className="font-semibold text-brand-primary underline">
                  Vietnam visa fees
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:border-slate-400 transition-all">
                <div className="w-14 h-14 bg-slate-900 text-white font-black text-2xl rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-slate-700 transition-colors mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Submit Clean Documents</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Upload a clear passport bio page and a compliant portrait photo. The closer your
                  trip is, the less room you have for corrections.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:border-amber-500 transition-all">
                <div className="w-14 h-14 bg-slate-900 text-white font-black text-2xl rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-amber-500 transition-colors mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Select the Right Tier</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Choose Standard, Urgent (3 days), or Super Urgent (1 day) based on your arrival
                  date and the options available on the application flow.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:border-red-500 transition-all">
                <div className="w-14 h-14 bg-slate-900 text-white font-black text-2xl rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-red-500 transition-colors mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Monitor Approval Closely</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Once immigration issues the eVisa, the approval PDF is sent electronically. If
                  your flight is close, keep support updated with your travel reference.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-20 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-bold text-amber-600 uppercase tracking-widest block mb-2">
                Transparent Fees
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Sample Single-Entry Pricing
              </h2>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                These examples use the single-entry government fee. Multiple-entry visas use a{' '}
                {formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} government fee instead of{' '}
                {formatUsd(VIETNAM_GOV_FEE_SINGLE)}.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-12">
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:border-slate-500 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-black text-slate-700 uppercase tracking-wider">
                      Standard
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-800 font-bold text-xs rounded-full border border-slate-200">
                      3-5 business days
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Example</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Best for travelers who still have time before departure.
                  </p>

                  <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Government Fee:</span>
                      <span className="font-bold text-gray-900">
                        {formatUsd(VIETNAM_GOV_FEE_SINGLE)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Professional Service Fee:</span>
                      <span className="font-bold text-gray-900">
                        {formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Urgency Add-on:</span>
                      <span className="font-bold text-slate-700">$0</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold pt-2 border-t border-gray-100">
                      <span>Total:</span>
                      <span>{formatUsd(standardSingleTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/apply"
                    className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Choose Standard</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white border-2 border-amber-500 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative transform lg:-translate-y-4">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg">
                  Most Common Rush Tier
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-sm font-black text-amber-400 uppercase tracking-wider">
                      Urgent
                    </span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-bold text-xs rounded-full border border-amber-500/40">
                      3 days
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Urgent Example</h3>
                  <p className="text-slate-300 text-sm mb-6">
                    A good fit for close trips that still have a small time buffer.
                  </p>

                  <div className="space-y-3 pt-6 border-t border-slate-700 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Government Fee:</span>
                      <span className="font-bold text-white">
                        {formatUsd(VIETNAM_GOV_FEE_SINGLE)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Professional Service Fee:</span>
                      <span className="font-bold text-white">
                        {formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Urgency Add-on:</span>
                      <span className="font-bold text-amber-400">
                        +{formatUsd(VIETNAM_URGENCY_FEE_URGENT)}
                      </span>
                    </div>
                    <div className="flex justify-between text-white font-bold pt-2 border-t border-slate-700">
                      <span>Total:</span>
                      <span>{formatUsd(urgentSingleTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/apply"
                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 font-black text-lg rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Choose Urgent</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xl hover:border-red-500 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-black text-red-600 uppercase tracking-wider">
                      Super Urgent
                    </span>
                    <span className="px-3 py-1 bg-red-50 text-red-800 font-bold text-xs rounded-full border border-red-200">
                      1 day
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Super Urgent Example</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Intended for the closest departures when a faster tier is still available.
                  </p>

                  <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Government Fee:</span>
                      <span className="font-bold text-gray-900">
                        {formatUsd(VIETNAM_GOV_FEE_SINGLE)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Professional Service Fee:</span>
                      <span className="font-bold text-gray-900">
                        {formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Urgency Add-on:</span>
                      <span className="font-bold text-red-600">
                        +{formatUsd(VIETNAM_URGENCY_FEE_SUPER_URGENT)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold pt-2 border-t border-gray-100">
                      <span>Total:</span>
                      <span>{formatUsd(superUrgentSingleTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/apply"
                    className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Choose Super Urgent</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 max-w-4xl mx-auto shadow-lg flex flex-col sm:flex-row items-center gap-6">
              <ShieldCheckIcon className="w-16 h-16 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  Service Fee Refund Policy
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Our refund terms are explained on the{' '}
                  <Link href="/refund-policy" className="font-bold text-brand-primary underline">
                    refund policy
                  </Link>{' '}
                  page. Review those conditions before choosing an urgent tier so expectations are
                  clear on both fees and eligibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-20 bg-slate-50 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-200 text-slate-800 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                <QuestionMarkCircleIcon className="w-5 h-5 text-slate-700" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Last-Minute Vietnam eVisa Questions
              </h2>
              <p className="text-lg text-gray-600 mt-3">
                The most important details to check before selecting a rush tier.
              </p>
            </div>

            <div className="space-y-6">
              {FAQ_ITEMS.map((item) => (
                <div
                  key={item.question}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-extrabold text-gray-900 flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center text-sm font-black mt-0.5">
                      Q
                    </span>
                    <span>{item.question}</span>
                  </h3>
                  <div className="mt-4 pl-10 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-lg rounded-2xl shadow-xl transition-all"
              >
                Start urgent application
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <p className="mt-3 text-sm text-gray-500">
                Choose Urgent or Super Urgent at checkout based on your flight date.
              </p>
            </div>

            <div className="mt-16">
              <RelatedResources
                title="Fees, fixes & next steps for urgent cases"
                links={URGENT_RELATED}
                excludePaths={['/faq/24-hour-vietnam-evisa']}
              />
            </div>

            <div className="mt-12">
              <HelpFloatingBox />
            </div>
          </div>
        </section>

        <section className="relative w-full bg-white py-12 border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-bold text-gray-900">Service Disclaimer</h3>
              </div>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  <strong className="text-gray-900">vietnamemigration.com</strong> is operated by
                  Vietnam eVisa Assistance Team, a private professional visa application preparation
                  and support service. We are <strong>not affiliated with</strong> the Government of
                  Vietnam or any official immigration authority.
                </p>
                <p>
                  Urgent tiers improve preparation speed and support response on our side, but they
                  do not replace immigration review. Final approval timing still depends on the
                  Vietnamese authorities and the accuracy of your documents.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
