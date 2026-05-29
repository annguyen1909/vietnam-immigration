import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ applicationId: string; documentId: string }> }
) {
  try {
    const { applicationId, documentId } = await params;
    console.log('Download request for:', { applicationId, documentId });

    // Validate user session
    const sessionToken = request.cookies.get('session_token')?.value;
    if (!sessionToken) {
      console.log('No session token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accountData = await validateSession(sessionToken);
    if (!accountData) {
      console.log('Invalid session token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the application belongs to the user
    const application = await prisma.application.findUnique({
      where: { applicationId },
      select: { id: true, accountId: true },
    });

    if (!application) {
      console.log('Application not found:', applicationId);
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.accountId !== accountData.id) {
      console.log('Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the specific document with content
    const document = await prisma.applicationDocument.findFirst({
      where: {
        id: documentId,
        applicationId: application.id,
      },
      select: {
        id: true,
        name: true,
        type: true,
        content: true,
        status: true,
      },
    });

    if (!document) {
      console.log('Document not found:', documentId);
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    console.log('Document found:', {
      id: document.id,
      name: document.name,
      type: document.type,
      contentLength: document.content?.length,
    });

    // Determine content type based on file extension
    const getContentType = (storedType: string) => {
      // If stored type is already a MIME type, use it
      if (storedType.includes('/')) {
        return storedType;
      }

      // Otherwise, treat it as a file extension and convert
      const typeMap: { [key: string]: string } = {
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
      return typeMap[storedType.toLowerCase()] || 'application/octet-stream';
    };

    // Create response with file content
    // Ensure content is properly converted to Buffer if it isn't already
    const contentBuffer = Buffer.isBuffer(document.content)
      ? document.content
      : Buffer.from(document.content);

    console.log('Creating response with content length:', contentBuffer.length);

    const response = new NextResponse(contentBuffer);
    response.headers.set('Content-Type', getContentType(document.type));
    response.headers.set('Content-Disposition', `attachment; filename="${document.name}"`);
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    console.log('Response created successfully');
    return response;
  } catch (error) {
    console.error('Error downloading document:', error);
    return NextResponse.json({ error: 'Failed to download document' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
