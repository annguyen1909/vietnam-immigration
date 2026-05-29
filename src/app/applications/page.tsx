'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SiteFooter from '@/components/layout/SiteFooter';

interface Application {
  id: string;
  applicationId: string;
  status: string;
  paymentStatus: string;
  passengerCount: number;
  stayingStart: string;
  stayingEnd: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  VisaType?: {
    name: string;
    fees: number;
  };
  Passenger?: Array<{
    fullName: string;
  }>;
}

export default function ApplicationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        setError('Failed to load applications');
      }
    } catch (error) {
      setError('An error occurred while loading applications');
    } finally {
      setIsLoading(false);
    }
  };

  const getDisplayStatus = (application: Application): string => {
    const { status } = application;

    // Step 1 not finished (no status or very early stage)
    if (!status || status === 'Not Started') {
      return 'Not Finished';
    }

    // Step 2 finished but payment needed
    if (status === 'Lead Open') {
      return 'Not Finished';
    }

    if (status === 'Waiting for Payment') {
      return 'Payment Needed';
    }

    // Direct status mappings
    if (status === 'Collecting Documents') return 'Collecting Documents';
    if (status === 'Processing') return 'Processing';
    if (status === 'Deferred') return 'Deferred';
    if (status === 'Send Visa Result') return 'Processing';
    if (status === 'Visa Result Sent') return 'Visa Result Sent';
    if (status === 'Closed - Chargeback') return 'Chargeback Detected';
    if (status === 'Cancelled') return 'Cancelled';
    if (status === 'Refunded') return 'Refunded';

    // Default fallback
    return status || 'Unknown';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Not Finished':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Payment Needed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Collecting Documents':
        return 'bg-brand-surface-alt text-brand-primary-dark border-brand-border';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Deferred':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Visa Result Sent':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Refunded':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
                <p className="text-gray-600">Track the status of your Vietnam eVisa applications</p>
              </div>
              <button
                onClick={() => router.push('/apply')}
                className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors font-medium"
              >
                Apply for New eVisa
              </button>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading applications...</span>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={fetchApplications}
                    className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-primary-dark transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : applications.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                  <p className="text-gray-600 mb-6">
                    You haven&apos;t started any visa applications yet.
                  </p>
                  <button
                    onClick={() => router.push('/apply')}
                    className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-primary-dark transition-colors font-medium"
                  >
                    Start Your First Application
                  </button>
                </div>
              </div>
            ) : (
              applications.map((application) => {
                const displayStatus = getDisplayStatus(application);
                const statusColor = getStatusColor(displayStatus);

                return (
                  <div
                    key={application.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Application #{application.applicationId}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColor}`}
                            >
                              {displayStatus}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Visa Type</p>
                              <p className="font-medium text-gray-900">
                                {application.VisaType?.name || 'Vietnam eVisa'}
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-600">Travelers</p>
                              <p className="font-medium text-gray-900">
                                {application.passengerCount}{' '}
                                {application.passengerCount === 1 ? 'person' : 'people'}
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-600">Travel Dates</p>
                              <p className="font-medium text-gray-900">
                                {formatDate(application.stayingStart)} -{' '}
                                {formatDate(application.stayingEnd)}
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-600">Total Amount</p>
                              <p className="font-medium text-gray-900">
                                {formatCurrency(application.total || 0)}
                              </p>
                            </div>
                          </div>

                          {application.Passenger && application.Passenger.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-gray-600 text-sm mb-2">Passengers:</p>
                              <div className="flex flex-wrap gap-2">
                                {application.Passenger.map((passenger, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                                  >
                                    {passenger.fullName}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          Created: {formatDate(application.createdAt)}
                          {application.updatedAt !== application.createdAt && (
                            <span className="ml-4">
                              Updated: {formatDate(application.updatedAt)}
                            </span>
                          )}
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={() =>
                              router.push(`/apply?applicationId=${application.applicationId}`)
                            }
                            className="text-brand-primary hover:text-brand-primary-dark font-medium text-sm"
                          >
                            View Details
                          </button>
                          {displayStatus === 'Payment Needed' && (
                            <button
                              onClick={() =>
                                router.push(`/apply?applicationId=${application.applicationId}`)
                              }
                              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
                            >
                              Complete Payment
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Bottom NavBar */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
