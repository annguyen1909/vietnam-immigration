'use client';

import { useMemo } from 'react';
import { loadStripe, type Stripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Step3Payment from './Step3Payment';
import type { ApplicationData } from '@/types/index';

let stripePromise: Promise<Stripe | null> | null = null;
function getStripePromise() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
}

export default function Step3PaymentWithElements(props: {
  clientSecret: string;
  applicationId: string;
  onPaymentSuccess: (
    billingDetails?: Record<string, unknown>,
    applicationId?: string
  ) => Promise<void>;
  onContinue: () => void;
  paymentStatus?: string;
  applicationStatus?: string;
  applicationData?: ApplicationData;
}) {
  const stripe = useMemo(() => getStripePromise(), []);
  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret: props.clientSecret,
      appearance: { theme: 'stripe' },
    }),
    [props.clientSecret]
  );

  return (
    <Elements options={options} stripe={stripe}>
      <Step3Payment
        applicationId={props.applicationId}
        onPaymentSuccess={props.onPaymentSuccess}
        onContinue={props.onContinue}
        paymentStatus={props.paymentStatus}
        applicationStatus={props.applicationStatus}
        applicationData={props.applicationData}
      />
    </Elements>
  );
}
