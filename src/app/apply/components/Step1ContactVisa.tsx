'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { BellAlertIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { VisaType } from '@/types/visa';
import countryCallingCodes from '@/data/countryCallingCodes.json';
import {
  formatStandardWaitTime,
  getVisaMaxStayDays,
  parseRequiredDocuments,
} from '@/lib/vietnamVisa';
import {
  PROCESSING_OPTION_ORDER,
  FALLBACK_URGENCY_FEE_PER_PAX,
  clampUrgencyToAvailability,
  formatVietnamLocalTimeLine,
  getProcessingAvailabilityForArrival,
  getProcessingOptionSubtitle,
  getProcessingOptionTitle,
  getVietnamTodayDateString,
  isUrgencyAllowed,
  loadUrgencyFeesByValue,
  suggestUrgencyFromArrival,
} from '@/lib/urgency';
import type { UrgencyValue } from '@/types/index';

interface AccountData {
  id: string;
  email: string;
  fullName: string;
  areaCode: string;
  phoneNumber: string;
  gender: string;
}

interface ApplicationData {
  destinationId: string;
  visaTypeId: string;
  passengerCount: number;
  urgency?: UrgencyValue;
  stayingStart?: string;
  stayingEnd?: string;
  fullName: string;
  email: string;
  areaCode: string;
  phoneNumber: string;
  gender: string;
}

interface Step1ContactVisaProps {
  data: ApplicationData;
  visaTypes: VisaType[];
  onDataChange: (data: Partial<ApplicationData>) => void;
  onSubmit: (data: Partial<ApplicationData>) => void;
  isLoading: boolean;
}

const areaCodes = countryCallingCodes.map((entry) => ({
  code: `+${entry.callingCode}`,
  country: entry.name,
}));

const toDashAreaCode = (value: string) => {
  if (!value) return '';
  if (value.includes('-')) return value;
  const trimmed = value.trim();
  const spaceIndex = trimmed.indexOf(' ');
  if (spaceIndex === -1) return trimmed;
  return `${trimmed.slice(0, spaceIndex)}-${trimmed.slice(spaceIndex + 1).trim()}`;
};

const splitAreaCodeValue = (value: string) => {
  const dashValue = toDashAreaCode(value);
  const [code, ...countryParts] = dashValue.split('-');
  return {
    code: (code || '').trim(),
    country: countryParts.join('-').trim(),
  };
};

export default function Step1ContactVisa({
  data,
  visaTypes,
  onDataChange,
  onSubmit,
  isLoading,
}: Step1ContactVisaProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loggedInAccount, setLoggedInAccount] = useState<AccountData | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  /** When true, arrival date changes must not override the user's urgency choice. */
  const urgencyChosenManuallyRef = useRef(false);
  const [urgencyFees, setUrgencyFees] = useState(FALLBACK_URGENCY_FEE_PER_PAX);
  const [vietnamTimeLine, setVietnamTimeLine] = useState(() => formatVietnamLocalTimeLine());

  useEffect(() => {
    loadUrgencyFeesByValue().then(setUrgencyFees);
  }, []);

  useEffect(() => {
    setVietnamTimeLine(formatVietnamLocalTimeLine());
    const id = window.setInterval(() => setVietnamTimeLine(formatVietnamLocalTimeLine()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const processingAvailability = useMemo(
    () => getProcessingAvailabilityForArrival(data.stayingStart),
    [data.stayingStart]
  );

  const effectiveUrgency: UrgencyValue = useMemo(() => {
    if (processingAvailability.locked) {
      return processingAvailability.forcedUrgency ?? 'super_urgent_24h';
    }
    return data.urgency ?? '';
  }, [data.urgency, processingAvailability]);

  useEffect(() => {
    if (!data.stayingStart || !processingAvailability?.locked) return;
    const forced = processingAvailability.forcedUrgency ?? 'super_urgent_24h';
    if (data.urgency !== forced) {
      onDataChange({ urgency: forced });
    }
  }, [data.stayingStart, data.urgency, processingAvailability, onDataChange]);

  useEffect(() => {
    // This effect provides live validation for the date range as the user selects dates.
    if (data.stayingStart && data.stayingEnd && data.visaTypeId) {
      const arrivalDate = new Date(data.stayingStart);
      const departureDate = new Date(data.stayingEnd);
      let departureError = '';

      if (departureDate < arrivalDate) {
        departureError = 'Departure date cannot be before arrival date.';
      } else {
        const visa = visaTypes.find((v) => v.id === data.visaTypeId);
        if (visa) {
          const maxDays = getVisaMaxStayDays(visa.name);
          const day_in_ms = 1000 * 60 * 60 * 24;
          const dayDifference = Math.round(
            (departureDate.getTime() - arrivalDate.getTime()) / day_in_ms
          );

          if (dayDifference > maxDays) {
            departureError = `For this visa, your stay cannot exceed ${maxDays} days.`;
          }
        }
      }

      // Update the error state for immediate feedback
      if (departureError && errors.stayingEnd !== departureError) {
        setErrors((prev) => ({ ...prev, stayingEnd: departureError }));
      } else if (!departureError && errors.stayingEnd) {
        // Clear the error if the date range becomes valid
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.stayingEnd;
          return newErrors;
        });
      }
    }
  }, [data.stayingStart, data.stayingEnd, data.visaTypeId, visaTypes, errors.stayingEnd]);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthLoading(true);
      try {
        const authResponse = await fetch('/api/auth/me');
        if (authResponse.ok) {
          const { account } = await authResponse.json();
          if (account) {
            setLoggedInAccount(account);

            // If area code is in new format (e.g., "+1 United States"), create a unique value for the dropdown
            let areaCodeForDropdown = account.areaCode;
            let phoneNumberForInput = account.phoneNumber;

            if (account.areaCode && account.areaCode.includes(' ')) {
              // Create a unique value like "+1-United States" to avoid conflicts
              areaCodeForDropdown = account.areaCode.replace(' ', '-');
            }

            // If phone number already includes area code, extract just the number part
            if (account.phoneNumber && account.phoneNumber.startsWith('+')) {
              const codePart = account.areaCode.split(' ')[0];
              if (account.phoneNumber.startsWith(codePart)) {
                phoneNumberForInput = account.phoneNumber.substring(codePart.length);
              }
            }

            // Pre-fill form if logged in
            onDataChange({
              fullName: account.fullName,
              email: account.email,
              areaCode: areaCodeForDropdown,
              phoneNumber: phoneNumberForInput,
              gender: account.gender,
            });
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
      setIsAuthLoading(false);
    };

    checkAuth();
  }, [onDataChange]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.visaTypeId) newErrors.visaType = 'Please select a visa type';
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!data.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = 'Please enter a valid email address';
    if (!data.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    else if (!/^\d{7,15}$/.test(data.phoneNumber.replace(/\s/g, '')))
      newErrors.phoneNumber = 'Please enter a valid phone number (7-15 digits)';
    if (!data.gender) newErrors.gender = 'Please select your gender';
    if (!data.visaTypeId) {
      // urgency block only meaningful with a visa; visa error already set above
    } else if (!isUrgencyAllowed(data.urgency ?? '', processingAvailability)) {
      newErrors.urgency = 'Please select an available processing option';
    }

    // Date Validations
    if (!data.stayingStart) {
      newErrors.stayingStart = 'Arrival date is required';
    }
    if (!data.stayingEnd) {
      newErrors.stayingEnd = 'Departure date is required';
    }

    if (data.stayingStart && data.stayingEnd) {
      const arrivalDate = new Date(data.stayingStart);
      const departureDate = new Date(data.stayingEnd);
      const day_in_ms = 1000 * 60 * 60 * 24;

      if (departureDate < arrivalDate) {
        newErrors.stayingEnd = 'Departure date cannot be before arrival date';
      }

      const visa = visaTypes.find((v) => v.id === data.visaTypeId);
      const maxDays = visa ? getVisaMaxStayDays(visa.name) : 90;
      const dayDifference = (departureDate.getTime() - arrivalDate.getTime()) / day_in_ms;

      if (dayDifference > maxDays) {
        newErrors.stayingEnd = `Departure date cannot be more than ${maxDays} days after arrival for this visa type.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Parse the unique area code value before submitting
      const { code, country } = splitAreaCodeValue(data.areaCode);
      const formattedAreaCode = country ? `${code} ${country}` : code;
      const fullPhoneNumber = `${code}${data.phoneNumber}`;

      const formattedData = {
        ...data,
        areaCode: formattedAreaCode,
        phoneNumber: fullPhoneNumber,
      };

      onSubmit(formattedData);
    }
  };

  const handleChange = (field: keyof ApplicationData, value: unknown) => {
    onDataChange({ [field]: value });
  };

  const handleArrivalDateChange = (arrivalDate: string) => {
    const updates: Partial<ApplicationData> = { stayingStart: arrivalDate };

    if (!arrivalDate) {
      updates.urgency = '';
      urgencyChosenManuallyRef.current = false;
    } else {
      const availability = getProcessingAvailabilityForArrival(arrivalDate);
      if (availability.locked) {
        updates.urgency = availability.forcedUrgency ?? 'super_urgent_24h';
        urgencyChosenManuallyRef.current = false;
      } else if (!urgencyChosenManuallyRef.current) {
        updates.urgency = suggestUrgencyFromArrival(arrivalDate);
      } else {
        updates.urgency = clampUrgencyToAvailability(data.urgency, arrivalDate);
      }
    }

    onDataChange(updates);
  };

  const handleUrgencyChange = (urgency: UrgencyValue) => {
    if (processingAvailability.locked) return;
    if (!isUrgencyAllowed(urgency, processingAvailability)) return;

    urgencyChosenManuallyRef.current = true;
    onDataChange({ urgency });
  };

  const selectedVisa = visaTypes.find((vt) => vt.id === data.visaTypeId);
  const isReadOnly = !!loggedInAccount;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Step 1: Contact Information & Visa Selection
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Visa Selection Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Vietnam eVisa Selection</h3>

          {/* Visa Type Selection */}
          <div className="mb-4">
            <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-2">
              Select Your eVisa Type *
            </label>
            <select
              id="visaType"
              value={data.visaTypeId}
              onChange={(e) => handleChange('visaTypeId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${
                errors.visaType ? 'border-red-300' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Choose your Vietnam eVisa type</option>
              {visaTypes.map((visaType) => (
                <option key={visaType.id} value={visaType.id}>
                  {visaType.name} - ${visaType.fees}
                </option>
              ))}
            </select>
            {errors.visaType && <p className="mt-1 text-sm text-red-600">{errors.visaType}</p>}
            {selectedVisa && (
              <div className="mt-2 p-3 bg-brand-surface-alt rounded-md">
                <p className="text-sm text-brand-primary-dark">
                  <strong>Processing Time:</strong> {formatStandardWaitTime(selectedVisa.waitTime)}
                </p>
                <div className="text-sm text-brand-primary-dark mt-1">
                  <strong>Required Documents:</strong>
                  {(() => {
                    const docs = parseRequiredDocuments(selectedVisa.requiredDocuments);
                    if (docs.length === 0) return <span> —</span>;
                    return (
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {docs.map((doc, idx) => (
                          <li key={idx}>{doc}</li>
                        ))}
                      </ul>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Arrival and Departure Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
                Arrival Date *
              </label>
              <input
                type="date"
                id="arrivalDate"
                value={data.stayingStart}
                onChange={(e) => handleArrivalDateChange(e.target.value)}
                min={getVietnamTodayDateString()}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${
                  errors.stayingStart ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {errors.stayingStart && (
                <p className="mt-1 text-sm text-red-600">{errors.stayingStart}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="departureDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Departure Date *
              </label>
              <input
                type="date"
                id="departureDate"
                value={data.stayingEnd}
                onChange={(e) => handleChange('stayingEnd', e.target.value)}
                min={data.stayingStart}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${
                  errors.stayingEnd ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              />
              {errors.stayingEnd && (
                <p className="mt-1 text-sm text-red-600">{errors.stayingEnd}</p>
              )}
            </div>
          </div>

          {/* Number of Passengers */}
          <div className="mb-4">
            <label
              htmlFor="passengerCount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Passengers *
            </label>
            <select
              id="passengerCount"
              value={data.passengerCount}
              onChange={(e) => handleChange('passengerCount', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900"
              required
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>

          {/* Processing options — shown once visa type is selected */}
          {data.visaTypeId && (
            <div className="mb-4">
              <h4 className="text-base font-semibold text-brand-primary-dark mb-1">
                Processing Options *
              </h4>
              <p className="text-sm text-gray-500 mb-3">{vietnamTimeLine}</p>
              {!data.stayingStart && (
                <p className="text-sm text-gray-500 mb-2">
                  Select your arrival date above to see which rush options apply to your trip.
                </p>
              )}
              <div
                className="space-y-2"
                role="radiogroup"
                aria-required="true"
                aria-label="Processing options"
              >
                {PROCESSING_OPTION_ORDER.map((optionValue) => {
                  const enabled = isUrgencyAllowed(optionValue, processingAvailability);
                  const selected = enabled && effectiveUrgency === optionValue;
                  const isRush = optionValue !== '';
                  const Icon =
                    optionValue === ''
                      ? ClockIcon
                      : optionValue === 'urgent_48h'
                        ? BellAlertIcon
                        : RocketLaunchIcon;

                  return (
                    <label
                      key={optionValue || 'normal'}
                      className={`flex items-center justify-between gap-3 p-3 rounded-lg border transition-colors ${
                        enabled
                          ? selected
                            ? 'border-brand-primary bg-brand-surface-alt cursor-pointer'
                            : 'border-gray-200 bg-white hover:border-brand-border cursor-pointer'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <input
                          type="radio"
                          name="urgency"
                          value={optionValue}
                          checked={selected}
                          disabled={!enabled}
                          onChange={() => handleUrgencyChange(optionValue)}
                          className="sr-only"
                        />
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            selected ? 'text-brand-primary' : 'text-gray-500'
                          }`}
                          aria-hidden
                        />
                        <span
                          className={`text-sm font-medium ${
                            selected ? 'text-brand-primary-dark' : 'text-gray-800'
                          }`}
                        >
                          {getProcessingOptionTitle(optionValue)} –{' '}
                          {getProcessingOptionSubtitle(optionValue, selectedVisa?.waitTime)}
                        </span>
                      </span>
                      {isRush && enabled && (
                        <span className="text-sm font-semibold text-brand-primary-dark shrink-0">
                          +${urgencyFees[optionValue].toFixed(2)}
                          <span className="font-normal text-gray-600"> / pax</span>
                        </span>
                      )}
                      {isRush && !enabled && (
                        <span className="text-xs text-gray-400 shrink-0">Not available</span>
                      )}
                    </label>
                  );
                })}
              </div>
              {data.stayingStart && processingAvailability.locked && (
                <p className="mt-2 text-sm text-amber-700">
                  Your arrival date is very soon — Super Urgent processing is required.
                </p>
              )}
              {errors.urgency && <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>}
            </div>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 relative mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>

          {isAuthLoading ? (
            <p className="text-sm text-gray-500">Loading your details...</p>
          ) : (
            !isReadOnly && (
              <div className="text-sm text-gray-600 bg-brand-surface-alt p-2 rounded-md mb-4">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-primary font-semibold hover:underline">
                  Log in
                </Link>{' '}
                for faster checkout and to track your application online.
              </div>
            )
          )}

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              readOnly={isReadOnly}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${
                errors.fullName ? 'border-red-300' : 'border-gray-300'
              } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter your full name"
              required
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              readOnly={isReadOnly}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="Enter your email address"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            {!isReadOnly && (
              <p className="mt-1 text-sm text-gray-500">
                We&apos;ll use this to create your account and send application updates.
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={toDashAreaCode(data.areaCode)}
                onChange={(e) => handleChange('areaCode', e.target.value)}
                disabled={isReadOnly}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              >
                {areaCodes.map((code) => (
                  <option
                    key={`${code.code}-${code.country}`}
                    value={`${code.code}-${code.country}`}
                  >
                    {code.code} ({code.country})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phoneNumber"
                value={data.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                readOnly={isReadOnly}
                className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${
                  errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                } ${isReadOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                placeholder="Enter your phone number"
                required
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
            <div className="flex gap-4">
              {['male', 'female'].map((g) => (
                <label className="flex items-center" key={g}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={data.gender === g}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    disabled={isReadOnly}
                    className={`mr-2 ${isReadOnly ? 'cursor-not-allowed' : ''}`}
                    required
                  />
                  <span className="text-sm text-gray-700 capitalize">{g}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading || isAuthLoading}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-transform duration-200 ${
              isLoading || isAuthLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transform hover:scale-105'
            }`}
          >
            {isLoading ? 'Processing...' : 'Save & Continue'}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-brand-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-brand-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
