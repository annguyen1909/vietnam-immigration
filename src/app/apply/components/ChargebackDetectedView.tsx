import React from 'react';
import Lottie from 'lottie-react';
import chargebackAnimation from 'public/img/chargeback.json';
import SiteFooter from '@/components/layout/SiteFooter';

export default function ChargebackDetectedView() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        {/* Lottie Animation */}
        <div className="w-64 h-64">
          <Lottie
            animationData={chargebackAnimation}
            loop={true}
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </main>
      {/* Bottom NavBar and Footer */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
