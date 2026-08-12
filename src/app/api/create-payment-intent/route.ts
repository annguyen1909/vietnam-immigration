import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';
import { getCountryCodeFromName, isNationalityCodeAllowed } from '@/lib/nationalityEligibility';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { applicationId } = body;

  if (!applicationId) {
    return NextResponse.json({ error: 'Application ID is required' }, { status: 400 });
  }

  try {
    const application = await prisma.application.findUnique({
      where: { applicationId },
      select: {
        id: true,
        total: true,
        accountId: true,
        paymentStatus: true,
        status: true,
        passengerCount: true,
        VisaType: {
          select: { allowedNationalities: true },
        },
        Passenger: {
          select: { nationality: true },
        },
      },
    });

    if (!application || !application.total) {
      return NextResponse.json(
        { error: 'Application not found or total not set' },
        { status: 404 }
      );
    }

    const hasInvalidPassengerData =
      application.Passenger.length !== application.passengerCount ||
      application.Passenger.some((passenger) => {
        if (!passenger.nationality) return true;
        const code = getCountryCodeFromName(passenger.nationality);
        return !code || !isNationalityCodeAllowed(application.VisaType.allowedNationalities, code);
      });

    if (hasInvalidPassengerData) {
      return NextResponse.json(
        { error: 'Passenger nationality is missing or not eligible for this Vietnam eVisa.' },
        { status: 400 }
      );
    }

    // Prevent creating payment intent if payment is already completed
    if (
      application.paymentStatus === 'Payment Completed' ||
      application.status === 'Collecting Documents'
    ) {
      return NextResponse.json(
        { error: 'Payment already completed for this application' },
        { status: 400 }
      );
    }

    const account = await prisma.account.findUnique({
      where: { id: application.accountId },
      select: { email: true },
    });

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const amountInCents = Math.round(application.total * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: account.email,
      metadata: {
        applicationId: applicationId,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Record the Stripe activity
    await prisma.stripeActivity.create({
      data: {
        id: paymentIntent.id,
        applicationId: application.id,
        amount: application.total,
        status: paymentIntent.status,
        type: 'PaymentIntent',
        title: 'Payment Intent Created',
        description: `Payment intent created for ${account.email}`,
        timestamp: new Date(paymentIntent.created * 1000),
        transactionId: paymentIntent.id,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    // Return a friendly message; log the technical detail server-side only.
    // Note: do NOT call prisma.$disconnect() here — `prisma` is a shared
    // singleton (see @/lib/prisma) and disconnecting it per-request tears down
    // the pool the next request needs, causing intermittent checkout failures.
    return NextResponse.json(
      {
        error:
          'We could not start the secure checkout. Please try again in a moment, or contact our support team if this keeps happening.',
      },
      { status: 500 }
    );
  }
}
