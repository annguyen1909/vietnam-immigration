import React from 'react';
import Lottie from 'lottie-react';
import cancelledAnimation from 'public/img/cancelled.json';
import SupportBox from './SupportBox';
import Link from 'next/link';
import SiteFooter from '@/components/layout/SiteFooter';

interface CancelledApplicationViewProps {
  applicationId: string;
  cancelledAt?: string;
}

export default function CancelledApplicationView({ applicationId }: CancelledApplicationViewProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white py-12">
      <div className="w-64 h-64 mb-6">
        <Lottie
          animationData={cancelledAnimation}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          This application has been cancelled
        </h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Order Number:</span> {applicationId}
        </p>
        <p className="text-gray-600 mb-4">No charge has been made to your account.</p>
        <p className="text-gray-600 mb-6">
          We&apos;re sorry, but your application has been cancelled.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="/apply"
            className="bg-brand-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-primary-dark transition"
          >
            Re-Apply Now
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Back to Home
          </Link>
        </div>
        <SupportBox />
      </div>
      {/* Bottom NavBar and Footer */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
