'use client';

import { useState, useMemo, useEffect } from 'react';
import { ApplicationData, VisaType, Passenger } from '@/types/index';
import { countries } from '@/data/countries';

interface Step2PassengersProps {
  data: ApplicationData;
  visaType: VisaType | null;
  onSubmit: (data: { passengers: Passenger[] }) => void;
  isLoading: boolean;
  onBack: () => void;
  onPassengersChange?: (passengers: Passenger[]) => void;
}

interface AddOn {
  id: string;
  type: string;
  name: string;
  pricePerPax: number;
  isActive: boolean;
}

const calculateAge = (dateOfBirth: string): number | null => {
  if (!dateOfBirth) return null;
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const isUnder50 = (dateOfBirth: string): boolean => {
  const age = calculateAge(dateOfBirth);
  return age !== null && age < 50;
};

const initializePassengers = (count: number, passengerIds?: string[]): Passenger[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: passengerIds?.[index] || '',
    fullName: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    gender: '',
  }));
};

export default function Step2Passengers({
  data,
  visaType,
  onSubmit,
  isLoading,
  onBack,
  onPassengersChange,
}: Step2PassengersProps) {
  const [passengers, setPassengers] = useState(() =>
    initializePassengers(data.passengerCount, data.passengerIds)
  );
  const [errors, setErrors] = useState<Record<string, string>[]>(() =>
    Array.from({ length: data.passengerCount }, () => ({}))
  );
  const [travelInsurance, setTravelInsurance] = useState<AddOn | null>(null);

  // Fetch travel insurance add-on
  useEffect(() => {
    const fetchTravelInsurance = async () => {
      try {
        const response = await fetch(
          '/api/add-ons?type=insurance&name=Travel Insurance - 30 days to Vietnam'
        );
        if (response.ok) {
          const data = await response.json();
          const insurance = data.addOns?.find(
            (addon: AddOn) =>
              addon.type === 'insurance' &&
              addon.name === 'Travel Insurance - 30 days to Vietnam' &&
              addon.isActive
          );
          setTravelInsurance(insurance || null);
        }
      } catch (error) {
        console.error('Error fetching travel insurance:', error);
      }
    };

    fetchTravelInsurance();
  }, []);

  const stripInsuranceFromPassengers = (list: Passenger[]): Passenger[] =>
    list.map((p) => ({
      ...p,
      addOns: p.addOns?.filter((a) => a.type !== 'insurance'),
    }));

  // Check if all passengers have required info filled
  const allPassengersFilled = useMemo(() => {
    return passengers.every(
      (p) =>
        p.fullName.trim() && p.nationality && p.passportNumber.trim() && p.dateOfBirth && p.gender
    );
  }, [passengers]);

  // Insurance only when every passenger is strictly under 50 (one person 50+ hides the section)
  const allUnder50 = useMemo(() => {
    if (!allPassengersFilled) return false;
    return passengers.every((p) => isUnder50(p.dateOfBirth));
  }, [passengers, allPassengersFilled]);

  const allowedNationalities = useMemo(() => {
    if (!visaType) {
      return [];
    }
    if (visaType.allowedNationalities === null) {
      return countries;
    }
    if (Array.isArray(visaType.allowedNationalities)) {
      if (visaType.allowedNationalities.length === 0) {
        return [];
      }
      const allowedCodes = (visaType.allowedNationalities as string[]).map((code) =>
        code.toUpperCase()
      );
      return countries.filter((c) => allowedCodes.includes(c.code.toUpperCase()));
    }
    return [];
  }, [visaType]);

  const handleChange = (index: number, field: string, value: string) => {
    let updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };

    if (field === 'dateOfBirth') {
      const filled = updatedPassengers.every(
        (p) =>
          p.fullName.trim() && p.nationality && p.passportNumber.trim() && p.dateOfBirth && p.gender
      );
      const everyoneUnder50 = filled && updatedPassengers.every((p) => isUnder50(p.dateOfBirth));
      if (!everyoneUnder50) {
        updatedPassengers = stripInsuranceFromPassengers(updatedPassengers);
      }
    }

    setPassengers(updatedPassengers);
    if (onPassengersChange) {
      onPassengersChange(updatedPassengers);
    }
  };

  // Handle insurance toggle
  const handleInsuranceToggle = (index: number, checked: boolean) => {
    const updatedPassengers = [...passengers];
    if (checked && travelInsurance) {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        addOns: [
          {
            addOnId: travelInsurance.id,
            addOnName: travelInsurance.name,
            type: travelInsurance.type,
            pricePerPax: travelInsurance.pricePerPax,
          },
        ],
      };
    } else {
      updatedPassengers[index] = {
        ...updatedPassengers[index],
        addOns: undefined,
      };
    }
    setPassengers(updatedPassengers);
    // Notify parent of changes for LivePriceBox
    if (onPassengersChange) {
      onPassengersChange(updatedPassengers);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string>[] = [];
    let isValid = true;

    passengers.forEach((p, index) => {
      const passengerErrors: Record<string, string> = {};
      if (!p.id) passengerErrors.id = 'Passenger ID is missing. Please refresh and try again.';
      if (!p.fullName.trim()) passengerErrors.fullName = 'Full name is required.';
      if (!p.nationality) passengerErrors.nationality = 'Nationality is required.';
      if (!p.passportNumber.trim()) passengerErrors.passportNumber = 'Passport number is required.';
      if (!p.dateOfBirth) passengerErrors.dateOfBirth = 'Date of birth is required.';
      if (!p.gender) passengerErrors.gender = 'Gender is required.';

      if (Object.keys(passengerErrors).length > 0) {
        isValid = false;
      }
      newErrors[index] = passengerErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ passengers });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 2: Passenger Information</h2>
      <p className="text-gray-600 mb-6">
        Please enter the details for all {data.passengerCount} passengers. Ensure the information
        exactly matches the details on each person&apos;s passport or travel document.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {passengers.map((passenger, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Passenger {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor={`fullName-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name (as per passport)
                </label>
                <input
                  type="text"
                  id={`fullName-${index}`}
                  value={passenger.fullName}
                  onChange={(e) => handleChange(index, 'fullName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${errors[index]?.fullName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[index]?.fullName && (
                  <p className="text-sm text-red-600 mt-1">{errors[index].fullName}</p>
                )}
              </div>

              {/* Nationality */}
              <div>
                <label
                  htmlFor={`nationality-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nationality
                </label>
                <select
                  id={`nationality-${index}`}
                  value={passenger.nationality}
                  onChange={(e) => handleChange(index, 'nationality', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${errors[index]?.nationality ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Nationality</option>
                  {allowedNationalities.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors[index]?.nationality && (
                  <p className="text-sm text-red-600 mt-1">{errors[index].nationality}</p>
                )}
              </div>

              {/* Passport Number */}
              <div>
                <label
                  htmlFor={`passportNumber-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Passport/Document Number
                </label>
                <input
                  type="text"
                  id={`passportNumber-${index}`}
                  value={passenger.passportNumber}
                  onChange={(e) => handleChange(index, 'passportNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${errors[index]?.passportNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[index]?.passportNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors[index].passportNumber}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor={`dateOfBirth-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id={`dateOfBirth-${index}`}
                  value={passenger.dateOfBirth}
                  onChange={(e) => handleChange(index, 'dateOfBirth', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 ${errors[index]?.dateOfBirth ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors[index]?.dateOfBirth && (
                  <p className="text-sm text-red-600 mt-1">{errors[index].dateOfBirth}</p>
                )}
              </div>

              {/* Gender */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-4">
                  {['male', 'female'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name={`gender-${index}`}
                        value={gender}
                        checked={passenger.gender === gender}
                        onChange={(e) => handleChange(index, 'gender', e.target.value)}
                        className="mr-2"
                      />
                      <span className="capitalize text-gray-800">{gender}</span>
                    </label>
                  ))}
                </div>
                {errors[index]?.gender && (
                  <p className="text-sm text-red-600 mt-1">{errors[index].gender}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {travelInsurance && !allPassengersFilled && (
          <p className="text-sm text-gray-500 mt-2">
            Travel insurance options appear after you complete all fields for every passenger (name,
            nationality, passport, date of birth, and gender).
          </p>
        )}

        {travelInsurance && allPassengersFilled && !allUnder50 && (
          <p className="text-sm text-gray-500 mt-2">
            Travel insurance is not offered when any passenger is 50 years old or older.
          </p>
        )}

        {/* Insurance: only if every passenger is under 50; hidden if any passenger is 50+ */}
        {travelInsurance && allPassengersFilled && allUnder50 && (
          <div className="mt-8 bg-brand-surface-alt border border-brand-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">
                Add Travel Insurance (Optional)
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-base text-gray-500 line-through">$187.00</span>
                  <span className="text-xl font-bold text-brand-primary-dark">
                    ${travelInsurance.pricePerPax.toFixed(2)}
                  </span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  Save ${(187 - travelInsurance.pricePerPax).toFixed(2)}
                </span>
                <span className="text-sm font-medium text-brand-primary-dark">per passenger</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold text-red-600">
                Your application may be rejected without Travel Insurance.
              </span>{' '}
              Travel insurance is a critical requirement for Vietnam eVisa applications. The
              government requires proof of insurance coverage as part of the visa approval process.
              We only offer 30-day insurance coverage as it&apos;s the minimum duration required by
              the Vietnam government.
            </p>
            <div className="space-y-3 mt-4">
              {passengers.map((passenger, index) => (
                <label
                  key={index}
                  className="flex items-center cursor-pointer p-3 bg-white rounded-md border border-gray-200 hover:border-brand-border transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={!!passenger.addOns?.some((a) => a.addOnId === travelInsurance.id)}
                    onChange={(e) => handleInsuranceToggle(index, e.target.checked)}
                    className="mr-3 h-5 w-5 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Get insurance for passenger {index + 1}
                    {passenger.fullName && ` - ${passenger.fullName}`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-6 rounded-md text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="py-3 px-6 rounded-md text-white font-semibold bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400"
          >
            {isLoading ? 'Saving...' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
}
