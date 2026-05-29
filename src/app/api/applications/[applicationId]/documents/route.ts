import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession } from '@/lib/auth';
import { sanitizeFileName, validateFileType } from '@/lib/sanitize';

// Helper function to get MIME type from file extension
function getMimeTypeFromExtension(extension: string): string {
  const mimeTypes: { [key: string]: string } = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    txt: 'text/plain',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string }> }
) {
  try {
    const { applicationId } = await params;

    // Validate user session
    const sessionToken = request.cookies.get('session_token')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        {
          error: 'AUTHENTICATION_REQUIRED',
          message:
            "For your security, document uploads are only available through our secure portal when you're logged in. We've automatically created an account for your convenience using the email you provided in Step 1.",
          applicationId: applicationId,
        },
        { status: 401 }
      );
    }

    const accountData = await validateSession(sessionToken);
    if (!accountData) {
      return NextResponse.json(
        {
          error: 'AUTHENTICATION_REQUIRED',
          message:
            "For your security, document uploads are only available through our secure portal when you're logged in. We've automatically created an account for your convenience using the email you provided in Step 1.",
          applicationId: applicationId,
        },
        { status: 401 }
      );
    }

    // Verify the application belongs to the user
    const application = await prisma.application.findUnique({
      where: { applicationId },
      select: { id: true, accountId: true },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.accountId !== accountData.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Enhanced file validation
    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const maxFiles = 15;
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/bmp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (files.length > maxFiles) {
      return NextResponse.json({ error: `Maximum ${maxFiles} files allowed` }, { status: 400 });
    }

    const uploadedDocuments = [];

    for (const file of files) {
      try {
        // Validate file size
        if (file.size > maxFileSize) {
          return NextResponse.json({ error: `${file.name} exceeds 20MB limit` }, { status: 400 });
        }

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { error: `${file.name} has an unsupported file type` },
            { status: 400 }
          );
        }

        // Convert file to buffer for magic byte validation
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Validate file type using magic bytes
        if (!validateFileType(buffer, allowedTypes)) {
          return NextResponse.json(
            { error: `${file.name} file type validation failed` },
            { status: 400 }
          );
        }

        // Sanitize file name
        const sanitizedFileName = sanitizeFileName(file.name);
        if (!sanitizedFileName) {
          return NextResponse.json({ error: `Invalid file name: ${file.name}` }, { status: 400 });
        }

        // Get file extension
        const fileExtension = sanitizedFileName.split('.').pop()?.toLowerCase() || 'unknown';

        // Create document record
        const document = await prisma.applicationDocument.create({
          data: {
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            applicationId: application.id,
            name: sanitizedFileName,
            type: file.type || getMimeTypeFromExtension(fileExtension), // Store MIME type, not extension
            content: buffer,
            status: 'Pending',
            uploadedBy: accountData.id,
            updatedAt: new Date(),
          },
        });

        uploadedDocuments.push({
          id: document.id,
          name: document.name,
          type: document.type,
          uploadedAt: document.uploadedAt,
        });
      } catch (error) {
        console.error('Error saving document:', error);
        return NextResponse.json({ error: `Failed to save ${file.name}` }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: 'Documents uploaded successfully',
      uploadedFiles: uploadedDocuments,
    });
  } catch (error) {
    console.error('Error uploading documents:', error);
    return NextResponse.json({ error: 'Failed to upload documents' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
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

    // Verify the application belongs to the user
    const application = await prisma.application.findUnique({
      where: { applicationId },
      select: { id: true, accountId: true },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.accountId !== accountData.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch documents from ApplicationDocument table
    const documents = await prisma.applicationDocument.findMany({
      where: { applicationId: application.id },
      select: {
        id: true,
        name: true,
        type: true,
        status: true,
        uploadedAt: true,
        uploadedBy: true,
      },
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json({
      documents: documents.map((doc) => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        status: doc.status,
        uploadedAt: doc.uploadedAt,
        uploadedBy: doc.uploadedBy,
      })),
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
