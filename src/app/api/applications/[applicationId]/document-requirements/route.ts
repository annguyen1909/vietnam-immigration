import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession } from '@/lib/auth';

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  source: 'visaType' | 'custom';
  passengerId?: string;
  passengerName?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;

    // Validate user session
    const sessionToken = request.cookies.get('session_token')?.value;
    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accountData = await validateSession(sessionToken);
    if (!accountData) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get application with visa type and custom requirements
    const application = await prisma.application.findUnique({
      where: { applicationId },
      include: {
        VisaType: {
          select: {
            requiredDocuments: true,
          },
        },
        Passenger: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.accountId !== accountData.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get custom requirements separately since it might not be a direct relation
    const customRequirements = await prisma.customRequirement.findMany({
      where: { applicationId: application.id },
      select: {
        id: true,
        title: true,
        passengerId: true,
      },
    });

    const requirements: DocumentRequirement[] = [];

    // Parse visa type required documents
    if (application.VisaType?.requiredDocuments) {
      let visaTypeDocs;
      try {
        // First try to parse as JSON
        visaTypeDocs = JSON.parse(application.VisaType.requiredDocuments);
        if (Array.isArray(visaTypeDocs)) {
          visaTypeDocs.forEach(
            (doc: {
              id?: string;
              name?: string;
              title?: string;
              description?: string;
              details?: string;
              required?: boolean;
            }) => {
              requirements.push({
                id: `visa-${doc.id || doc.name}`,
                name: doc.name || doc.title || 'Required Document',
                description:
                  doc.description || doc.details || 'Required document for visa application',
                required: doc.required !== false, // Default to true unless explicitly false
                source: 'visaType',
              });
            }
          );
        }
      } catch (error) {
        console.error('Error parsing visa type required documents as JSON:', error);

        // Fallback: treat as plain text and create a single requirement
        const plainText = application.VisaType.requiredDocuments;
        if (plainText && typeof plainText === 'string' && plainText.trim()) {
          requirements.push({
            id: 'visa-requirements',
            name: 'Visa Requirements',
            description: plainText,
            required: true,
            source: 'visaType',
          });
        }
      }
    }

    // Add custom requirements
    customRequirements.forEach((customReq: { id: string; title: string; passengerId: string }) => {
      const passenger = application.Passenger.find(
        (p: { id: string; fullName: string | null }) => p.id === customReq.passengerId
      );
      requirements.push({
        id: `custom-${customReq.id}`,
        name: customReq.title,
        description: `Custom requirement for ${passenger?.fullName || 'passenger'}`,
        required: true,
        source: 'custom',
        passengerName: passenger?.fullName || undefined,
        passengerId: customReq.passengerId,
      });
    });

    // If no requirements found, provide default ones
    if (requirements.length === 0) {
      requirements.push(
        {
          id: 'passport',
          name: 'Passport',
          description: 'Valid passport with at least 6 months validity from entry date',
          required: true,
          source: 'visaType',
        },
        {
          id: 'photo',
          name: 'Passport Photo',
          description: 'Recent passport-sized photograph (35mm x 45mm)',
          required: true,
          source: 'visaType',
        },
        {
          id: 'flight',
          name: 'Flight Itinerary',
          description: 'Round-trip flight booking confirmation',
          required: true,
          source: 'visaType',
        },
        {
          id: 'hotel',
          name: 'Hotel Booking',
          description: 'Accommodation booking confirmation for entire stay',
          required: true,
          source: 'visaType',
        }
      );
    }

    return NextResponse.json({
      requirements,
    });
  } catch (error) {
    console.error('Error fetching document requirements:', error);
    return NextResponse.json({ error: 'Failed to fetch document requirements' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
