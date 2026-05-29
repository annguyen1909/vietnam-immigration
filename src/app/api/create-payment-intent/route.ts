import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';

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
      },
    });

    if (!application || !application.total) {
      return NextResponse.json(
        { error: 'Application not found or total not set' },
        { status: 404 }
      );
    }

    // Prevent creating payment intent if payment is already completed
    if (
      application.paymentStatus === 'Payment Completed' ||
      application.status === 'Collecting Documents'
    ) {
      console.log(
        `Payment intent creation blocked for application ${applicationId}: Payment already completed`
      );
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
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: `Failed to create payment intent: ${errorMessage}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
