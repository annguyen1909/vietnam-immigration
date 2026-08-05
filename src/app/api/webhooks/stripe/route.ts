import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getApplicationOrderTotal } from '@/lib/applicationTotal';
import { sendEmail } from '@/lib/email';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(paymentIntent);
        break;
      }
      default:
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const applicationId = paymentIntent.metadata.applicationId;

  if (!applicationId) {
    console.error('Webhook Error: No applicationId found in payment intent metadata');
    return;
  }

  try {
    const application = await prisma.application.findUnique({
      where: { applicationId },
      include: {
        Account: {
          select: {
            email: true,
          },
        },
        Passenger: true,
        VisaType: true,
      },
    });

    if (!application) {
      console.error(`Webhook Error: Application not found for applicationId: ${applicationId}`);
      return;
    }

    if (application.paymentStatus === 'Payment Completed') {
      return;
    }

    await prisma.application.update({
      where: { applicationId: applicationId },
      data: {
        status: 'Collecting Documents',
        paymentStatus: 'Payment Completed',
      },
    });

    let cardType = 'Unknown';
    let cardLast4 = '****';
    let cardholderName = '';
    let billingAddress = '';
    let billingZipcode = '';

    if (paymentIntent.payment_method) {
      const paymentMethod = await getStripe().paymentMethods.retrieve(
        paymentIntent.payment_method as string
      );
      cardLast4 = paymentMethod.card?.last4 || '****';
      cardType = paymentMethod.card?.brand || 'Unknown';
    }

    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
      const cardHolder = await prisma.cardHolder.findUnique({
        where: { applicationId: application.id },
      });

      if (cardHolder) {
        cardholderName = cardHolder.name;
        billingAddress = cardHolder.address;
        billingZipcode = cardHolder.zipcode;
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      attempts++;
    }

    if (!cardholderName) {
      console.error(
        `Webhook Error: No CardHolder record found after waiting 10 seconds for application ${applicationId}`
      );
      cardholderName = 'Billing Form Data Missing';
      billingAddress = 'Billing Form Data Missing';
      billingZipcode = 'Billing Form Data Missing';
    }

    await prisma.stripeActivity.create({
      data: {
        id: `payment_${paymentIntent.id}`,
        applicationId: application.id,
        type: 'Payment',
        title: 'Payment',
        amount: paymentIntent.amount / 100,
        status: 'succeeded',
        transactionId: `payment_${paymentIntent.id}`,
        description: `Payment of $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} - Made by ${cardholderName}.`,
        timestamp: new Date(),
      },
    });

    await prisma.cardHolder.upsert({
      where: { applicationId: application.id },
      update: {
        name: cardholderName,
        cardType: cardType,
        cardNumber: `****${cardLast4}`,
        address: billingAddress,
        zipcode: billingZipcode,
      },
      create: {
        id: `card_${application.id}`,
        name: cardholderName,
        cardType: cardType,
        cardNumber: `****${cardLast4}`,
        address: billingAddress,
        zipcode: billingZipcode,
        applicationId: application.id,
      },
    });

    const passengers = await prisma.passenger.findMany({
      where: { applicationId: application.id },
      select: { fullName: true },
    });

    const applicationTotal = await getApplicationOrderTotal({
      visaTypeId: application.visaTypeId,
      destinationId: application.destinationId,
      passengerCount: application.passengerCount,
      total: application.total,
    });

    const passengerNames = passengers.map((p) => p.fullName?.toLowerCase().trim()).filter(Boolean);
    const cardholderNameLower = cardholderName.toLowerCase().trim();
    const nameMatches = passengerNames.some((name) => name === cardholderNameLower);

    let riskStatus: string;
    let riskActivityTitle: string;
    let riskActivityDescription: string;

    if (!nameMatches) {
      riskStatus = 'Not Passed';
      riskActivityTitle = 'Risk - Not Passed';
      riskActivityDescription = 'System automatically failed Risk. Name did not match.';
    } else if (applicationTotal >= 900) {
      riskStatus = 'Not Passed';
      riskActivityTitle = 'Risk - Not Passed';
      riskActivityDescription = `System automatically failed Risk. Order total is $900 or more ($${applicationTotal.toFixed(2)}).`;
    } else {
      riskStatus = 'Passed';
      riskActivityTitle = 'Risk - Passed';
      riskActivityDescription = 'System automatically passed Risk. Name matched.';
    }

    const risk = await prisma.risk.create({
      data: {
        id: `risk_${application.id}`,
        status: riskStatus,
        applicationId: application.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUpdated: new Date(),
      },
    });

    await prisma.riskActivity.create({
      data: {
        id: `risk_activity_${risk.id}`,
        title: riskActivityTitle,
        description: riskActivityDescription,
        riskId: risk.id,
      },
    });

    const emailResult = await sendEmail({
      template: 'payment-confirmation',
      data: { applicationId: applicationId },
    });

    if (!emailResult.success) {
      console.error(
        `Webhook Error: The sendEmail service returned an error for application ${applicationId}. Error:`,
        emailResult.error
      );
    }
  } catch (error) {
    console.error(`Webhook Error in handlePaymentSuccess for application ${applicationId}:`, error);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const applicationId = paymentIntent.metadata.applicationId;

  if (!applicationId) {
    console.error(
      'Webhook Error: No applicationId found in payment intent metadata for failed payment.'
    );
    return;
  }

  try {
    const application = await prisma.application.findUnique({
      where: { applicationId },
    });

    if (!application) {
      console.error(
        `Webhook Error: Application not found for failed payment, applicationId: ${applicationId}`
      );
      return;
    }

    await prisma.application.update({
      where: { applicationId },
      data: {
        paymentStatus: 'Payment Failed',
      },
    });

    await prisma.stripeActivity.create({
      data: {
        id: `payment_${paymentIntent.id}`,
        applicationId: application.id,
        type: 'Payment',
        title: 'Payment Failed',
        amount: paymentIntent.amount / 100,
        status: 'failed',
        transactionId: `payment_${paymentIntent.id}`,
        description:
          `Failed payment of $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()}. ` +
          `Reason: ${paymentIntent.last_payment_error?.message || 'Unknown reason'}.`,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error(`Webhook Error in handlePaymentFailure for application ${applicationId}:`, error);
  }
}
