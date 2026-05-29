import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';
import { hash } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { validateSession } from '@/lib/auth';
import { getServiceFee } from '@/lib/serviceFee';
import { resolveUrgencyFeePerPax, type UrgencyValue } from '@/lib/urgency';
import { prisma as sharedPrisma } from '@/lib/prisma';

const prismaClient = new PrismaClient();

// Function to generate a unique application ID
async function generateUniqueApplicationId(): Promise<string> {
  let applicationId: string = '';
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    applicationId = `VN${randomDigits}`;

    const existingApplication = await prismaClient.application.findUnique({
      where: { applicationId },
    });

    if (!existingApplication) {
      isUnique = true;
    }
  }
  return applicationId;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      destinationId,
      visaTypeId,
      passengerCount,
      stayingStart,
      stayingEnd,
      fullName,
      email,
      areaCode,
      phoneNumber,
      gender,
      portType,
      portName,
      urgency,
    } = body;

    // Validate required fields
    if (!destinationId || !visaTypeId || !passengerCount) {
      return NextResponse.json({ error: 'Missing required visa details' }, { status: 400 });
    }

    if (!fullName || !email || !areaCode || !phoneNumber || !gender) {
      return NextResponse.json({ error: 'Missing required personal information' }, { status: 400 });
    }

    // Fetch visa type to get the fee
    const visaType = await prismaClient.visaType.findUnique({
      where: { id: visaTypeId },
      select: { fees: true },
    });

    if (!visaType || !visaType.fees) {
      return NextResponse.json({ error: 'Visa type not found or fee not set' }, { status: 400 });
    }

    // Get dynamic service fee from database
    const serviceFeePerPax = await getServiceFee(destinationId, visaTypeId);

    // Calculate total: (visa fee × passenger count) + (service fee × passenger count)
    const governmentFeePerPax = visaType.fees;
    const governmentFee = governmentFeePerPax * passengerCount;
    const serviceFee = serviceFeePerPax * passengerCount;
    const urgencyFeePerPax = await resolveUrgencyFeePerPax(
      (urgency as UrgencyValue) || '',
      async (name) => {
        try {
          const addon = await sharedPrisma.addOnConfig.findFirst({
            where: {
              type: { equals: 'urgency', mode: 'insensitive' },
              name,
              isActive: true,
            },
            select: { pricePerPax: true },
          });
          return addon?.pricePerPax ?? null;
        } catch {
          return null;
        }
      }
    );
    const urgencyFee = urgencyFeePerPax * passengerCount;
    const total = governmentFee + serviceFee + urgencyFee;

    const website = 'Vietnam Local Site';

    // 1. Check if account exists with the email address for this website
    let account = await prismaClient.account.findUnique({
      where: {
        email_websiteCreatedAt: {
          email: email.toLowerCase(),
          websiteCreatedAt: website,
        },
      },
    });

    // If account doesn't exist, create an account
    if (!account) {
      const randomPassword = randomUUID(); // You might want to send this to the user
      const hashedPassword = await hash(randomPassword, 12);
      account = await prismaClient.account.create({
        data: {
          email: email.toLowerCase(),
          fullName,
          areaCode,
          phoneNumber,
          gender,
          password: hashedPassword, // Store hashed password
          websiteCreatedAt: website,
        },
      });
    }

    // 2. Generate the application id in format VN + 6 unique random digits
    const newApplicationId = await generateUniqueApplicationId();

    // Create the application
    const application = await prismaClient.application.create({
      data: {
        applicationId: newApplicationId,
        destinationId,
        visaTypeId,
        passengerCount,
        stayingStart: stayingStart ? new Date(stayingStart) : null,
        stayingEnd: stayingEnd ? new Date(stayingEnd) : null,
        accountId: account.id,
        status: 'Lead Open',
        paymentStatus: 'Payment Required',
        total: total,
        urgency: (urgency as string) || null,
        additionalCharges: 0,
        portType: portType || null,
        portName: portName || null,
        // Initialize passengers with snapshot pricing
        Passenger: {
          create: Array.from({ length: passengerCount }, () => ({
            id: randomUUID(),
          })),
        },
      },
      include: {
        Passenger: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json({
      applicationId: application.applicationId,
      accountId: account.id,
      status: application.status,
      total: total,
      urgency: (urgency as string) || '',
      passengerIds: application.Passenger.map((p) => p.id),
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the current user session
    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accountData = await validateSession(sessionToken);

    if (!accountData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all applications for the current user
    const applications = await prisma.application.findMany({
      where: {
        accountId: accountData.id,
      },
      include: {
        VisaType: {
          select: {
            name: true,
            fees: true,
          },
        },
        Passenger: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      applications: applications.map((app) => ({
        id: app.id,
        applicationId: app.applicationId,
        status: app.status,
        paymentStatus: app.paymentStatus,
        passengerCount: app.passengerCount,
        stayingStart: app.stayingStart,
        stayingEnd: app.stayingEnd,
        createdAt: app.createdAt.toISOString(),
        updatedAt: app.updatedAt?.toISOString() || app.createdAt.toISOString(),
        total: app.total,
        VisaType: app.VisaType,
        Passenger: app.Passenger,
      })),
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
