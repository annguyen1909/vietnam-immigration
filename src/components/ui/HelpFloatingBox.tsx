'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SUPPORT_EMAIL } from '@/components/seo/constants';
import { VIETNAM_PROCESSING_TIME } from '@/lib/vietnamPricing';

const US_PHONE = '+1 323 286 4541';
// const UK_PHONE = '+44 5555 000000'; // Hidden but not deleted
const EMAIL = SUPPORT_EMAIL;

export default function HelpFloatingBox({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false);

  // Lightbulb icon SVG
  const lightbulbIcon = (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <path
        d="M16 29v-2.5M12 29h8"
        stroke="var(--brand-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 25c-3.5 0-6-2.5-6-6 0-2.5 2-5 6-5s6 2.5 6 5c0 3.5-2.5 6-6 6Z"
        stroke="var(--brand-primary)"
        strokeWidth="2"
      />
      <path
        d="M16 3v2M5.5 7l1.5 1.5M3 16h2M7 26.5l1.5-1.5M29 16h-2M24.5 7l-1.5 1.5M25 26.5l-1.5-1.5"
        stroke="var(--brand-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // Mobile floating button (sticky, top right)
  const floatingButton = (
    <div className="sticky top-4 w-full z-50 mt-6">
      <div className="flex justify-end w-full">
        <button
          aria-label="Open help menu"
          className="flex items-center gap-2 bg-white text-brand-accent rounded-full shadow-lg px-4 py-2 font-bold border-2 border-brand-accent hover:scale-105 transition text-base md:text-lg"
          onClick={() => setOpen(true)}
          style={{ minWidth: 120 }}
        >
          <span className="text-2xl">{lightbulbIcon}</span>
          <span className="font-semibold whitespace-nowrap">Help 24/7</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always show box, not closable, top right */}
      <div className={`hidden md:block ${className} z-40`}>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 w-full max-w-[340px] min-h-[520px] flex flex-col gap-2 items-center overflow-visible">
          {/* Header */}
          <div className="flex flex-col items-center gap-1 w-full mt-2">
            <span className="text-[var(--brand-primary)] text-3xl mb-1">{lightbulbIcon}</span>
            <span className="text-[var(--brand-primary-dark)] font-extrabold text-xl tracking-wide text-center">
              EXPERTS AVAILABLE 24/7
            </span>
          </div>
          {/* Email */}
          <div className="flex items-center gap-2 w-full justify-center mt-1">
            <span className="text-2xl text-gray-500">
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                <rect width="28" height="28" rx="6" fill="#e0e0e0" />
                <path
                  d="M7 10l7 5 7-5"
                  stroke="#757575"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="7" y="9" width="14" height="10" rx="2" stroke="#757575" strokeWidth="2" />
              </svg>
            </span>
            <a
              href={`mailto:${EMAIL}`}
              className="text-[var(--brand-primary-dark)] font-semibold text-base break-all"
            >
              {EMAIL}
            </a>
          </div>
          {/* Divider */}
          <div className="w-full border-t border-gray-200 my-2" />
          {/* Phone numbers */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2 text-[#222]">
              <span className="text-xl">🇺🇸</span>
              <span className="font-medium">United States</span>
              <span className="ml-auto font-semibold tracking-wide">{US_PHONE}</span>
            </div>
            {/* UK phone number hidden but not deleted */}
            {/* <div className="flex items-center gap-2 text-[#222]">
              <span className="text-xl">🇬🇧</span>
              <span className="font-medium">United Kingdom</span>
              <span className="ml-auto font-semibold tracking-wide">{UK_PHONE}</span>
            </div> */}
          </div>
          {/* Worldwide phone support link */}
          <Link
            href="/worldwide-phone"
            className="text-[var(--brand-primary-dark)] underline font-medium text-base mt-2 mb-1 text-center w-full"
          >
            Worldwide phone support
          </Link>
          {/* APPLY WITH CONFIDENCE box */}
          <div className="bg-white rounded-xl shadow border border-gray-200 p-4 w-full mt-2 flex flex-col gap-2">
            <div className="text-[var(--brand-primary-dark)] font-extrabold text-lg mb-2">
              APPLY WITH CONFIDENCE
            </div>
            <div className="flex items-start gap-2 text-black text-base">
              <span className="mt-1 text-green-600">✔️</span>Fast, secure, and reliable visa
              processing
            </div>
            <div className="flex items-start gap-2 text-black text-base">
              <span className="mt-1 text-green-600">✔️</span>Safe online payment—no hidden fees
            </div>
            <div className="flex items-start gap-2 text-black text-base">
              <span className="mt-1 text-green-600">✔️</span>Most visas approved within{' '}
              {VIETNAM_PROCESSING_TIME}
            </div>
            <div className="flex items-start gap-2 text-black text-base">
              <span className="mt-1 text-green-600">✔️</span>Optional Urgent (3 days) / Super Urgent (1 day)
              processing—fees shown before you pay
            </div>
            <div className="flex items-start gap-2 text-black text-base">
              <span className="mt-1 text-green-600">✔️</span>Transparent pricing, no surprises
            </div>
            <div className="flex items-start gap-2 text-black text-base font-semibold">
              <span className="mt-1 text-green-600">✔️</span>100% Service Fees Returned if Rejected
            </div>
          </div>
        </div>
      </div>
      {/* Mobile: sticky button at top right, modal always visible */}
      <div className="md:hidden w-full">
        {!open && floatingButton}
        {open && (
          <div
            className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center pt-8 px-2"
            onClick={() => setOpen(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl w-full max-w-[380px] p-3 pt-6 flex flex-col gap-2 relative items-center max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                aria-label="Close help menu"
                className="absolute top-2 right-2 text-gray-400 hover:text-[var(--brand-primary-dark)] text-xl font-bold p-1 rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary-dark)]"
                onClick={() => setOpen(false)}
                tabIndex={0}
              >
                ×
              </button>
              {/* Header */}
              <div className="flex flex-col items-center gap-1 w-full mt-2">
                <span className="text-[var(--brand-primary)] text-3xl mb-1">{lightbulbIcon}</span>
                <span className="text-[var(--brand-primary-dark)] font-extrabold text-xl tracking-wide text-center">
                  EXPERTS AVAILABLE 24/7
                </span>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2 w-full justify-center mt-1">
                <span className="text-2xl text-gray-500">
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <rect width="28" height="28" rx="6" fill="#e0e0e0" />
                    <path
                      d="M7 10l7 5 7-5"
                      stroke="#757575"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="7"
                      y="9"
                      width="14"
                      height="10"
                      rx="2"
                      stroke="#757575"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[var(--brand-primary-dark)] font-semibold text-base break-all"
                >
                  {EMAIL}
                </a>
              </div>
              {/* Divider */}
              <div className="w-full border-t border-gray-200 my-2" />
              {/* Phone numbers */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 text-[#222]">
                  <span className="text-xl">🇺🇸</span>
                  <span className="font-medium">United States</span>
                  <span className="ml-auto font-semibold tracking-wide">{US_PHONE}</span>
                </div>
                {/* UK phone number hidden but not deleted */}
                {/* <div className="flex items-center gap-2 text-[#222]">
                  <span className="text-xl">🇬🇧</span>
                  <span className="font-medium">United Kingdom</span>
                  <span className="ml-auto font-semibold tracking-wide">{UK_PHONE}</span>
                </div> */}
              </div>
              {/* Worldwide phone support link */}
              <Link
                href="/worldwide-phone"
                className="text-[var(--brand-primary-dark)] underline font-medium text-base mt-2 mb-1 text-center w-full"
              >
                Worldwide phone support
              </Link>
              {/* APPLY WITH CONFIDENCE box */}
              <div className="bg-white rounded-xl shadow border border-gray-200 p-4 w-full mt-2 flex flex-col gap-2">
                <div className="text-[var(--brand-primary-dark)] font-extrabold text-lg mb-2">
                  APPLY WITH CONFIDENCE
                </div>
                <div className="flex items-start gap-2 text-black text-base">
                  <span className="mt-1 text-green-600">✔️</span>Fast, secure, and reliable visa
                  processing
                </div>
                <div className="flex items-start gap-2 text-black text-base">
                  <span className="mt-1 text-green-600">✔️</span>Safe online payment—no hidden fees
                </div>
                <div className="flex items-start gap-2 text-black text-base">
                  <span className="mt-1 text-green-600">✔️</span>Most visas approved within 3
                  working days
                </div>
                <div className="flex items-start gap-2 text-black text-base">
                  <span className="mt-1 text-green-600">✔️</span>Optional Urgent (3 days) / Super Urgent (1 day)
                  processing—fees shown before you pay
                </div>
                <div className="flex items-start gap-2 text-black text-base">
                  <span className="mt-1 text-green-600">✔️</span>Transparent pricing, no surprises
                </div>
                <div className="flex items-start gap-2 text-black text-base font-semibold">
                  <span className="mt-1 text-green-600">✔️</span>100% Service Fees Returned if
                  Rejected
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
