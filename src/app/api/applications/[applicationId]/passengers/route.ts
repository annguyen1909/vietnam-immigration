import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '../../../../../../generated/prisma';
import { AddOn } from '@/types/index';
import {
  buildAdditionalChargesDetails,
  computeFullOrderTotal,
  resolveUrgencyFeeTotal,
  sumInsuranceAddOns,
} from '@/lib/orderTotal';
import { type UrgencyValue } from '@/lib/urgency';
import { countries } from '@/data/countries';
import { isNationalityCodeAllowed } from '@/lib/nationalityEligibility';

const prisma = new PrismaClient();

async function savePassengers(
  applicationId: string,
  body: {
    passengers?: Record<string, unknown>[];
    promotionAmount?: number;
    urgency?: string;
  }
) {
  const { passengers, promotionAmount, urgency: urgencyFromBody } = body;

  if (!passengers || !Array.isArray(passengers)) {
    return NextResponse.json(
      { error: 'Passengers data is required and must be an array' },
      { status: 400 }
    );
  }

  const passengersWithoutIds = passengers.filter((p) => !p.id);
  if (passengersWithoutIds.length > 0) {
    return NextResponse.json({ error: 'All passengers must have valid IDs' }, { status: 400 });
  }

  const application = await prisma.application.findUnique({
    where: { applicationId },
    include: {
      VisaType: {
        select: { allowedNationalities: true },
      },
    },
  });

  if (!application) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  const unsupportedNationality = passengers.find((passenger) => {
    const code = passenger.nationality;
    return (
      typeof code !== 'string' ||
      !countries.some((country) => country.code === code.toUpperCase()) ||
      !isNationalityCodeAllowed(application.VisaType.allowedNationalities, code)
    );
  });

  if (unsupportedNationality) {
    return NextResponse.json(
      { error: 'One or more passengers are not eligible for the selected Vietnam eVisa.' },
      { status: 400 }
    );
  }

  const effectiveUrgency = ((urgencyFromBody || application.urgency || '') as UrgencyValue) || '';

  const updatedPassengers = await Promise.all(
    passengers.map((passengerData) => {
      const addOns = passengerData.addOns as AddOn[] | undefined;
      return prisma.passenger.update({
        where: { id: passengerData.id as string },
        data: {
          fullName: passengerData.fullName as string,
          nationality: getCountryNameFromCode(passengerData.nationality as string),
          passportNumber: passengerData.passportNumber as string,
          dateOfBirth: new Date(passengerData.dateOfBirth as string),
          gender: passengerData.gender as string,
          status: 'active',
          addOns:
            addOns && addOns.length > 0
              ? (JSON.parse(JSON.stringify(addOns)) as Prisma.InputJsonValue)
              : Prisma.JsonNull,
        },
      });
    })
  );

  const insuranceCharges = sumInsuranceAddOns(updatedPassengers);
  const urgencyFeeTotal = await resolveUrgencyFeeTotal(
    effectiveUrgency,
    application.passengerCount || updatedPassengers.length || 1
  );
  const newTotal = await computeFullOrderTotal(application, effectiveUrgency, updatedPassengers);
  const additionalChargesDetails = buildAdditionalChargesDetails(
    updatedPassengers,
    effectiveUrgency,
    urgencyFeeTotal
  );

  const updateData: {
    status: string;
    total: number;
    urgency: string;
    additionalCharges: number;
    additionalChargesDetails?: Prisma.InputJsonValue;
    promotionAmount?: number;
  } = {
    status: 'Waiting for Payment',
    total: newTotal,
    urgency: effectiveUrgency,
    additionalCharges: insuranceCharges,
    additionalChargesDetails,
  };

  if (typeof promotionAmount === 'number' && !isNaN(promotionAmount)) {
    updateData.promotionAmount = promotionAmount;
  }

  await prisma.application.update({
    where: { applicationId },
    data: updateData,
  });

  return NextResponse.json({
    message: 'Passengers updated successfully',
    passengers: updatedPassengers,
    total: newTotal,
    urgency: effectiveUrgency,
    additionalCharges: insuranceCharges,
    ...(typeof promotionAmount === 'number' && !isNaN(promotionAmount) ? { promotionAmount } : {}),
  });
}

// Function to convert country code to full country name
function getCountryNameFromCode(code: string): string {
  const country = countries.find((c) => c.code === code.toUpperCase());
  return country ? country.name : code;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;
    const body = await request.json();
    return await savePassengers(applicationId, body);
  } catch (error) {
    console.error('Error updating passengers:', error);
    return NextResponse.json({ error: 'Failed to update passengers' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;
    const body = await request.json();
    return await savePassengers(applicationId, body);
  } catch (error) {
    console.error('Error updating passengers:', error);
    return NextResponse.json({ error: 'Failed to update passengers' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
