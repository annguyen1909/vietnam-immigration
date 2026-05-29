'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SiteFooter from '@/components/layout/SiteFooter';

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading your account...</p>
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
                <p className="text-gray-600">Manage your profile and visa applications</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/apply')}
                  className="bg-brand-primary text-white px-6 py-2 rounded-lg hover:bg-brand-primary-dark transition-colors font-medium"
                >
                  Apply for eVisa
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                </div>

                <div className="p-6">
                  <div className="mb-4 p-4 bg-brand-surface-alt border border-brand-border rounded-lg">
                    <p className="text-brand-primary-dark text-sm">
                      <strong>Need to update your profile?</strong> Please contact our support team
                      for assistance with any profile changes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <p className="text-gray-900 font-medium">{user.fullName}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <p className="text-gray-900 font-medium">
                        {user.areaCode} {user.phoneNumber}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <p className="text-gray-900 font-medium">{user.gender || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Member since</p>
                        <p className="text-gray-900 font-medium">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : 'Recently'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => router.push('/apply')}
                      className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-brand-border hover:bg-brand-surface-alt transition-colors group"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-brand-surface-alt rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-border transition-colors">
                          <svg
                            className="w-6 h-6 text-brand-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">Apply for eVisa</h3>
                        <p className="text-sm text-gray-600">Start a new visa application</p>
                      </div>
                    </button>

                    <button
                      onClick={() => router.push('/applications')}
                      className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
                    >
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">View Applications</h3>
                        <p className="text-sm text-gray-600">Check your visa status</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Support Card */}
              <div className="bg-gradient-to-br from-brand-surface-alt to-brand-surface rounded-xl border border-brand-border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our support team is available 24/7 to assist you with any questions about your
                  visa application.
                </p>
                <button
                  onClick={() => router.push('/contact')}
                  className="w-full bg-brand-primary text-white py-2 px-4 rounded-lg hover:bg-brand-primary-dark transition-colors font-medium text-sm"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom NavBar */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
