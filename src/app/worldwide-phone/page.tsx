'use client';

import Image from 'next/image';
import { useState } from 'react';
import SiteFooter from '@/components/layout/SiteFooter';

const US_PHONE = '+1 323 286 4541';

type RegionCountry = {
  country: string;
  flag: string;
  language?: string;
};

const asiaPacificCountries = [
  { country: 'Australia/New Zealand', flag: '🇦🇺', language: 'English' },
  { country: 'China', flag: '🇨🇳', language: 'English/Chinese' },
  { country: 'Hongkong', flag: '🇭🇰', language: 'English/Chinese' },
  { country: 'Taiwan', flag: '🇹🇼', language: 'English/Chinese' },
  { country: 'India', flag: '🇮🇳', language: 'English' },
  { country: 'Japan', flag: '🇯🇵', language: 'English' },
  { country: 'South Korea', flag: '🇰🇷', language: 'English' },
  { country: 'All other Asian countries', flag: '⚽', language: 'English' },
];

const emeaCountries = [
  { country: 'Russia', flag: '🇷🇺' },
  { country: 'United Kingdom', flag: '🇬🇧' },
  { country: 'Spain', flag: '🇪🇸' },
  { country: 'Italy', flag: '🇮🇹' },
  { country: 'France', flag: '🇫🇷' },
  { country: 'Germany', flag: '🇩🇪' },
  { country: 'Netherlands', flag: '🇳🇱' },
  { country: 'South Africa', flag: '🇿🇦' },
  { country: 'Switzerland', flag: '🇨🇭' },
  { country: 'All other European countries', flag: '⚽' },
];

const americasCountries = [
  { country: 'United States & Canada', flag: '🇺🇸', language: 'English' },
  { country: 'All other American countries', flag: '⚽', language: 'English' },
];

const REGIONS = [
  {
    key: 'asia',
    label: 'Asia Pacific',
    image: '/worldwide/asia-pacific.png',
    alt: 'Asia Pacific',
    countries: asiaPacificCountries,
    phone: US_PHONE,
    languageDefault: undefined,
  },
  {
    key: 'emea',
    label: 'EMEA (Europe, The Middle East and Africa)',
    image: '/worldwide/emea.png',
    alt: 'EMEA (Europe, The Middle East and Africa)',
    countries: emeaCountries,
    phone: US_PHONE, // Changed from UK_PHONE to US_PHONE (UK_PHONE hidden but not deleted)
    languageDefault: 'English',
  },
  {
    key: 'americas',
    label: 'Americas',
    image: '/worldwide/americas.png',
    alt: 'Americas',
    countries: americasCountries,
    phone: US_PHONE,
    languageDefault: undefined,
  },
];

function RegionCard({
  image,
  alt,
  label,
  active,
  onClick,
}: {
  image: string;
  alt: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-2xl overflow-hidden shadow-md border-2 transition-all duration-150 flex-1 min-w-[220px] max-w-[340px] bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${active ? 'border-orange-400 ring-2 ring-orange-400' : 'border-gray-200 hover:border-orange-300'}`}
      aria-pressed={active}
      tabIndex={0}
      onClick={onClick}
      type="button"
    >
      <div className="relative w-full h-48">
        <Image src={image} alt={alt} fill className="object-cover" />
      </div>
      <div
        className={`text-center py-3 text-lg font-semibold ${active ? 'text-orange-500' : 'text-gray-700'}`}
      >
        {label}
      </div>
    </button>
  );
}

function Table({
  countries,
  phone,
  languageDefault,
}: {
  countries: RegionCountry[];
  phone: string;
  languageDefault?: string;
}) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-xl overflow-hidden shadow text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Country</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Contact number</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Hours of Operation</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Days of Operation</th>
            <th className="px-4 py-2 text-left text-gray-900 font-bold">Language</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((row, i) => (
            <tr key={row.country} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-4 py-2 flex items-center gap-2 text-gray-900 font-medium">
                {row.flag} {row.country}
              </td>
              <td className="px-4 py-2 text-gray-900 font-medium">{phone}</td>
              <td className="px-4 py-2 text-gray-900">24/7/365</td>
              <td className="px-4 py-2 text-gray-900">24/7/365</td>
              <td className="px-4 py-2 text-gray-900">
                {row.language || languageDefault || 'English'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WorldwidePhonePage() {
  const [selected, setSelected] = useState('asia');
  const region = REGIONS.find((r) => r.key === selected) || REGIONS[0];

  return (
    <div className="bg-[#f7f9fb] min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-brand-ink mb-2">
          Our Worldwide Network
        </h2>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          After a decade of development, we have extended and set up a network in over the world to
          serve customers in the best way.
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">
          Worldwide Local Phone
        </h3>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          {REGIONS.map((r) => (
            <RegionCard
              key={r.key}
              image={r.image}
              alt={r.alt}
              label={r.label}
              active={selected === r.key}
              onClick={() => setSelected(r.key)}
            />
          ))}
        </div>
        <div className="mb-12">
          <Table
            countries={region.countries}
            phone={region.phone}
            languageDefault={region.languageDefault}
          />
        </div>
      </div>
      {/* Bottom NavBar */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
