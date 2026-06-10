import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';
import { findAccountByEmail, hashPassword, validateSession } from '@/lib/auth';
import { getServiceFee } from '@/lib/serviceFee';
import { resolveUrgencyFeePerPax, type UrgencyValue } from '@/lib/urgency';

const WEBSITE = 'Vietnam Local Site';

async function generateUniqueApplicationId(): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    const applicationId = `VN${randomDigits}`;

    const existingApplication = await prisma.application.findUnique({
      where: { applicationId },
      select: { id: true },
    });

    if (!existingApplication) {
      return applicationId;
    }
  }

  throw new Error('Could not generate a unique application ID');
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

    const visaType = await prisma.visaType.findUnique({
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
          const addon = await prisma.addOnConfig.findFirst({
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

    let account = await findAccountByEmail(email, WEBSITE);

    if (!account) {
      const hashedPassword = await hashPassword(randomUUID());
      account = await prisma.account.create({
        data: {
          email: email.toLowerCase(),
          fullName,
          areaCode,
          phoneNumber,
          gender,
          password: hashedPassword,
          websiteCreatedAt: WEBSITE,
        },
      });
    }

    // 2. Generate the application id in format VN + 6 unique random digits
    const newApplicationId = await generateUniqueApplicationId();

    // Vietnam apply flow does not collect portType/portName. Omit optional fields when
    // unset so Prisma does not INSERT NULL into columns that may not exist on shared prod DB.
    const urgencyValue = typeof urgency === 'string' ? urgency.trim() : '';
    const portTypeValue = typeof portType === 'string' ? portType.trim() : '';
    const portNameValue = typeof portName === 'string' ? portName.trim() : '';

    const application = await prisma.application.create({
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
        additionalCharges: 0,
        ...(urgencyValue ? { urgency: urgencyValue } : {}),
        ...(portTypeValue ? { portType: portTypeValue } : {}),
        ...(portNameValue ? { portName: portNameValue } : {}),
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
      urgency: urgencyValue,
      passengerIds: application.Passenger.map((p) => p.id),
    });
  } catch (error) {
    console.error('Error creating application:', error);
    const message =
      error instanceof Error && process.env.NODE_ENV !== 'production'
        ? error.message
        : 'Failed to create application';
    return NextResponse.json({ error: message }, { status: 500 });
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
  }
}
