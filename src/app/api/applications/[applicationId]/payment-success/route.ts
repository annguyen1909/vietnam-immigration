import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStripe } from '@/lib/stripe';
import { getApplicationOrderTotal } from '@/lib/applicationTotal';
import { getServiceFee } from '@/lib/serviceFee';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;
    const body = await request.json();
    const { paymentIntentId, billingDetails } = body;

    if (!applicationId || !paymentIntentId) {
      return NextResponse.json(
        { error: 'Missing applicationId or paymentIntentId' },
        { status: 400 }
      );
    }

    console.log('Payment Success API called with:', {
      applicationId,
      paymentIntentId,
      hasBillingDetails: !!billingDetails,
    });

    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      console.error('Payment intent not succeeded:', paymentIntent.status);
      return NextResponse.json({ error: 'Payment not succeeded' }, { status: 400 });
    }

    console.log('Payment intent succeeded, updating application status...');

    // Get the application
    const application = await prisma.application.findUnique({
      where: { applicationId },
      select: {
        id: true,
        status: true,
        paymentStatus: true,
        visaTypeId: true,
        destinationId: true,
        passengerCount: true,
        total: true,
      },
    });

    if (!application) {
      console.error('Application not found:', applicationId);
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const paymentAlreadyCompleted =
      application.paymentStatus === 'Payment Completed' ||
      application.status === 'Collecting Documents';

    let updatedApplication = application;

    if (paymentAlreadyCompleted) {
      console.log('Payment already completed for application:', applicationId);
      // If webhook ran first, CardHolder may have "Billing Form Data Missing". Still save
      // billing details when the client sends them, and re-run Risk with correct name.
      if (!billingDetails) {
        return NextResponse.json({
          success: true,
          status: application.status,
          paymentStatus: application.paymentStatus,
        });
      }
      console.log('Backfilling CardHolder and re-running Risk with billing form data');
    } else {
      // Update application status and payment status
      updatedApplication = await prisma.application.update({
        where: { applicationId },
        data: {
          status: 'Collecting Documents',
          paymentStatus: 'Payment Completed',
        },
      });

      console.log('Updated application status:', {
        applicationId,
        status: updatedApplication.status,
        paymentStatus: updatedApplication.paymentStatus,
      });
    }

    // Get card details from payment method
    let cardType = 'Unknown';
    let cardLast4 = '****';

    if (paymentIntent.payment_method) {
      try {
        const paymentMethod = await getStripe().paymentMethods.retrieve(
          paymentIntent.payment_method as string
        );
        cardLast4 = paymentMethod.card?.last4 || '****';
        cardType = paymentMethod.card?.brand || 'Unknown';
      } catch (error) {
        console.error('Error retrieving payment method:', error);
      }
    }

    // Build full address from billing form data
    let fullAddress = '';
    if (billingDetails?.address) {
      const addressParts = [billingDetails.address, billingDetails.country].filter(Boolean);
      fullAddress = addressParts.join(', ');
    }

    // Create CardHolder record
    if (billingDetails) {
      try {
        await prisma.cardHolder.upsert({
          where: { applicationId: application.id },
          update: {
            name: billingDetails.name,
            cardType: cardType,
            cardNumber: `****${cardLast4}`,
            address: fullAddress,
            zipcode: billingDetails.zipcode,
          },
          create: {
            id: `card_${application.id}`,
            name: billingDetails.name,
            cardType: cardType,
            cardNumber: `****${cardLast4}`,
            address: fullAddress,
            zipcode: billingDetails.zipcode,
            applicationId: application.id,
          },
        });

        console.log('Created CardHolder record for application:', applicationId);
      } catch (error) {
        console.error('Error creating CardHolder record:', error);
      }
    }

    // Create or update StripeActivity record (upsert so backfill can update description with real name)
    try {
      await prisma.stripeActivity.upsert({
        where: { id: `payment_${paymentIntent.id}` },
        update: {
          status: 'succeeded',
          amount: paymentIntent.amount / 100,
          description: `Payment of $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} - Made by ${billingDetails?.name || 'Cardholder'}.`,
          timestamp: new Date(),
        },
        create: {
          id: `payment_${paymentIntent.id}`,
          applicationId: application.id,
          type: 'Payment',
          title: 'Payment',
          amount: paymentIntent.amount / 100,
          status: 'succeeded',
          transactionId: `payment_${paymentIntent.id}`,
          description: `Payment of $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()} - Made by ${billingDetails?.name || 'Cardholder'}.`,
          timestamp: new Date(),
        },
      });

      console.log('Created/Updated StripeActivity record for payment:', paymentIntent.id);
    } catch (error) {
      console.error('Error creating StripeActivity record:', error);
    }

    // Create Risk and RiskActivity records
    try {
      console.log('Creating Risk and RiskActivity records...');

      // Get passengers for name matching and pricing
      const passengers = await prisma.passenger.findMany({
        where: { applicationId: application.id },
        select: { fullName: true },
      });

      console.log('Found passengers:', passengers);

      const applicationTotal = await getApplicationOrderTotal(application);
      const passengerCount = application.passengerCount || 1;
      const visaType = await prisma.visaType.findUnique({
        where: { id: application.visaTypeId },
        select: { fees: true },
      });
      const governmentFee = visaType?.fees || 0;
      const serviceFee = await getServiceFee(application.destinationId, application.visaTypeId);

      console.log('Application total calculation:', {
        governmentFee,
        serviceFee,
        passengerCount,
        total: applicationTotal,
      });

      // Check if cardholder name matches any passenger name
      const passengerNames = passengers
        .map((p) => p.fullName?.toLowerCase().trim())
        .filter(Boolean);
      const cardholderNameLower = (billingDetails?.name || 'Cardholder').toLowerCase().trim();
      const nameMatches = passengerNames.some((name) => name === cardholderNameLower);

      console.log('Name matching check:', {
        cardholderName: billingDetails?.name || 'Cardholder',
        cardholderNameLower,
        passengerNames,
        nameMatches,
      });

      // Determine risk status based on rules
      let riskStatus: string;
      let riskActivityType: string;
      let riskActivityTitle: string;
      let riskActivityDescription: string;

      if (!nameMatches) {
        // Rule 1: Name doesn't match
        riskStatus = 'Not Passed';
        riskActivityType = 'System';
        riskActivityTitle = 'Risk - Not Passed';
        riskActivityDescription = 'System automatically failed Risk. Name did not match.';
      } else if (applicationTotal >= 900) {
        // Rule 2: Name matches but total >= $900
        riskStatus = 'Not Passed';
        riskActivityType = 'System';
        riskActivityTitle = 'Risk - Not Passed';
        riskActivityDescription = `System automatically failed Risk. Order total is $900 or more ($${applicationTotal.toFixed(2)}).`;
      } else {
        // Rule 3: Name matches and total < $900
        riskStatus = 'Passed';
        riskActivityType = 'System';
        riskActivityTitle = 'Risk - Passed';
        riskActivityDescription = 'System automatically passed Risk. Name matched.';
      }

      console.log('Risk assessment:', {
        riskStatus,
        riskActivityType,
        riskActivityTitle,
        riskActivityDescription,
      });

      // Create or update Risk record (upsert so backfill can update status when re-running with real name)
      const risk = await prisma.risk.upsert({
        where: { id: `risk_${application.id}` },
        update: {
          status: riskStatus,
          updatedAt: new Date(),
          lastUpdated: new Date(),
        },
        create: {
          id: `risk_${application.id}`,
          status: riskStatus,
          applicationId: application.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastUpdated: new Date(),
        },
      });

      console.log('Created/Updated Risk record:', risk.id, risk.status);

      // Create RiskActivity record
      const riskActivity = await prisma.riskActivity.create({
        data: {
          id: `risk_activity_${risk.id}_${Date.now()}`,
          riskId: risk.id,
          createdAt: new Date(),
          description: riskActivityDescription,
          type: riskActivityType,
          details: JSON.stringify({
            cardholderName: billingDetails?.name || 'Cardholder',
            passengerNames,
            applicationTotal,
            nameMatches,
            governmentFee: governmentFee,
            serviceFee: serviceFee,
            passengerCount: passengerCount,
            orderTotal: applicationTotal,
          }),
          timestamp: new Date(),
          title: riskActivityTitle,
        },
      });

      console.log('Created RiskActivity record:', riskActivity.id);
    } catch (riskError) {
      console.error('Error creating Risk and RiskActivity records:', riskError);
      // Continue without Risk records if it fails
    }

    return NextResponse.json({
      success: true,
      status: updatedApplication.status,
      paymentStatus: updatedApplication.paymentStatus,
    });
  } catch (error) {
    console.error('Error in payment success API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process payment success', details: errorMessage },
      { status: 500 }
    );
  }
  // No finally block with $disconnect() - connection stays alive for singleton pattern (matches tanzania-evisa)
}
