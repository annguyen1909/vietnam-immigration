'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SiteFooter from '@/components/layout/SiteFooter';
import TrustBadges from '@/components/trust/TrustBadges';
import Step1ContactVisa from './components/Step1ContactVisa';
import Step2Passengers from './components/Step2Passengers';
import Step3Payment from './components/Step3Payment';
import Step4Documents from './components/Step4Documents';
import ApplicationProgress from './components/ApplicationProgress';
import LivePriceBox from './components/LivePriceBox';
import { VisaType, ApplicationData, Passenger } from '@/types/index';
import { matchVisaTypeFromQuery } from '@/lib/vietnamVisa';
import SupportBox from './components/SupportBox';
import CancelledApplicationView from './components/CancelledApplicationView';
import ProcessingView from './components/ProcessingView';
import VisaResultSentView from './components/VisaResultSentView';
import ChargebackDetectedView from './components/ChargebackDetectedView';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    destinationId: 'vietnam',
    visaTypeId: '',
    passengerCount: 1,
    urgency: '',
    stayingStart: '',
    stayingEnd: '',
    fullName: '',
    email: '',
    areaCode: '+1-United States',
    phoneNumber: '',
    gender: '',
    passengers: [],
    documents: [],
    paymentMethod: '',
    passengerIds: [],
  });

  const [visaTypes, setVisaTypes] = useState<VisaType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isCheckingPaymentStatus, setIsCheckingPaymentStatus] = useState(false);
  const [isLoadingApplication, setIsLoadingApplication] = useState(false);
  // Once the user advances to documents (Step 4), never pull them back to
  // Step 3. A ref guards async pollers whose closures capture stale state.
  const hasContinuedToDocumentsRef = useRef(false);

  // Calculate payment success status early
  const isPaymentSuccess =
    applicationData.paymentStatus === 'Payment Completed' ||
    applicationData.status === 'Collecting Documents';

  const handlePaymentSuccess = useCallback(
    async (billingDetails?: Record<string, unknown>, applicationId?: string) => {
      // If we don't have an application ID, we can't proceed
      if (!applicationId) {
        console.error('Payment Success Error: No application ID provided.');
        setError('An error occurred while finalizing your payment. Please contact support.');
        return;
      }

      // Extract payment intent ID from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const paymentIntentId = urlParams.get('payment_intent');

      if (!paymentIntentId) {
        console.error('Payment Success Error: No payment intent ID found in URL.');
        setError('An error occurred while finalizing your payment. Please contact support.');
        return;
      }

      try {
        const response = await fetch(`/api/applications/${applicationId}/payment-success`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId, billingDetails }),
        });

        const data = await response.json();
        console.log('Payment success API response:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to update payment status');
        }

        // The webhook will now handle the primary status updates.
        // This API call is now mainly for creating the CardHolder record
        // and giving the frontend immediate feedback.
      } catch (err) {
        console.error('Error in handlePaymentSuccess:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    },
    []
  );

  useEffect(() => {
    const fetchVisaTypes = async () => {
      try {
        const response = await fetch('/api/destinations/vietnam/visa-types');
        if (response.ok) {
          const data = await response.json();
          setVisaTypes(data);
        }
      } catch (error) {
        console.error('Failed to fetch visa types:', error);
      }
    };
    fetchVisaTypes();
  }, []);

  useEffect(() => {
    if (visaTypes.length > 0 && !applicationData.visaTypeId) {
      let typeParam = '';
      let passengersParam = '';
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        typeParam = params.get('type') || '';
        passengersParam = params.get('passengers') || '';
      }
      if (typeParam) {
        const match = matchVisaTypeFromQuery(visaTypes, typeParam);
        if (match) {
          setApplicationData((prev) => ({ ...prev, visaTypeId: match.id }));
        }
      }
      if (passengersParam) {
        const num = parseInt(passengersParam, 10);
        if (!isNaN(num) && num >= 1 && num <= 15 && applicationData.passengerCount === 1) {
          setApplicationData((prev) => ({ ...prev, passengerCount: num }));
        }
      }
    }
  }, [visaTypes, applicationData.visaTypeId, applicationData.passengerCount]);

  // Load application data if returning from payment redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const applicationIdFromUrl = urlParams.get('applicationId');

    // Don't load application data if we're on step 3 and payment is completed
    if (
      currentStep === 3 &&
      (applicationData.paymentStatus === 'Payment Completed' ||
        applicationData.status === 'Collecting Documents')
    ) {
      console.log('On step 3 with completed payment, skipping application data load');
      return;
    }

    if (applicationIdFromUrl && !applicationData.applicationId) {
      const loadApplicationData = async () => {
        try {
          setIsLoadingApplication(true);
          const response = await fetch(`/api/applications/${applicationIdFromUrl}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Loaded application data from API:', data);
            console.log('Current local application data:', applicationData);

            // Don't override if we already have payment completed status locally
            if (
              applicationData.paymentStatus === 'Payment Completed' ||
              applicationData.status === 'Collecting Documents'
            ) {
              console.log('Payment already completed locally, not overriding with API data');
              setIsLoadingApplication(false);
              return;
            }

            setApplicationData(data);

            // If we are returning from payment, let the other useEffect handle the step
            if (urlParams.get('payment_success') === 'true') {
              setIsLoadingApplication(false);
              return;
            }

            // Check for special statuses first - don't set any step for these
            if (
              data.status === 'Cancelled' ||
              data.status === 'Processing' ||
              data.status === 'Visa Result Sent' ||
              data.status === 'Closed - Chargeback'
            ) {
              console.log('Application has special status, not setting step');
              setIsLoadingApplication(false);
              return;
            }

            // Determine the correct step based on application status
            let targetStep = 1;
            console.log('Determining step for application:', {
              status: data.status,
              paymentStatus: data.paymentStatus,
              hasVisaType: !!data.visaTypeId,
              hasDates: !!(data.stayingStart && data.stayingEnd),
              hasPassengers: !!(data.passengers && data.passengers.length > 0),
              passengersCount: data.passengers?.length || 0,
            });

            if (data.status && data.status !== 'Not Started') {
              // Step 1 is completed if we have basic application data
              if (data.visaTypeId && data.stayingStart && data.stayingEnd) {
                targetStep = 2;
              }

              // Step 3 (payment) if status indicates payment is needed
              if (data.status === 'Waiting for Payment') {
                targetStep = 3;
              }

              // Step 4 (documents) if status indicates payment was processed
              if (
                data.status === 'Collecting Documents' ||
                data.status === 'Deferred' ||
                data.status === 'Send Result' ||
                data.status === 'Refunded' ||
                data.paymentStatus === 'Payment Completed'
              ) {
                targetStep = 4;
              }
            }

            console.log('Setting target step to:', targetStep);
            // Set the step immediately when loading application data
            setCurrentStep(targetStep);
          }
        } catch (error) {
          console.error('Failed to load application data:', error);
        } finally {
          setIsLoadingApplication(false);
        }
      };
      loadApplicationData();
    }
  }, [
    currentStep,
    applicationData.paymentStatus,
    applicationData.status,
    applicationData.applicationId,
    applicationData,
  ]);

  // Create payment intent when reaching step 3
  useEffect(() => {
    // Get URL parameters for payment status
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const paymentIntent = urlParams.get('payment_intent');
    const redirectStatus = urlParams.get('redirect_status');

    // Skip payment intent creation if:
    // 1. Payment is already completed
    // 2. We have payment intent in URL (indicating payment was processed)
    // 3. We already have a client secret (and it's not empty)
    if (
      paymentIntent ||
      (clientSecret && clientSecret.trim() !== '') ||
      applicationData.paymentStatus === 'Payment Completed' ||
      applicationData.status === 'Collecting Documents'
    ) {
      console.log('Payment intent creation skipped:', {
        paymentSuccess,
        paymentIntent,
        redirectStatus,
        paymentStatus: applicationData.paymentStatus,
        applicationStatus: applicationData.status,
        hasClientSecret: !!clientSecret,
      });

      // Clear any existing errors when payment is completed
      if (
        applicationData.paymentStatus === 'Payment Completed' ||
        applicationData.status === 'Collecting Documents'
      ) {
        setError(null);
      }
      return;
    }

    if (currentStep === 3 && applicationData.applicationId && !clientSecret) {
      console.log('Creating payment intent for application:', applicationData.applicationId);
      setIsLoading(true);
      setError(null); // Clear any previous errors

      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: applicationData.applicationId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // Don't show "Payment already completed" as an error banner
            if (data.error.includes('Payment already completed')) {
              console.log('Payment already completed, not showing as error');
              setError(null);
            } else {
              setError(data.error);
            }
          } else {
            console.log('Payment intent created successfully');
            setClientSecret(data.clientSecret);
            setError(null);
          }
        })
        .catch((err) => {
          console.error('Payment intent creation error:', err);
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        })
        .finally(() => setIsLoading(false));
    }
  }, [
    currentStep,
    applicationData.applicationId,
    applicationData.paymentStatus,
    applicationData.status,
    clientSecret,
  ]);

  useEffect(() => {
    // Check if user is returning from a successful payment
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('payment_success');
    const paymentIntent = urlParams.get('payment_intent');
    const redirectStatus = urlParams.get('redirect_status');
    const applicationIdFromUrl = urlParams.get('applicationId');

    console.log('Payment success check:', {
      paymentSuccess,
      redirectStatus,
      paymentIntent,
      applicationIdFromUrl,
      currentPaymentStatus: applicationData.paymentStatus,
      currentApplicationStatus: applicationData.status,
    });

    if (paymentSuccess === 'true' && redirectStatus === 'succeeded' && paymentIntent) {
      // Payment was successful, update the application status
      // Use applicationId from URL if available, otherwise use from state
      const appId = applicationIdFromUrl || applicationData.applicationId;

      if (appId) {
        // Check if payment is already completed to avoid duplicate processing
        if (
          applicationData.paymentStatus === 'Payment Completed' ||
          applicationData.status === 'Collecting Documents'
        ) {
          console.log('Payment already completed, skipping API call');
          if (
            !hasContinuedToDocumentsRef.current &&
            applicationData.status !== 'Cancelled' &&
            applicationData.status !== 'Processing' &&
            applicationData.status !== 'Visa Result Sent' &&
            applicationData.status !== 'Closed - Chargeback'
          ) {
            setCurrentStep(3);
          }
          return;
        }

        // Retrieve billing details from localStorage
        const savedBillingDetails = localStorage.getItem('billingDetails');
        const billingDetails = savedBillingDetails ? JSON.parse(savedBillingDetails) : undefined;

        // Clear billing details from localStorage
        localStorage.removeItem('billingDetails');

        handlePaymentSuccess(billingDetails, appId);

        // Don't immediately update local state - let the webhook process the payment first
        // The webhook will update the database, and we'll fetch the updated status
        console.log('Payment success detected, waiting for webhook to process...');

        // Start polling for payment status update
        setIsCheckingPaymentStatus(true);
      }

      // Clean up the URL parameters
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('payment_success');
      newUrl.searchParams.delete('payment_intent');
      newUrl.searchParams.delete('payment_intent_client_secret');
      newUrl.searchParams.delete('redirect_status');
      window.history.replaceState({}, '', newUrl.toString());

      if (
        !hasContinuedToDocumentsRef.current &&
        applicationData.status !== 'Cancelled' &&
        applicationData.status !== 'Processing' &&
        applicationData.status !== 'Visa Result Sent' &&
        applicationData.status !== 'Closed - Chargeback'
      ) {
        setCurrentStep(3);
      }
    }
  }, [applicationData, handlePaymentSuccess]);

  // Poll for payment status update after payment success
  useEffect(() => {
    if (!isCheckingPaymentStatus || !applicationData.applicationId) return;
    if (hasContinuedToDocumentsRef.current) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/applications/${applicationData.applicationId}`);
        if (response.ok) {
          const data = await response.json();

          // If payment status has been updated by webhook, update local state
          if (
            data.paymentStatus === 'Payment Completed' ||
            data.status === 'Collecting Documents'
          ) {
            console.log('Payment status updated by webhook:', data);
            setApplicationData(data); // Update the entire application data object
            setIsCheckingPaymentStatus(false);

            if (
              !hasContinuedToDocumentsRef.current &&
              data.status !== 'Cancelled' &&
              data.status !== 'Processing' &&
              data.status !== 'Visa Result Sent' &&
              data.status !== 'Closed - Chargeback'
            ) {
              console.log('Payment completed, ensuring we stay on step 3');
              setCurrentStep(3);
            }
          }
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    // Check immediately, then every 2 seconds
    checkPaymentStatus();
    const interval = setInterval(checkPaymentStatus, 2000);

    // Stop polling after 30 seconds (15 attempts)
    const timeout = setTimeout(() => {
      setIsCheckingPaymentStatus(false);
      console.log('Payment status polling timed out');
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isCheckingPaymentStatus, applicationData.applicationId]);

  // Clear errors when payment is completed
  useEffect(() => {
    if (
      applicationData.paymentStatus === 'Payment Completed' ||
      applicationData.status === 'Collecting Documents'
    ) {
      console.log('Payment completed, clearing any errors');
      setError(null);
    }
  }, [applicationData.paymentStatus, applicationData.status]);

  // Track step changes for debugging
  useEffect(() => {
    console.log('Step changed to:', currentStep, {
      paymentStatus: applicationData.paymentStatus,
      applicationStatus: applicationData.status,
      isPaymentSuccess,
    });
  }, [currentStep, applicationData.paymentStatus, applicationData.status, isPaymentSuccess]);

  const handleDataChange = useCallback((newData: Partial<ApplicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...newData }));
  }, []);

  const handleStep1Submit = async (step1Data: Partial<ApplicationData>) => {
    setIsLoading(true);
    setError(null);

    const completeData = step1Data as ApplicationData;

    handleDataChange(completeData);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) throw new Error('Failed to create application');

      const result = await response.json();

      handleDataChange({
        applicationId: result.applicationId,
        accountId: result.accountId,
        status: result.status,
        passengerIds: result.passengerIds,
      });

      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2Submit = async (passengersData: { passengers: Passenger[] }) => {
    setIsLoading(true);
    setError(null);
    handleDataChange(passengersData);

    try {
      const response = await fetch(
        `/api/applications/${applicationData.applicationId}/passengers`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...passengersData,
            urgency: applicationData.urgency || '',
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save passenger information');
      }

      handleDataChange({
        status: 'Waiting for Payment',
      });

      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueToDocuments = () => {
    console.log('handleContinueToDocuments called:', {
      currentStep,
      paymentStatus: applicationData.paymentStatus,
      applicationStatus: applicationData.status,
    });

    // Lock forward navigation and stop any in-flight payment polling so the
    // user is never yanked back to Step 3 after advancing.
    hasContinuedToDocumentsRef.current = true;
    setIsCheckingPaymentStatus(false);

    console.log('Proceeding to step 4 (documents)');
    setCurrentStep(4);
  };

  const selectedVisa = visaTypes.find((v) => v.id === applicationData.visaTypeId) || null;

  const renderCurrentStep = () => {
    console.log('renderCurrentStep called:', {
      currentStep,
      paymentStatus: applicationData.paymentStatus,
      applicationStatus: applicationData.status,
      isPaymentSuccess,
      clientSecret: !!clientSecret,
    });

    switch (currentStep) {
      case 1:
        return (
          <Step1ContactVisa
            data={applicationData}
            visaTypes={visaTypes}
            onDataChange={handleDataChange}
            onSubmit={handleStep1Submit}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <Step2Passengers
            data={applicationData}
            visaType={selectedVisa}
            onSubmit={handleStep2Submit}
            isLoading={isLoading}
            onBack={() => setCurrentStep(1)}
            onPassengersChange={(passengers) => {
              handleDataChange({ passengers });
            }}
          />
        );
      case 3:
        // Show payment component if we have clientSecret OR if payment is already completed
        if (!clientSecret && applicationData.paymentStatus !== 'Payment Completed') {
          return (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">
                  Preparing secure payment gateway...
                </p>
              </div>
            </div>
          );
        }

        // Only render Stripe Elements if we have a valid clientSecret
        if (clientSecret) {
          const options: StripeElementsOptions = {
            clientSecret,
            appearance: { theme: 'stripe' },
          };
          return (
            <Elements options={options} stripe={stripePromise}>
              <Step3Payment
                applicationId={applicationData.applicationId!}
                onPaymentSuccess={handlePaymentSuccess}
                onContinue={handleContinueToDocuments}
                paymentStatus={applicationData.paymentStatus}
                applicationStatus={applicationData.status}
                applicationData={applicationData}
              />
            </Elements>
          );
        }

        // Render payment component without Stripe Elements (for completed payments)
        console.log('Rendering Step3Payment without Stripe for completed payment');
        return (
          <Step3Payment
            applicationId={applicationData.applicationId!}
            onPaymentSuccess={handlePaymentSuccess}
            onContinue={handleContinueToDocuments}
            paymentStatus={applicationData.paymentStatus}
            applicationStatus={applicationData.status}
            applicationData={applicationData}
          />
        );
      case 4:
        return <Step4Documents applicationData={applicationData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex flex-col">
      {/* Loading screen for application data */}
      {isLoadingApplication && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700 mb-2">Loading your application...</p>
            <p className="text-gray-600">Please wait while we retrieve your application details.</p>
          </div>
        </div>
      )}

      {/* Show Cancelled view if application is cancelled */}
      {!isLoadingApplication && applicationData.status === 'Cancelled' && (
        <CancelledApplicationView
          applicationId={applicationData.applicationId || ''}
          cancelledAt={
            applicationData.updatedAt
              ? new Date(applicationData.updatedAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''
          }
        />
      )}

      {/* Show Visa Result Sent view if application is in that status */}
      {!isLoadingApplication && applicationData.status === 'Visa Result Sent' && (
        <VisaResultSentView
          email={applicationData.email || ''}
          updatedOn={
            applicationData.updatedAt
              ? new Date(applicationData.updatedAt).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''
          }
        />
      )}

      {/* Show Processing view if application is being processed */}
      {!isLoadingApplication && applicationData.status === 'Processing' && (
        <ProcessingView
          applicationId={applicationData.applicationId || ''}
          email={applicationData.email || ''}
          passengers={applicationData.passengers || []}
        />
      )}

      {/* Show Chargeback Detected view if application is in that status */}
      {!isLoadingApplication && applicationData.status === 'Closed - Chargeback' && (
        <ChargebackDetectedView />
      )}

      {/* Normal flow for non-cancelled, non-processing, non-result-sent, and non-chargeback applications */}
      {!isLoadingApplication &&
        applicationData.status !== 'Cancelled' &&
        applicationData.status !== 'Processing' &&
        applicationData.status !== 'Visa Result Sent' &&
        applicationData.status !== 'Closed - Chargeback' && (
          <>
            <main className="flex-grow bg-brand-surface-alt py-8 sm:py-12">
              {currentStep !== 3 || !isPaymentSuccess ? (
                <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10 mb-6 sm:mb-8">
                  <ApplicationProgress currentStep={currentStep} />
                </div>
              ) : null}
              <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
                {error && (
                  <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-red-800 font-semibold">{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                  <div className="lg:col-span-2 min-w-0">
                    {currentStep === 3 && applicationData.paymentStatus !== 'Payment Completed' && (
                      <div className="mb-6">
                        <TrustBadges layout="row" />
                      </div>
                    )}
                    {renderCurrentStep()}
                  </div>
                  <div>
                    <div className="sticky top-24 space-y-8">
                      {(currentStep !== 3 || !isPaymentSuccess) && currentStep !== 4 && (
                        <LivePriceBox
                          selectedVisa={selectedVisa}
                          passengerCount={applicationData.passengerCount}
                          urgency={applicationData.urgency}
                          applicationId={applicationData.applicationId}
                          destinationId={applicationData.destinationId}
                          passengers={applicationData.passengers}
                        />
                      )}
                      <SupportBox />
                    </div>
                  </div>
                </div>
              </div>
            </main>

            <SiteFooter />
          </>
        )}
    </div>
  );
}
