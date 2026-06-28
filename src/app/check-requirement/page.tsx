'use client';
import Image from 'next/image';
import SiteFooter from '@/components/layout/SiteFooter';
import { countries } from '@/data/countries';
import CountryListAll from '@/components/ui/CountryListAll';
import { countryNameToSlug } from '@/lib/countrySlug';
import { useRouter } from 'next/navigation';
import React from 'react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export default function CheckRequirementPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = React.useState('');

  return (
    <main className={`relative min-h-screen w-full bg-brand-surface text-brand-ink`}>
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Visa Requirements', href: '/check-requirement' },
        ]}
      />
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
                Visa Requirements
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Check Your Vietnam
              <span className="block text-brand-primary">eVisa Requirements</span>
            </h1>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Find out your visa requirements instantly. Select your country of citizenship to check
              eligibility and get detailed information about Vietnam eVisa requirements.
            </p>
          </div>

          {/* Hero Image */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden border-4 border-brand-primary shadow-2xl">
              <Image
                src="/img/checkrequ.png"
                alt="Vietnam visa requirements"
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

      {/* Eligibility Checker Section */}
      <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 md:p-12 shadow-2xl">
            {/* Card Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary rounded-full mb-4 border-4 border-white shadow-lg">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Eligibility checker
              </h2>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional visa requirement verification service
              </p>
            </div>

            {/* Card Content */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 text-base leading-relaxed text-center">
                Select your country of citizenship to instantly check your eligibility for an
                Vietnam eVisa. We&apos;ll provide you with detailed requirements and guide you
                through the official application process.
              </p>
            </div>

            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (!selectedCountry) return;
                const countryObj = countries.find((c) => c.code === selectedCountry);
                if (!countryObj) return;
                const slug = countryNameToSlug(countryObj.name);
                router.push(`/check-requirement/${slug}`);
              }}
            >
              <div className="space-y-3">
                <label
                  htmlFor="country"
                  className="block text-base font-bold text-gray-900 uppercase tracking-wide"
                >
                  Country of Citizenship
                </label>
                <select
                  id="country"
                  className="w-full rounded-lg border-4 border-brand-primary px-6 py-4 text-lg text-gray-900 font-semibold 
                             focus:ring-4 focus:ring-brand-primary/20 focus:border-brand-primary bg-white shadow-md
                             transition-all duration-200 hover:border-brand-primary"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full px-10 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-base border-2 border-brand-primary flex items-center justify-center gap-3"
              >
                <span>Check Requirements</span>
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
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Country List Section */}
      <section className="relative w-full bg-gradient-to-br from-gray-50 to-white py-16 border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
              <span className="text-sm font-bold text-white uppercase tracking-wide">
                All Countries
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Browse by Country</h2>
            <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your country to view detailed Vietnam eVisa requirements
            </p>
          </div>
          <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl">
            <CountryListAll />
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
