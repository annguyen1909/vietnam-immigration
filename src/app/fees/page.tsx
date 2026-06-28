'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';
import { CurrencyDollarIcon, ShieldCheckIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import type { VietnamVisaTypeView } from '@/lib/vietnamVisa';
import {
  VIETNAM_SERVICE_FEE_PER_PAX,
  VIETNAM_URGENCY_FEE_SUPER_URGENT,
  VIETNAM_URGENCY_FEE_URGENT,
  VIETNAM_URGENCY_SUPER_LABEL,
  VIETNAM_URGENCY_URGENT_LABEL,
  VIETNAM_VISA_PRODUCTS,
  formatUsd,
  getVietnamFeesHeroSubtitle,
  VIETNAM_GOV_FEE_SUMMARY,
} from '@/lib/vietnamPricing';
import { deriveApplyQueryFromVisaId } from '@/lib/vietnamVisa';

type VisaOption = { value: string; label: string; govFee: number };

const FALLBACK_VISA_OPTIONS: VisaOption[] = VIETNAM_VISA_PRODUCTS.map((p) => ({
  value: deriveApplyQueryFromVisaId(p.id),
  label: p.label,
  govFee: p.govFee,
}));

export default function FeesPage() {
  const SERVICE_FEE = VIETNAM_SERVICE_FEE_PER_PAX;
  const [visaTypes, setVisaTypes] = useState<VietnamVisaTypeView[]>([]);
  const [visaOptions, setVisaOptions] = useState<VisaOption[]>(FALLBACK_VISA_OPTIONS);
  const [visaType, setVisaType] = useState(FALLBACK_VISA_OPTIONS[0]?.value ?? '');
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/destinations/vietnam/visa-types');
        if (!res.ok) return;
        const data: VietnamVisaTypeView[] = await res.json();
        setVisaTypes(data);
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
  const total = govFee + serviceFee;

  return (
    <main className={`relative min-h-screen w-full bg-brand-surface text-brand-ink`}>
      {/* Official Header Banner */}
      <div className="brand-banner">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span className="text-white text-sm font-semibold uppercase tracking-wider">
              Assisted eVisa Service
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
                Pricing & Fees
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Vietnam
              <span className="block text-brand-primary">eVisa Pricing & Fees</span>
            </h1>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {getVietnamFeesHeroSubtitle()}
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border-4 border-brand-primary shadow-2xl">
              <Image
                src="/img/vietnam-hero.jpg"
                alt="Vietnam eVisa pricing and majestic scenery"
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

      {/* Pricing Breakdown Section */}
      <section className="relative w-full bg-white py-16 md:py-24 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              One Transparent Package, Zero Hidden Fees
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine mandatory government fees with our full-service professional assistance
              into one seamless, stress-free package. No complicated math, no surprises.
            </p>
          </div>

          {/* All-in-One Package Card */}
          <div className="max-w-5xl mx-auto bg-white border-4 border-brand-primary rounded-2xl shadow-2xl overflow-hidden mb-12">
            <div className="grid lg:grid-cols-12">
              {/* Left Column: Details & Benefits */}
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <ShieldCheckIcon className="w-8 h-8 text-brand-primary flex-shrink-0" />
                    <span>What&apos;s Included in Your Package</span>
                  </h3>

                  {/* Two Main Fees */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-brand-primary transition-all shadow-sm">
                      <CurrencyDollarIcon className="w-8 h-8 text-brand-primary flex-shrink-0 mt-1" />
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h4 className="text-lg font-bold text-gray-900">Government Fee</h4>
                          <span className="text-sm font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                            {VIETNAM_GOV_FEE_SUMMARY}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          Mandatory e-Visa fee paid directly to the Vietnam Government. Varies by
                          single or multiple entry visa types.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-brand-primary transition-all shadow-sm">
                      <ShieldCheckIcon className="w-8 h-8 text-brand-primary flex-shrink-0 mt-1" />
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h4 className="text-lg font-bold text-gray-900">
                            Professional Service Fee
                          </h4>
                          <span className="text-sm font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                            Flat {formatUsd(SERVICE_FEE)} / pax
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          Covers complete expert review, documentation verification, priority
                          submission, and 24/7 human guidance.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Service Guarantees List */}
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-4">
                      Why Travelers Choose Our Assisted Service
                    </h4>
                    <ul className="space-y-3.5 text-sm text-gray-700 font-medium">
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-brand-primary flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          <strong>100% Application Verification</strong> before official submission
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-brand-primary flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          <strong>24/7 Live Human Help</strong> with instant WhatsApp &amp; Email
                          support
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-brand-primary flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          <strong>Flexible Delivery Options:</strong> Regular, Urgent (3 days) &amp;
                          Super Urgent (1 day)
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-brand-primary flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          <strong>Risk-Free Guarantee:</strong> Full service fee refund if rejected
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA & Trigger */}
              <div className="lg:col-span-5 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 p-8 sm:p-12 flex flex-col justify-center items-center text-center shadow-inner">
                <div className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary font-bold rounded-full mb-6 text-xs uppercase tracking-wider border border-brand-primary/20 shadow-sm">
                  Quick &amp; Easy Process
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                  Ready to check your exact total?
                </h3>
                <p className="text-gray-600 text-base mb-8 leading-relaxed">
                  Select your specific visa type and passenger count below to see your instant,
                  precise calculation before applying.
                </p>
                <button
                  onClick={() =>
                    document
                      .getElementById('fee-calculator')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="w-full py-4 px-8 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-xl hover:shadow-2xl uppercase tracking-wide text-sm border-2 border-brand-primary flex items-center justify-center gap-2 group"
                >
                  <span>Calculate &amp; Apply Now</span>
                  <svg
                    className="w-5 h-5 text-white transform group-hover:translate-y-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
                <p className="text-xs text-gray-500 mt-4 italic">
                  *No initial payment required to calculate your fees.
                </p>
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

      {/* Visa Types & Government Fees Section */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
              <span className="text-sm font-bold text-white uppercase tracking-wide">
                Visa Types
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Vietnam eVisa government fees
            </h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Official government fees for each Vietnam eVisa type. These mandatory charges are
              collected as part of your application on this site.
            </p>
          </div>

          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl">
            <div className="space-y-6">
              {visaTypes.map((visa) => (
                <div
                  key={visa.id}
                  className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-brand-primary transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary mb-1">
                        {visa.category}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{visa.name}</h3>
                      <p className="text-gray-700 text-sm">
                        {visa.entry} for up to {visa.durationDays} days.
                        {visa.category === 'Tourist'
                          ? ' For tourism, family visits, or leisure.'
                          : ' For business meetings, conferences, and commercial visits.'}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-1">Government Fee</p>
                        <p className="text-2xl font-bold text-brand-primary">US$ {visa.govFee}</p>
                      </div>
                      <Link
                        href={`/apply?type=${visa.applyQuery}`}
                        className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary-dark transition-all shadow-md uppercase tracking-wide text-sm border-2 border-brand-primary whitespace-nowrap"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-full mb-4 border-4 border-white shadow-lg">
                <CalculatorIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Fee calculator</h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Estimate government + service fees. Select visa type and passengers (up to 15).
                Urgent processing is added on the apply form when you choose it.
              </p>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 text-sm leading-relaxed text-center">
                Service fee: ${SERVICE_FEE.toFixed(2)} per passenger. Optional{' '}
                {VIETNAM_URGENCY_URGENT_LABEL} (${VIETNAM_URGENCY_FEE_URGENT.toFixed(2)}/pax) or{' '}
                {VIETNAM_URGENCY_SUPER_LABEL} (${VIETNAM_URGENCY_FEE_SUPER_URGENT.toFixed(2)}/pax)
                appears at checkout when selected—confirm your full total before paying.
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="visaType"
                  className="block text-base font-bold text-gray-900 uppercase tracking-wide"
                >
                  Visa Type
                </label>
                <select
                  id="visaType"
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                  className="w-full rounded-lg border-4 border-brand-primary px-6 py-4 text-lg text-gray-900 font-semibold 
                             focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary bg-white shadow-md
                             transition-all duration-200 hover:border-brand-primary"
                >
                  {visaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="passengers"
                  className="block text-base font-bold text-gray-900 uppercase tracking-wide"
                >
                  Number of Passengers
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
                  className="w-full rounded-lg border-4 border-brand-primary px-6 py-4 text-lg text-gray-900 font-semibold 
                             focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary bg-white shadow-md
                             transition-all duration-200 hover:border-brand-primary"
                />
              </div>

              {/* Fee Breakdown */}
              <div className="bg-white border-4 border-brand-primary rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-900 text-lg mb-4 text-center uppercase tracking-wide">
                  Fee Breakdown
                </h3>
                <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                  <span className="text-gray-700 font-semibold">Government Fee:</span>
                  <span className="font-bold text-brand-primary text-lg">
                    US$ {govFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                  <span className="text-gray-700 font-semibold">Service Fee:</span>
                  <span className="font-bold text-brand-primary text-lg">
                    US$ {serviceFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 bg-brand-primary -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                  <span className="font-bold text-white text-lg uppercase tracking-wide">
                    Total Amount:
                  </span>
                  <span className="font-bold text-white text-2xl">US$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href={`/apply?type=${visaType}&passengers=${passengers}`}
                className="w-full px-10 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-base border-2 border-brand-primary flex items-center justify-center gap-2"
              >
                Apply Now
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

      <div className="relative w-full px-4 pb-10"></div>
      <SiteFooter />
    </main>
  );
}
