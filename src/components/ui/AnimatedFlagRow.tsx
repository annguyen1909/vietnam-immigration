'use client';

import Image from 'next/image';
import Link from 'next/link';

const FLAG_LABELS = [
  { name: 'Vietnam', code: 'vn' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'Germany', code: 'de' },
  { name: 'UAE', code: 'ae' },
  { name: 'Australia', code: 'au' },
  { name: 'United States', code: 'us' },
  { name: 'India', code: 'in' },
  { name: 'Switzerland', code: 'ch' },
  { name: 'France', code: 'fr' },
  { name: 'Canada', code: 'ca' },
  { name: 'Netherlands', code: 'nl' },
  { name: 'Belgium', code: 'be' },
  { name: 'Austria', code: 'at' },
];

export default function AnimatedFlagRow() {
  // Duplicate the list for seamless looping
  const labels = [...FLAG_LABELS, ...FLAG_LABELS];
  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col gap-4">
      {/* First Row: Left to Right */}
      <div className="relative h-14 overflow-hidden">
        {/* Gradient overlays */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
          style={{ background: 'linear-gradient(to right, #1A2E2A 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
          style={{ background: 'linear-gradient(to left, #104471 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="animate-marquee flex gap-4 min-w-max">
            {labels.map((country, idx) => (
              <div
                key={country.code + idx + 'row1'}
                className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow text-brand-ink font-semibold text-base sm:text-lg min-w-[120px] h-10 sm:h-12 transition-all duration-500 border-2 border-[#1877b7]"
                style={{ height: '2.5rem' }}
              >
                <Image
                  src={`https://flagcdn.com/${country.code}.svg`}
                  alt={country.name + ' flag'}
                  className="w-7 h-5 rounded shadow object-cover"
                  loading="lazy"
                  style={{ minWidth: 28, minHeight: 20 }}
                  width={40}
                  height={24}
                />
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Second Row: Right to Left */}
      <div className="relative h-14 overflow-hidden">
        {/* Gradient overlays */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
          style={{ background: 'linear-gradient(to right, #1A2E2A 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
          style={{ background: 'linear-gradient(to left, #104471 0%, transparent 100%)' }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="animate-marquee-reverse flex gap-4 min-w-max">
            {labels.map((country, idx) => (
              <div
                key={country.code + idx + 'row2'}
                className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow text-brand-ink font-semibold text-base sm:text-lg min-w-[120px] h-10 sm:h-12 transition-all duration-500 border-2 border-[#1877b7]"
                style={{ height: '2.5rem' }}
              >
                <Image
                  src={`https://flagcdn.com/${country.code}.svg`}
                  alt={country.name + ' flag'}
                  className="w-7 h-5 rounded shadow object-cover"
                  loading="lazy"
                  style={{ minWidth: 28, minHeight: 20 }}
                  width={40}
                  height={24}
                />
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Check Requirement Button */}
      <div className="flex justify-center mt-2">
        <Link
          href="/check-requirement"
          className="px-6 py-3 rounded-xl font-bold text-brand-ink text-lg shadow-md bg-brand-accent hover:scale-105 hover:shadow-xl transition-all"
        >
          Check Requirement
        </Link>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee {
          animation: marquee 24s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 24s linear infinite;
        }
      `}</style>
    </div>
  );
}
