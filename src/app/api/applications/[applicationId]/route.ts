import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;

    const application = await prisma.application.findUnique({
      where: { applicationId: applicationId },
      include: {
        Account: true,
        Passenger: {
          select: {
            id: true,
            fullName: true,
            nationality: true,
            passportNumber: true,
            dateOfBirth: true,
            gender: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        StripeActivity: true,
        CardHolder: true,
        VisaType: {
          select: {
            id: true,
            name: true,
            waitTime: true,
            fees: true,
            requiredDocuments: true,
            allowedNationalities: true,
            destinationId: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Transform the data to match the frontend ApplicationData interface
    const applicationData = {
      applicationId: application.applicationId,
      accountId: application.accountId,
      destinationId: application.destinationId,
      visaTypeId: application.visaTypeId,
      passengerCount: application.passengerCount,
      stayingStart: application.stayingStart?.toISOString(),
      stayingEnd: application.stayingEnd?.toISOString(),
      fullName: application.Account.fullName,
      email: application.Account.email,
      areaCode: application.Account.areaCode,
      phoneNumber: application.Account.phoneNumber,
      gender: application.Account.gender,
      status: application.status,
      paymentStatus: application.paymentStatus,
      updatedAt: application.updatedAt?.toISOString(),
      passengers: application.Passenger.map((passenger) => ({
        id: passenger.id,
        fullName: passenger.fullName || '',
        nationality: passenger.nationality || '',
        passportNumber: passenger.passportNumber || '',
        dateOfBirth: passenger.dateOfBirth?.toISOString() || '',
        gender: passenger.gender || '',
        status: passenger.status || '',
      })),
      passengerIds: application.Passenger.map((p: { id: string }) => p.id),
      total: application.total,
      visa: application.VisaType
        ? {
            id: application.VisaType.id,
            name: application.VisaType.name,
            waitTime: application.VisaType.waitTime,
            fees: application.VisaType.fees,
            requiredDocuments: application.VisaType.requiredDocuments,
            allowedNationalities: application.VisaType.allowedNationalities,
            destinationId: application.VisaType.destinationId,
          }
        : undefined,
      CardHolder: application.CardHolder
        ? {
            name: application.CardHolder.name,
            cardType: application.CardHolder.cardType,
            cardNumber: application.CardHolder.cardNumber,
          }
        : undefined,
      documents: [], // ApplicationDocument would need separate query
      paymentMethod: '',
    };

    return NextResponse.json(applicationData);
  } catch (error) {
    console.error('Error fetching application:', error);
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 });
  }
}
