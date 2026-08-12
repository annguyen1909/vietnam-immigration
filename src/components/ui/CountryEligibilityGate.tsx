'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isNationalityCodeAllowed } from '@/lib/nationalityEligibility';
import type { VisaType } from '@/types/index';

type CountryEligibilityGateProps = {
  countryCode: string | null;
  countryName: string;
};

type EligibilityStatus = 'checking' | 'eligible' | 'ineligible' | 'unavailable';

export default function CountryEligibilityGate({
  countryCode,
  countryName,
}: CountryEligibilityGateProps) {
  const [status, setStatus] = useState<EligibilityStatus>('checking');

  useEffect(() => {
    if (!countryCode) {
      setStatus('ineligible');
      return;
    }

    const verifyEligibility = async () => {
      try {
        const response = await fetch('/api/destinations/vietnam/visa-types');
        if (!response.ok) throw new Error('Eligibility data is unavailable');

        const visaTypes = (await response.json()) as VisaType[];
        const eligible = visaTypes.some((visaType) =>
          isNationalityCodeAllowed(visaType.allowedNationalities, countryCode)
        );
        setStatus(eligible ? 'eligible' : 'ineligible');
      } catch {
        setStatus('unavailable');
      }
    };

    verifyEligibility();
  }, [countryCode]);

  if (status === 'eligible') return null;

  const unavailable = status === 'unavailable';
  const checking = status === 'checking';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-brand-surface px-4 py-20 text-brand-ink">
      <div className="mx-auto max-w-2xl rounded-xl border-2 border-brand-border bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold">
          {checking
            ? 'Checking eVisa eligibility…'
            : unavailable
              ? 'Eligibility check unavailable'
              : `Vietnam eVisa is not available for ${countryName}`}
        </h1>
        {!checking && (
          <p className="mt-4 text-lg leading-relaxed text-brand-muted">
            {unavailable
              ? 'We could not safely verify the current nationality rules. No application or payment can be started from this page.'
              : 'This nationality is not included in the eVisa products currently supported by our application system. Please do not submit payment for an eVisa.'}
          </p>
        )}
        {!checking && (
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/check-requirement" className="btn-primary">
              Check another nationality
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact support
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
