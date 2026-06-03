'use client';

import { useState, useEffect } from 'react';
import { ApplicationData } from '@/types/index';
import { formatDisplayDate } from '@/lib/date';

interface Step4DocumentsProps {
  applicationData: ApplicationData;
}

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  required: boolean;
  source: 'visaType' | 'custom';
  passengerId?: string;
  passengerName?: string;
}

interface UploadedDocument {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  passengerName: string;
  documentType: string;
}

type UploadError = string | null | { type: 'AUTH'; message: string; applicationId: string };

export default function Step4Documents({ applicationData }: Step4DocumentsProps) {
  const [isApplicationInfoExpanded, setIsApplicationInfoExpanded] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<UploadError>(null);
  const [documentRequirements, setDocumentRequirements] = useState<DocumentRequirement[]>([]);
  const [isLoadingRequirements, setIsLoadingRequirements] = useState(true);

  // Load document requirements and existing documents on component mount
  useEffect(() => {
    const loadData = async () => {
      if (!applicationData.applicationId) return;

      try {
        // Load document requirements
        const requirementsResponse = await fetch(
          `/api/applications/${applicationData.applicationId}/document-requirements`
        );
        if (requirementsResponse.ok) {
          const requirementsData = await requirementsResponse.json();
          setDocumentRequirements(requirementsData.requirements);
        }

        // Load existing documents
        const documentsResponse = await fetch(
          `/api/applications/${applicationData.applicationId}/documents`
        );
        if (documentsResponse.ok) {
          const documentsData = await documentsResponse.json();
          // Transform API response to match UploadedDocument interface
          const transformedDocuments: UploadedDocument[] = documentsData.documents.map(
            (doc: unknown) => {
              const d = doc as { id: string; name: string; uploadedAt: string; type: string };
              return {
                id: d.id,
                fileName: d.name,
                fileSize: 0, // We don't get file size from API anymore
                uploadDate: d.uploadedAt,
                passengerName: 'Unknown', // We don't have passenger info in the API response
                documentType: d.type,
              };
            }
          );
          setUploadedDocuments(transformedDocuments);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoadingRequirements(false);
      }
    };

    loadData();
  }, [applicationData.applicationId]);

  const formatUploadDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const maxFileSize = 20 * 1024 * 1024; // 20MB
    const maxFiles = 15 * (applicationData.passengers?.length || 1);
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

    // Validate file count
    if (files.length > maxFiles) {
      setUploadError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file sizes and types
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxFileSize) {
        setUploadError(`${file.name} exceeds 20MB limit`);
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        setUploadError(`${file.name} has an unsupported file type`);
        return;
      }
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
      formData.append('applicationId', applicationData.applicationId!);

      const response = await fetch(`/api/applications/${applicationData.applicationId}/documents`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'AUTHENTICATION_REQUIRED') {
          setUploadError({
            type: 'AUTH',
            message: errorData.message,
            applicationId: errorData.applicationId,
          });
          return;
        }
        throw new Error(errorData.error || 'Upload failed');
      }

      // Add uploaded files to the list
      const newDocuments: UploadedDocument[] = Array.from(files).map((file, index) => ({
        id: `doc-${Date.now()}-${index}`,
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        passengerName: applicationData.passengers?.[0]?.fullName || 'Unknown',
        documentType: 'Passport', // This would be selected by user
      }));

      setUploadedDocuments((prev) => [...prev, ...newDocuments]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (documentId: string, fileName: string) => {
    try {
      console.log('Starting download for:', fileName, 'with ID:', documentId);
      const response = await fetch(
        `/api/applications/${applicationData.applicationId}/documents/${documentId}/download`
      );

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const blob = await response.blob();
        console.log('Blob type:', blob.type);
        console.log('Blob size:', blob.size);

        // Create blob with proper type if it's not set correctly
        const contentType = response.headers.get('content-type') || blob.type;
        console.log('Content-Type from headers:', response.headers.get('content-type'));
        console.log('Final content type:', contentType);

        const finalBlob = new Blob([blob], { type: contentType });
        let downloadUrl = window.URL.createObjectURL(finalBlob);
        const a = document.createElement('a');
        a.href = downloadUrl;

        // Ensure proper file extension
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        if (fileExtension === 'pdf' && contentType !== 'application/pdf') {
          console.log('Fixing PDF content type');
          const correctedBlob = new Blob([blob], { type: 'application/pdf' });
          const correctedUrl = window.URL.createObjectURL(correctedBlob);
          a.href = correctedUrl;
          window.URL.revokeObjectURL(downloadUrl);
          downloadUrl = correctedUrl;
        }

        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
        console.log('Download completed for:', fileName);
      } else {
        console.error('Download failed:', response.status, response.statusText);
        alert('Failed to download document. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  // Render custom auth error message
  if (
    uploadError &&
    typeof uploadError === 'object' &&
    'type' in uploadError &&
    uploadError.type === 'AUTH'
  ) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Secure Document Upload</h2>
        <p className="text-gray-700 mb-4">{uploadError.message}</p>
        <ol className="text-left mb-4 text-gray-900">
          <li>
            1. Click <b>Login Now</b> below
          </li>
          <li>2. Use your email from Step 1</li>
          <li>
            3. Click <b>Forgot Password</b> to set up your account password
          </li>
          <li>4. Once logged in, return to your application to upload documents</li>
        </ol>
        <p className="text-gray-700 mb-4">
          <b>Alternative: Email Submission</b>
          <br />
          You can also email your documents directly to{' '}
          <a href="mailto:visa@unitedevisa.com" className="text-brand-primary underline">
            visa@unitedevisa.com
          </a>{' '}
          with the subject line: <b>Documents for Application {uploadError.applicationId}</b>
        </p>
        <p className="text-gray-700 mb-6">
          At any point, you can log in to our portal to track your documents and application status.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/login"
            className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-primary-dark transition"
          >
            Login Now
          </a>
          <a
            href="mailto:visa@unitedevisa.com?subject=Documents for Application {uploadError.applicationId}"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Email Documents
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Step 4: Document Upload</h2>
        <p className="text-gray-600">
          Please upload the required documents for your visa application. All documents must be
          clear and legible.
        </p>
      </div>

      {/* Application Information - Expandable */}
      <div className="mb-8">
        <button
          onClick={() => setIsApplicationInfoExpanded(!isApplicationInfoExpanded)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="font-semibold text-gray-900">Application Information</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isApplicationInfoExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isApplicationInfoExpanded && (
          <div className="mt-4 p-6 bg-gray-50 rounded-lg space-y-6">
            {/* Step 1 Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact & Visa Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-gray-900 font-medium">{applicationData.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-gray-900 font-medium">{applicationData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Phone</label>
                  <p className="text-gray-900 font-medium">
                    {applicationData.areaCode} {applicationData.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Gender</label>
                  <p className="text-gray-900 font-medium">{applicationData.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Travel Start Date
                  </label>
                  <p className="text-gray-900 font-medium">
                    {applicationData.stayingStart
                      ? formatDisplayDate(applicationData.stayingStart, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Not set'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Travel End Date</label>
                  <p className="text-gray-900 font-medium">
                    {applicationData.stayingEnd
                      ? formatDisplayDate(applicationData.stayingEnd, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Information</h3>
              <div className="space-y-4">
                {applicationData.passengers?.map((passenger, index) => (
                  <div
                    key={passenger.id || index}
                    className="p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">Passenger {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <p className="text-gray-900">{passenger.fullName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Date of Birth
                        </label>
                        <p className="text-gray-900">
                          {passenger.dateOfBirth
                            ? formatDisplayDate(passenger.dateOfBirth, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Nationality
                        </label>
                        <p className="text-gray-900">{passenger.nationality || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Passport Number
                        </label>
                        <p className="text-gray-900">
                          {passenger.passportNumber || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document Requirements */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>

        {isLoadingRequirements ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading document requirements...</span>
          </div>
        ) : documentRequirements.length === 0 ? (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Required Documents</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Required
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">A Valid Passport</p>
                    <p className="text-sm text-gray-600">
                      Your passport must be valid for at least 6 months from your date of arrival in
                      Vietnam.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Required
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">A Portrait Photo</p>
                    <p className="text-sm text-gray-600">
                      A recent passport-sized photo with a clear view of your face.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {applicationData.passengers?.map((passenger, passengerIndex) => (
              <div
                key={passenger.id || passengerIndex}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-medium text-gray-900 mb-3">
                  Documents for {passenger.fullName}
                </h4>
                <div className="space-y-3">
                  {documentRequirements
                    .filter((req) => !req.passengerId || req.passengerId === passenger.id)
                    .map((requirement) => (
                      <div key={requirement.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {requirement.required ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Required
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Optional
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{requirement.name}</p>
                          <p className="text-sm text-gray-600">{requirement.description}</p>
                          {requirement.source === 'custom' && (
                            <p className="text-xs text-brand-primary mt-1">Custom requirement</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.txt,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${
              isUploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              'Choose Files'
            )}
          </label>

          <p className="mt-2 text-sm text-gray-600">
            Accepted formats: JPG, JPEG, PNG, GIF, BMP, PDF, TXT, DOC, DOCX, XLS, XLSX
          </p>
          <p className="text-sm text-gray-600">
            Maximum file size: 20MB per file | Maximum files:{' '}
            {15 * (applicationData.passengers?.length || 1)}
          </p>
        </div>

        {/* Document Retention Disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-amber-800">Document Retention Policy</h4>
              <p className="mt-1 text-sm text-amber-700">
                All uploaded documents will be automatically deleted from our servers 7 days after
                your visa result is sent. Please ensure you have backup copies of all important
                documents for your records.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Documents */}
      {uploadedDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
          <div className="space-y-3">
            {uploadedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.fileName}</p>
                    <p className="text-sm text-gray-600">
                      {doc.passengerName} • {formatUploadDate(doc.uploadDate)}
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleDownload(doc.id, doc.fileName)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-brand-primary-dark bg-brand-surface-alt hover:bg-brand-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
