'use client';

import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { countries } from '@/data/countries';
import { Stripe, StripeElements } from '@stripe/stripe-js';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCreditCard } from 'react-icons/fa';
import { SiStripe } from 'react-icons/si';
import { ApplicationData, Passenger, AddOn } from '@/types/index';
import { formatDisplayDate } from '@/lib/date';
import { DEFAULT_SERVICE_FEE } from '@/lib/serviceFee';

type Step3PaymentProps = {
  applicationId: string;
  onPaymentSuccess: (billingDetails: BillingDetails, applicationId: string) => void;
  onContinue: () => void;
  paymentStatus?: string;
  applicationStatus?: string;
  applicationData?: ApplicationData;
};

type BillingDetails = {
  name: string;
  address: string;
  zipcode: string;
  country: string;
  cardType: string;
};

// Wrapper component that safely handles Stripe hooks
function StripePaymentForm(props: Step3PaymentProps) {
  const stripe = useStripe();
  const elements = useElements();

  return <Step3PaymentContent {...props} stripe={stripe} elements={elements} />;
}

// Main component that doesn't directly use Stripe hooks
function Step3PaymentContent({
  applicationId,
  paymentStatus,
  applicationStatus,
  stripe,
  elements,
  applicationData,
}: Omit<Step3PaymentProps, 'onPaymentSuccess' | 'onContinue'> & {
  stripe: Stripe | null;
  elements: StripeElements | null;
}) {
  const [message, setMessage] = useState('');
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: '',
    address: '',
    zipcode: '',
    country: '',
    cardType: '',
  });

  // Check if we're in a Stripe Elements context
  const isStripeAvailable = !!stripe && !!elements;

  // Load billing details from application data or localStorage
  useEffect(() => {
    // First try to get billing details from localStorage (if user was redirected back)
    const savedBillingDetails = localStorage.getItem('billingDetails');
    if (savedBillingDetails) {
      try {
        const parsed = JSON.parse(savedBillingDetails);
        setBillingDetails(parsed);
        console.log('Loaded billing details from localStorage:', parsed);
        return;
      } catch (error) {
        console.error('Error parsing saved billing details:', error);
      }
    }

    // If no saved billing details, populate with application data
    if (applicationData) {
      const newBillingDetails: BillingDetails = {
        name: '',
        address: '',
        zipcode: '',
        country: 'United States',
        cardType: '',
      };

      // Use primary passenger name if available
      if (applicationData.passengers && applicationData.passengers.length > 0) {
        newBillingDetails.name = applicationData.passengers[0].fullName || '';
      } else if (applicationData.fullName) {
        // Fallback to primary contact name
        newBillingDetails.name = applicationData.fullName;
      }

      setBillingDetails(newBillingDetails);
      console.log('Populated billing details with application data:', newBillingDetails);
    }
  }, [applicationData]);

  // Check if payment is already completed on component mount
  useEffect(() => {
    console.log('Step3Payment - Initial mount check:', {
      paymentStatus,
      applicationStatus,
      paymentSucceeded,
    });

    if (paymentStatus === 'Payment Completed') {
      console.log('Step3Payment - Payment already completed, showing success screen');
      setMessage('Payment succeeded!');
      setPaymentSucceeded(true);
    }
  }, [paymentStatus, applicationStatus, paymentSucceeded]);

  // Check if payment is already completed from application data
  useEffect(() => {
    console.log('Step3Payment - Payment status check:', {
      paymentStatus,
      applicationStatus,
      paymentSucceeded,
    });

    if (paymentStatus === 'Payment Completed') {
      console.log('Step3Payment - Setting payment succeeded');
      setMessage('Payment succeeded!');
      setPaymentSucceeded(true);
    }
  }, [paymentStatus, applicationStatus, paymentSucceeded]);

  // Check for payment success from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const redirectStatus = urlParams.get('redirect_status');

    console.log('Step3Payment - URL params check:', {
      paymentSuccess,
      redirectStatus,
      paymentStatus,
      applicationStatus,
    });

    if (paymentSuccess === 'true' && redirectStatus === 'succeeded') {
      console.log('Step3Payment - Payment success from URL, showing success screen');
      setMessage('Payment succeeded!');
      setPaymentSucceeded(true);
    }
  }, [paymentStatus, applicationStatus]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Payment form submitted with billing details:', billingDetails);

    // If payment is already completed, don't process payment
    if (paymentStatus === 'Payment Completed') {
      console.log('Payment already completed, skipping payment processing');
      return;
    }

    // Check if Stripe is available
    if (!stripe || !elements) {
      console.error('Stripe not available');
      setMessage('Payment system not available. Please refresh the page.');
      return;
    }

    // Validate billing details
    const requiredFields = ['name', 'address', 'zipcode', 'country'];
    const missingFields = requiredFields.filter(
      (field) => !billingDetails[field as keyof BillingDetails]?.trim()
    );

    if (missingFields.length > 0) {
      const errorMsg = `Please fill in all required billing fields: ${missingFields.join(', ')}`;
      console.log('Validation failed:', errorMsg);
      setMessage(errorMsg);
      return;
    }

    console.log('Validation passed, proceeding with payment...');
    setIsProcessing(true);
    setMessage(''); // Clear any previous messages

    // Save billing details to localStorage for later use
    localStorage.setItem('billingDetails', JSON.stringify(billingDetails));

    console.log('Submitting payment with billing details:', billingDetails);
    console.log(
      'Return URL will be:',
      `${window.location.origin}/apply?applicationId=${applicationId}&payment_success=true`
    );

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/apply?applicationId=${applicationId}&payment_success=true`,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        setMessage(error.message || 'Payment failed');
      } else {
        console.log('Payment confirmation initiated successfully');
      }
    } catch (err) {
      console.error('Unexpected error during payment:', err);
      setMessage('An unexpected error occurred during payment processing');
    }

    setIsProcessing(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 3: Secure Payment</h2>

      {/* Show message if Stripe is not available */}
      {!isStripeAvailable ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            Payment system is being prepared. Please wait a moment...
          </p>
        </div>
      ) : (
        <>
          {/* Powered by Stripe - Top */}
          <div className="flex items-center justify-center mb-6 p-3 bg-gradient-to-r from-brand-surface-alt to-brand-surface rounded-lg border border-brand-border">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-600">Secured by</span>
              <div className="flex items-center space-x-1">
                <SiStripe className="h-6 w-6 text-[#635bff]" />
                <span className="text-lg font-bold text-[#635bff]">Stripe</span>
              </div>
            </div>
          </div>

          {/* Enhanced Security Badges */}
          <div className="mb-6 p-4 bg-gradient-to-r from-brand-surface-alt to-brand-surface rounded-xl border border-emerald-100">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <svg className="h-6 w-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-center text-lg font-bold text-gray-800 mb-2">
              🔒 Bank-Level Security
            </h3>
            <p className="text-center text-sm text-gray-600 mb-4">
              Your payment is protected with military-grade encryption
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">SSL Encrypted</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-brand-surface-alt0 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">PCI DSS Level 1</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-gray-700">SOC 2 Certified</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                💳 We never store your card details • 🛡️ Fraud protection included
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-1">
              Payment Type & Card Details
            </h3>
            <div className="mb-4">
              <PaymentElement id="payment-element" options={paymentElementOptions} />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2 border-b pb-1">
              Billing Information
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide the complete billing address that matches your payment method. Include
              street address, city, and state/province in the address field.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="billing-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Cardholder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billing-name"
                  value={billingDetails.name}
                  onChange={(e) => setBillingDetails((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 placeholder-gray-500"
                  placeholder="Name on card"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="billing-address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Billing Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billing-address"
                  value={billingDetails.address}
                  onChange={(e) =>
                    setBillingDetails((prev) => ({ ...prev, address: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 placeholder-gray-500"
                  placeholder="Street address, city, state"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="billing-zipcode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="billing-zipcode"
                  value={billingDetails.zipcode}
                  onChange={(e) =>
                    setBillingDetails((prev) => ({ ...prev, zipcode: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900 placeholder-gray-500"
                  placeholder="ZIP code"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="billing-country"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="billing-country"
                  value={billingDetails.country}
                  onChange={(e) =>
                    setBillingDetails((prev) => ({ ...prev, country: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary text-gray-900"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>

          {/* Security Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="h-5 w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              All payment information is encrypted and secure. We do not store your credit card
              details.
            </div>
          </div>

          <form id="payment-form" onSubmit={handleSubmit}>
            <button
              disabled={isProcessing || !isStripeAvailable}
              id="submit"
              className="w-full bg-brand-accent hover:bg-[#ffcb3c] text-brand-ink font-bold py-3 px-6 rounded-xl text-lg shadow transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span id="button-text">
                {isProcessing ? <div className="spinner" id="spinner"></div> : 'Pay now'}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && (
              <div id="payment-message" className="text-red-500 mt-4 text-center">
                {message}
              </div>
            )}
          </form>
        </>
      )}
      <style jsx>{`
        .spinner,
        .spinner:before,
        .spinner:after {
          border-radius: 50%;
        }
        .spinner {
          color: #0a284b;
          font-size: 22px;
          text-indent: -99999em;
          margin: 0px auto;
          position: relative;
          width: 20px;
          height: 20px;
          box-shadow: inset 0 0 0 2px;
          transform: translateZ(0);
        }
        .spinner:before,
        .spinner:after {
          position: absolute;
          content: '';
        }
        .spinner:before {
          width: 10.4px;
          height: 20.4px;
          background: #ffb400;
          border-radius: 20.4px 0 0 20.4px;
          top: -0.2px;
          left: -0.2px;
          transform-origin: 10.4px 10.2px;
          animation: loading 2s infinite ease 1.5s;
        }
        .spinner:after {
          width: 10.4px;
          height: 10.2px;
          background: #ffb400;
          border-radius: 0 10.2px 10.2px 0;
          top: -0.1px;
          left: 10.2px;
          transform-origin: 0px 10.2px;
          animation: loading 2s infinite ease;
        }
        @keyframes loading {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// Non-Stripe version for when payment is already completed
function Step3PaymentSuccess({
  onContinue,
  applicationData,
}: {
  onContinue: () => void;
  applicationData?: ApplicationData;
}) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    // Use a timeout to allow the UI to update to "Printing..." before the print dialog blocks it
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const formatDate = (dateString?: string) => formatDisplayDate(dateString);

  const formatCurrency = (amount?: number) => {
    if (typeof amount !== 'number') return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Use snapshot pricing from passengers if available, otherwise fallback to visa type fees
  const passengerCount = applicationData?.passengerCount || 1;

  // Check if we have passenger snapshot fees
  const hasPassengerFees = applicationData?.passengers?.some(
    (p: Passenger) => p.originalGovernmentFee !== null && p.originalGovernmentFee !== undefined
  );

  let totalGovernmentFee = 0;
  let totalServiceFee = 0;

  if (hasPassengerFees && applicationData?.passengers && applicationData.passengers.length > 0) {
    // Use snapshot pricing from passengers
    totalGovernmentFee = applicationData.passengers.reduce((sum: number, p: Passenger) => {
      return sum + (p.originalGovernmentFee || 0);
    }, 0);
    totalServiceFee = applicationData.passengers.reduce((sum: number, p: Passenger) => {
      return sum + (p.originalServiceFee || 0);
    }, 0);
  } else {
    // Fallback: use visa type fees
    const governmentFeePerPerson = applicationData?.visa?.fees || 0;
    const serviceFeePerPerson = DEFAULT_SERVICE_FEE;
    totalGovernmentFee = governmentFeePerPerson * passengerCount;
    totalServiceFee = serviceFeePerPerson * passengerCount;
  }

  // Calculate add-ons total
  const addOnsTotal =
    applicationData?.passengers?.reduce((sum: number, passenger: Passenger) => {
      if (passenger.addOns && Array.isArray(passenger.addOns) && passenger.addOns.length > 0) {
        return (
          sum +
          passenger.addOns.reduce(
            (paxSum: number, addOn: AddOn) => paxSum + (addOn.pricePerPax || 0),
            0
          )
        );
      }
      return sum;
    }, 0) || 0;

  // Group add-ons by name for display
  const addOnsByType =
    applicationData?.passengers?.reduce(
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
    ) || {};

  const total = applicationData?.total || totalGovernmentFee + totalServiceFee + addOnsTotal;

  const getCardIcon = (brand?: string) => {
    const brandLower = brand?.toLowerCase();
    switch (brandLower) {
      case 'visa':
        return <FaCcVisa className="text-4xl text-brand-primary" />;
      case 'mastercard':
        return <FaCcMastercard className="text-4xl text-red-600" />;
      case 'amex':
        return <FaCcAmex className="text-4xl text-brand-primary-dark" />;
      default:
        return <FaCreditCard className="text-4xl text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto print:max-w-none">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-8 mb-8 print:break-inside-avoid">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
              <p className="mt-2 text-lg text-gray-600">
                Your Vietnam eVisa application has been submitted successfully
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={handlePrint}
              disabled={isPrinting}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary print:hidden"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              {isPrinting ? 'Printing...' : 'Print Receipt'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Application Details */}
        <div className="md:col-span-2 space-y-8">
          {/* Application Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 print:break-inside-avoid">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Reference</h2>
            <div className="bg-brand-surface-alt border border-brand-border rounded-lg p-4 text-center">
              <p className="text-sm text-brand-primary font-medium mb-1">Your Application ID</p>
              <p className="text-3xl font-bold text-blue-900 tracking-wider">
                {applicationData?.applicationId || 'Loading...'}
              </p>
              <p className="text-sm text-brand-primary mt-2">
                An email confirmation has been sent to{' '}
                <span className="font-medium">{applicationData?.email}</span>
              </p>
            </div>
          </div>

          {/* Contact & Travel Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 print:break-inside-avoid">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{applicationData?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-900">{applicationData?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {applicationData?.areaCode} {applicationData?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  Travel Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Visa Type</p>
                    <p className="font-medium text-gray-900">Vietnam eVisa</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(applicationData?.stayingStart)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure Date</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(applicationData?.stayingEnd)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          {applicationData?.passengers && applicationData.passengers.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 print:break-inside-avoid">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Passenger Details</h2>
              <div className="space-y-4">
                {applicationData.passengers.map((p: Passenger, index: number) => (
                  <div key={p.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-semibold text-gray-800">
                      Passenger {index + 1}: {p.fullName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Passport: {p.passportNumber} | DOB: {formatDate(p.dateOfBirth)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 print:break-inside-avoid">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Government Fee</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(totalGovernmentFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Service Fee</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(totalServiceFee)}
                </span>
              </div>
              {Object.keys(addOnsByType).length > 0 && (
                <>
                  {Object.values(addOnsByType).map((addOn, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-700">
                        {addOn.name} × {addOn.quantity}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(addOn.total)}
                      </span>
                    </div>
                  ))}
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-700">Travelers</span>
                <span className="font-semibold text-gray-900">x {passengerCount}</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span className="text-gray-900">Amount Paid</span>
                <span className="text-gray-900">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg mt-2">
                <span className="text-green-800 font-bold">Amount Due</span>
                <span className="text-green-800 font-bold">{formatCurrency(0)}</span>
              </div>
            </div>

            {applicationData?.CardHolder && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center">
                  {getCardIcon(applicationData.CardHolder.cardType)}
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800 capitalize">
                      {applicationData.CardHolder.cardType || 'Card'} ending in{' '}
                      {applicationData.CardHolder.cardNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 print:break-inside-avoid">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What&apos;s Next?</h2>
            <button
              onClick={onContinue}
              className="w-full bg-brand-accent hover:bg-[#ffcb3c] text-brand-ink font-bold py-2.5 px-4 rounded-lg text-base shadow-md transition-colors print:hidden"
            >
              Continue to Document Upload
            </button>
            <div className="mt-4 text-center">
              <button
                onClick={handlePrint}
                className="text-sm text-gray-600 hover:text-black font-medium print:hidden"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:max-w-none {
            max-width: none !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}

// Main export component that decides which version to render
export default function Step3Payment(props: Step3PaymentProps) {
  // If payment is already completed, render the success component without Stripe
  if (props.paymentStatus === 'Payment Completed') {
    return (
      <Step3PaymentSuccess onContinue={props.onContinue} applicationData={props.applicationData} />
    );
  }

  // Otherwise, render the Stripe version
  return <StripePaymentForm {...props} />;
}
