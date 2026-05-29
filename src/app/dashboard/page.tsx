'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SiteFooter from '@/components/layout/SiteFooter';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--brand-primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-brand-ink mb-6">Welcome to Your Dashboard</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-brand-surface-alt rounded-lg p-4">
              <h2 className="text-xl font-semibold text-brand-ink mb-3">Account Information</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.areaCode} {user.phoneNumber}
                </p>
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-brand-ink mb-3">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-[var(--brand-primary)] text-white py-2 px-4 rounded hover:bg-[var(--brand-primary-dark)] transition-colors">
                  Apply for eVisa
                </button>
                <button className="w-full bg-brand-accent text-brand-ink py-2 px-4 rounded hover:bg-[#e6a200] transition-colors">
                  Check Application Status
                </button>
                <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors">
                  View My Applications
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
