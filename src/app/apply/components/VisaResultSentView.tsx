import React from 'react';
import Lottie from 'lottie-react';
import resultSendAnimation from 'public/img/resultsend.json';
import SiteFooter from '@/components/layout/SiteFooter';
import SupportBox from './SupportBox';

interface VisaResultSentViewProps {
  email: string;
  updatedOn: string;
}

export default function VisaResultSentView({ email, updatedOn }: VisaResultSentViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        {/* Lottie Animation */}
        <div className="w-64 h-64 mb-8">
          <Lottie
            animationData={resultSendAnimation}
            loop={false}
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-green-700 mb-4 flex items-center justify-center gap-2">
            <span>Visa Result Sent</span>
            <span role="img" aria-label="mail">
              📬
            </span>
          </h1>
          <p className="text-gray-700 mb-2">
            Your visa result has been sent to:
            <span className="block font-semibold text-brand-primary-dark text-lg mt-1">
              {email}
            </span>
          </p>
          <p className="text-gray-600 mb-6">
            <span className="font-medium">Sent on:</span> {updatedOn}
          </p>
          <div className="bg-brand-surface-alt border border-brand-border rounded-lg p-5 mb-6">
            <p className="text-blue-900 text-base">
              Please kindly check your inbox and spam folder for your visa result.
              <br />
              If you have any questions or need further assistance, our support team is here to
              help!
            </p>
          </div>
          <SupportBox />
        </div>
      </main>
      {/* Bottom NavBar and Footer */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
