'use client';

import dynamic from 'next/dynamic';
import howItWorksLottie from 'public/img/Animation - 1751187180561.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function HowItWorksLottie() {
  return (
    <div className="w-full max-w-md">
      <Lottie
        animationData={howItWorksLottie}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
