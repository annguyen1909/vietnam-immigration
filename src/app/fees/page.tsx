'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import {
  CalculatorIcon,
  DocumentCheckIcon,
  ClockIcon,
  BoltIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import type { VietnamVisaTypeView } from '@/lib/vietnamVisa';
import {
  VIETNAM_GOV_FEE_MULTIPLE,
  VIETNAM_GOV_FEE_SINGLE,
  VIETNAM_SERVICE_FEE_PER_PAX,
  VIETNAM_URGENCY_FEE_SUPER_URGENT,
  VIETNAM_URGENCY_FEE_URGENT,
  VIETNAM_NORMAL_LABEL,
  VIETNAM_URGENCY_SUPER_LABEL,
  VIETNAM_URGENCY_URGENT_LABEL,
  VIETNAM_VISA_PRODUCTS,
  formatUsd,
} from '@/lib/vietnamPricing';
import type { UrgencyValue } from '@/lib/urgency';
import { deriveApplyQueryFromVisaId } from '@/lib/vietnamVisa';
import { FEES_FAQ_ITEMS } from '@/data/feesFaq';
import RelatedResources from '@/components/ui/RelatedResources';
import EmergencyCTA from '@/components/trust/EmergencyCTA';

type VisaOption = { value: string; label: string; govFee: number };

const FALLBACK_VISA_OPTIONS: VisaOption[] = VIETNAM_VISA_PRODUCTS.map((p) => ({
  value: deriveApplyQueryFromVisaId(p.id),
  label: p.label,
  govFee: p.govFee,
}));

export default function FeesPage() {
  const SERVICE_FEE = VIETNAM_SERVICE_FEE_PER_PAX;
  const [visaOptions, setVisaOptions] = useState<VisaOption[]>(FALLBACK_VISA_OPTIONS);
  const [visaType, setVisaType] = useState(FALLBACK_VISA_OPTIONS[0]?.value ?? '');
  const [passengers, setPassengers] = useState(1);
  const [urgency, setUrgency] = useState<UrgencyValue>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/destinations/vietnam/visa-types');
        if (!res.ok) return;
        const data: VietnamVisaTypeView[] = await res.json();
        const options = data.map((v) => ({
          value: v.applyQuery,
          label: v.name,
          govFee: v.govFee,
        }));
        setVisaOptions(options);
        if (options.length > 0) {
          setVisaType(options[0].value);
        }
      } catch (e) {
        console.error('Failed to load visa types:', e);
      }
    };
    load();
  }, []);

  const selectedVisa = visaOptions.find((v) => v.value === visaType) || visaOptions[0];
  const govFee = (selectedVisa?.govFee ?? 0) * passengers;
  const serviceFee = SERVICE_FEE * passengers;
  const urgencyFeePerPax =
    urgency === 'urgent_48h'
      ? VIETNAM_URGENCY_FEE_URGENT
      : urgency === 'super_urgent_24h'
        ? VIETNAM_URGENCY_FEE_SUPER_URGENT
        : 0;
  const urgencyFee = urgencyFeePerPax * passengers;
  const total = govFee + serviceFee + urgencyFee;
  const urgencyQuery = urgency ? `&urgency=${urgency}` : '';
  const applyHref = `/apply?type=${encodeURIComponent(visaType)}&passengers=${passengers}${urgencyQuery}`;

  return (
    <main
      className={`relative min-h-screen w-full bg-brand-surface text-brand-ink overflow-x-hidden`}
    >
      {/* Official Header Banner */}
      <div className="brand-banner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Official Vietnam E-Visa Application Assistance
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
                2026 Transparent Pricing
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Vietnam Visa Fee 2026
              <span className="block text-brand-primary">
                ${VIETNAM_GOV_FEE_SINGLE} Single / ${VIETNAM_GOV_FEE_MULTIPLE} Multiple + Service
                Fee
              </span>
            </h1>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>

            <div className="max-w-3xl mx-auto mb-8 grid sm:grid-cols-3 gap-3 text-left">
              <div className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Single entry
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatUsd(VIETNAM_GOV_FEE_SINGLE)}
                </p>
                <p className="text-xs text-gray-500">Government fee</p>
              </div>
              <div className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                  Multiple entry
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatUsd(VIETNAM_GOV_FEE_MULTIPLE)}
                </p>
                <p className="text-xs text-gray-500">Government fee</p>
              </div>
              <div className="rounded-xl border-2 border-brand-primary bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                  Service fee
                </p>
                <p className="text-2xl font-bold text-brand-primary">
                  {formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)}
                </p>
                <p className="text-xs text-gray-500">Per passenger</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
              Your <strong>Vietnam visa fee</strong> total is the government fee for your entry type
              plus our flat service fee—shown before you pay. Optional{' '}
              <Link
                href="/faq/24-hour-vietnam-evisa"
                className="font-semibold text-brand-primary underline"
              >
                Urgent (3 days)
              </Link>{' '}
              or Super Urgent (1 day) add-ons are available at checkout if your flight is close.
            </p>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Use the calculator below for an exact total by visa type and passenger count. Need
              rush handling? Compare tiers on our{' '}
              <Link
                href="/faq/24-hour-vietnam-evisa"
                className="font-semibold text-brand-primary underline"
              >
                urgent eVisa Vietnam
              </Link>{' '}
              page.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={applyHref}
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg text-base"
              >
                Start application
              </Link>
              <button
                type="button"
                onClick={() =>
                  document.getElementById('fee-calculator')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-bold rounded-xl border-2 border-brand-primary hover:bg-brand-primary/5 transition-all text-base"
              >
                Calculate total first
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden border-4 border-brand-primary shadow-2xl">
              <Image
                src="/img/vietnam-hero.jpg"
                alt="Vietnam eVisa pricing breakdown for travelers"
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

      <section className="relative w-full bg-white py-12 border-b-2 border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-blue-50 border-l-8 border-brand-primary rounded-r-xl p-6 sm:p-8 shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <DocumentCheckIcon className="w-6 h-6 text-brand-primary flex-shrink-0" />
              <span>What you pay on this portal</span>
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              This page is the canonical <strong>Vietnam visa fee</strong> breakdown for assisted
              eVisa applications on vietnamemigration.com. Government fee by product:{' '}
              <strong>{formatUsd(VIETNAM_GOV_FEE_SINGLE)} single entry</strong> or{' '}
              <strong>{formatUsd(VIETNAM_GOV_FEE_MULTIPLE)} multiple entry</strong>, plus{' '}
              <strong>{formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)} service fee</strong> per passenger.
              Passport validity should extend at least six months beyond your intended arrival date
              before you apply.
            </p>
          </div>
        </div>
      </section>

      {/* 2-Column Transparent Pricing Table Section */}
      <section className="relative w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transparent Pricing Breakdown
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe in complete transparency. Review the clear distinction between the
              statutory fees paid directly to immigration authorities and the professional fees for
              our expert preparation and review services.
            </p>
          </div>

          {/* 2 Columns Comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Column 1: Government Stamping Fee */}
            <div className="bg-white border-4 border-gray-300 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
              <div>
                <div className="bg-gray-200 py-6 px-8 text-center border-b-2 border-gray-300">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-widest block mb-1">
                    Mandatory Cost
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Government Stamping Fee
                  </h3>
                </div>
                <div className="p-8 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-700 font-semibold">
                      Single Entry (Tourist/Business)
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatUsd(VIETNAM_GOV_FEE_SINGLE)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-700 font-semibold">
                      Multiple Entry (Tourist/Business)
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatUsd(VIETNAM_GOV_FEE_MULTIPLE)}
                    </span>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        <strong>Recipient:</strong> Vietnam Immigration Department (National Web
                        Portal).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        <strong>Purpose:</strong> Statutory processing and issuance charge for
                        border control clearance.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        <strong>Requirement:</strong> Valid passport with 6+ months passport
                        validity required.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 italic">
                  *Government stamping fees are mandatory for all eVisa applications.
                </p>
              </div>
            </div>

            {/* Column 2: Our Service & Consultancy Fee */}
            <div className="bg-white border-4 border-brand-primary rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
              <div>
                <div className="bg-brand-primary py-6 px-8 text-center border-b-2 border-brand-primary">
                  <span className="text-xs font-bold text-white/90 uppercase tracking-widest block mb-1">
                    Expert Assistance
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Our Service &amp; Consultancy Fee
                  </h3>
                </div>
                <div className="p-8 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-700 font-semibold">Professional Support Fee</span>
                    <span className="text-xl font-bold text-brand-primary">
                      {formatUsd(VIETNAM_SERVICE_FEE_PER_PAX)}{' '}
                      <span className="text-sm font-normal text-gray-600">/ pax</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <span className="text-gray-700 font-semibold">Application Verification</span>
                    <span className="text-sm font-bold text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                      Included
                    </span>
                  </div>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        <strong>Recipient:</strong> Vietnam eVisa Assistance Team.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        <strong>Purpose:</strong> Thorough document review, error correction, and
                        formatting before e-visa portal submission.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        <strong>Peace of Mind:</strong> 24/7 expert human guidance and full service
                        fee refund guarantee if rejected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-brand-primary/5 border-t border-brand-primary/20 text-center">
                <button
                  onClick={() =>
                    document
                      .getElementById('fee-calculator')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full py-4 px-8 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg uppercase tracking-wide text-sm border-2 border-brand-primary"
                >
                  Calculate Exact Total Below
                </button>
              </div>
            </div>
          </div>

          {/* Guarantee Banner */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-primary border-2 border-white rounded-xl p-6 sm:p-8 text-center shadow-xl">
              <p className="text-white font-bold text-xl sm:text-2xl mb-2">
                Rejected? No worries—you get your service fee back. Guaranteed!
              </p>
              <p className="text-white/90 text-base">
                Want to know more?{' '}
                <Link
                  href="/refund-policy"
                  className="underline font-bold hover:text-white transition-colors"
                >
                  Read our full refund policy here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Calculator Section */}
      <section
        id="fee-calculator"
        className="relative w-full bg-white py-16 border-b-2 border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-brand-primary rounded-full border-2 border-white shadow-md">
                <CalculatorIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Fee calculator</h2>
            </div>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="visaType"
                    className="block text-sm font-bold text-gray-900 uppercase tracking-wide"
                  >
                    Visa type
                  </label>
                  <select
                    id="visaType"
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full rounded-lg border-2 border-brand-primary px-4 py-3 text-base text-gray-900 font-semibold focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  >
                    {visaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="passengers"
                    className="block text-sm font-bold text-gray-900 uppercase tracking-wide"
                  >
                    Passengers
                  </label>
                  <input
                    type="number"
                    id="passengers"
                    min="1"
                    max="15"
                    value={passengers === 0 ? '' : passengers}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setPassengers(0);
                      } else {
                        const num = parseInt(val);
                        setPassengers(Math.max(1, Math.min(15, num)));
                      }
                    }}
                    onBlur={(e) => {
                      if (e.target.value === '' || parseInt(e.target.value) < 1) {
                        setPassengers(1);
                      } else if (parseInt(e.target.value) > 15) {
                        setPassengers(15);
                      }
                    }}
                    className="w-full rounded-lg border-2 border-brand-primary px-4 py-3 text-base text-gray-900 font-semibold focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="processing"
                  className="block text-sm font-bold text-gray-900 uppercase tracking-wide"
                >
                  Processing speed
                </label>
                <select
                  id="processing"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as UrgencyValue)}
                  className="w-full rounded-lg border-2 border-brand-primary px-4 py-3 text-base text-gray-900 font-semibold focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary bg-white"
                >
                  <option value="">{VIETNAM_NORMAL_LABEL} — included</option>
                  <option value="urgent_48h">
                    {VIETNAM_URGENCY_URGENT_LABEL} — +{formatUsd(VIETNAM_URGENCY_FEE_URGENT)}/pax
                  </option>
                  <option value="super_urgent_24h">
                    {VIETNAM_URGENCY_SUPER_LABEL} — +{formatUsd(VIETNAM_URGENCY_FEE_SUPER_URGENT)}
                    /pax
                  </option>
                </select>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5 space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700 font-semibold">Government fee</span>
                  <span className="font-bold text-brand-primary">US$ {govFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700 font-semibold">Service fee</span>
                  <span className="font-bold text-brand-primary">US$ {serviceFee.toFixed(2)}</span>
                </div>
                {urgencyFee > 0 && (
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-700 font-semibold">
                      {urgency === 'urgent_48h'
                        ? VIETNAM_URGENCY_URGENT_LABEL
                        : VIETNAM_URGENCY_SUPER_LABEL}
                    </span>
                    <span className="font-bold text-brand-primary">
                      US$ {urgencyFee.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                  <span className="font-bold text-gray-900 text-lg">Total</span>
                  <span className="font-bold text-brand-primary text-2xl">
                    US$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href={applyHref}
                className="w-full px-8 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-all shadow-lg uppercase tracking-wide text-sm border-2 border-brand-primary flex items-center justify-center gap-2"
              >
                Apply with this total
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25M19 12H4.75"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Navigation & Related Services (Internal Linking) */}
      <section className="relative w-full bg-gray-50 py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Essential E-Visa Resources &amp; Guides
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Need faster processing, information on multiple entries, or exact turnaround times?
              Explore our specialized guides below.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Processing Time */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg hover:border-brand-primary transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-6">
                  <ClockIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Processing Time &amp; Schedule
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Curious about standard turnaround times before booking your flight? Review the
                  complete processing schedule from submission to approval.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/processing"
                  className="text-base font-bold text-brand-primary underline hover:text-brand-primary/80 block flex items-center gap-2"
                >
                  <span>check e-visa processing time</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: Urgent eVisa */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg hover:border-brand-primary transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-6">
                  <BoltIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Emergency &amp; Rush Applications
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Flight departing soon? Review our Urgent (3 days) and Super Urgent (1 day) options
                  before checkout so you can choose the tier that matches your arrival date.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/faq/24-hour-vietnam-evisa"
                  className="text-base font-bold text-brand-primary underline hover:text-brand-primary/80 block flex items-center gap-2"
                >
                  <span>compare urgent eVisa options</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3: Multiple Entry Guide */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg hover:border-brand-primary transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-6">
                  <ArrowPathIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple Entry Guidelines</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Planning to exit and re-enter Vietnam during your 90-day stay? Learn about
                  eligibility, requirements, and cost differences.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/blog/vietnam-evisa-multiple-entry-guide-2026"
                  className="text-base font-bold text-brand-primary underline hover:text-brand-primary/80 block flex items-center gap-2"
                >
                  <span>compare multiple-entry costs</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee FAQ — matches GSC fee/cost queries */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Vietnam Visa Fee FAQ</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">
              Quick answers for cost, single vs multiple entry, and refunds.
            </p>
          </div>
          <div className="space-y-4">
            {FEES_FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5 sm:p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href={applyHref}
              className="inline-flex items-center justify-center px-10 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg text-base"
            >
              Apply with these fees
            </Link>
            <RelatedResources excludePaths={['/fees']} />
          </div>
        </div>
      </section>

      {/* Service Disclaimer */}
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
              <h3 className="text-xl font-bold text-gray-900">Service Disclaimer</h3>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">vietnamemigration.com</strong> is operated by
                Vietnam eVisa Assistance Team, a private company providing professional visa
                application preparation and support services. We are{' '}
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

      <div className="relative w-full px-4 pb-28"></div>
      <EmergencyCTA
        variant="sticky"
        storageKey="fees-sticky-apply"
        headline="Ready to apply for your Vietnam eVisa?"
        subtext="Government fee + service fee shown before you pay. Optional rush tiers at checkout."
        buttonLabel="Start application"
        href={applyHref}
      />
      <SiteFooter />
    </main>
  );
}
