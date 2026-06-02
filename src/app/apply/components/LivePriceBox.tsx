'use client';

import { useState, useEffect } from 'react';
import { VisaType } from '@/types/visa';
import { getUrgencyFeePerPax, getUrgencyLabel } from '@/lib/urgency';
import type { UrgencyValue } from '@/types/index';
import { DEFAULT_SERVICE_FEE } from '@/lib/serviceFee';

interface AddOn {
  addOnId: string;
  addOnName: string;
  type: string;
  pricePerPax: number;
}

interface LivePriceBoxProps {
  selectedVisa: VisaType | null;
  passengerCount: number;
  urgency?: UrgencyValue;
  applicationId?: string;
  destinationId?: string;
  passengers?: Array<{
    addOns?: AddOn[];
  }>;
}

export default function LivePriceBox({
  selectedVisa,
  passengerCount,
  urgency = '',
  applicationId,
  destinationId = 'vietnam',
  passengers = [],
}: LivePriceBoxProps) {
  const [serviceFee, setServiceFee] = useState<number>(DEFAULT_SERVICE_FEE);
  const [isLoadingServiceFee, setIsLoadingServiceFee] = useState(false);
  const [urgencyFeePerPax, setUrgencyFeePerPax] = useState(0);

  // Fetch service fee when visa type changes
  useEffect(() => {
    if (!selectedVisa?.id) {
      setServiceFee(DEFAULT_SERVICE_FEE);
      return;
    }

    const fetchServiceFee = async () => {
      setIsLoadingServiceFee(true);
      try {
        const response = await fetch(
          `/api/service-fee?destinationId=${destinationId}&visaTypeId=${selectedVisa.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setServiceFee(data.serviceFee);
        } else {
          setServiceFee(DEFAULT_SERVICE_FEE);
        }
      } catch (error) {
        console.error('Error fetching service fee:', error);
        setServiceFee(DEFAULT_SERVICE_FEE);
      } finally {
        setIsLoadingServiceFee(false);
      }
    };

    fetchServiceFee();
  }, [selectedVisa?.id, destinationId]);

  useEffect(() => {
    if (!urgency) {
      setUrgencyFeePerPax(0);
      return;
    }
    getUrgencyFeePerPax(urgency).then(setUrgencyFeePerPax);
  }, [urgency]);

  const governmentFee = selectedVisa?.fees || 0;
  const promoDiscount = 0; // For future use

  const totalGovernmentFee = governmentFee * passengerCount;
  const totalServiceFee = serviceFee * passengerCount;
  const totalUrgencyFee = urgencyFeePerPax * passengerCount;

  // Calculate add-ons total
  const addOnsTotal = passengers.reduce((sum, passenger) => {
    if (passenger.addOns && passenger.addOns.length > 0) {
      return sum + passenger.addOns.reduce((paxSum, addOn) => paxSum + addOn.pricePerPax, 0);
    }
    return sum;
  }, 0);

  // Group add-ons by name for display
  const addOnsByType = passengers.reduce(
    (acc, passenger) => {
      if (passenger.addOns && passenger.addOns.length > 0) {
        passenger.addOns.forEach((addOn) => {
          if (!acc[addOn.addOnName]) {
            acc[addOn.addOnName] = {
              name: addOn.addOnName,
              pricePerPax: addOn.pricePerPax,
              quantity: 0,
              total: 0,
            };
          }
          acc[addOn.addOnName].quantity += 1;
          acc[addOn.addOnName].total += addOn.pricePerPax;
        });
      }
      return acc;
    },
    {} as Record<string, { name: string; pricePerPax: number; quantity: number; total: number }>
  );

  const orderTotal =
    totalGovernmentFee + totalServiceFee + totalUrgencyFee - promoDiscount + addOnsTotal;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 self-start sticky top-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

      {applicationId && (
        <div className="mb-4 p-3 bg-brand-surface-alt border border-brand-border rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-brand-primary-dark">Application ID:</span>
            <span className="text-sm font-mono text-blue-900">{applicationId}</span>
          </div>
        </div>
      )}

      {selectedVisa ? (
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span>Visa Type:</span>
            <span className="font-medium text-gray-900">{selectedVisa.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Government Fee:</span>
            <span className="font-medium text-gray-900">
              ${governmentFee.toFixed(2)} x {passengerCount}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee:</span>
            <span className="font-medium text-gray-900">
              {isLoadingServiceFee ? (
                <span className="text-gray-400">Loading...</span>
              ) : (
                <>
                  ${serviceFee.toFixed(2)} x {passengerCount}
                </>
              )}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Promo Code:</span>
            <span className="text-sm font-semibold text-green-600">
              -$ {promoDiscount.toFixed(2)}
            </span>
          </div>
          {urgency && totalUrgencyFee > 0 && (
            <div className="flex justify-between">
              <span>{getUrgencyLabel(urgency)}:</span>
              <span className="font-medium text-gray-900">
                ${urgencyFeePerPax.toFixed(2)} x {passengerCount}
              </span>
            </div>
          )}

          {/* Add-ons Section */}
          {Object.keys(addOnsByType).length > 0 && (
            <>
              <hr className="my-3 border-t border-gray-200" />
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Add-ons:</div>
                {Object.values(addOnsByType).map((addOn, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {addOn.name} × {addOn.quantity}
                    </span>
                    <span className="font-medium text-gray-900">${addOn.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <hr className="my-3 border-t border-gray-200" />

          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Order Total:</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            <p>
              This is a secure 256-bit SSL encrypted payment. You will not be charged until you
              confirm your payment details on the final step.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p>Select a visa type to see your order summary.</p>
        </div>
      )}
    </div>
  );
}
