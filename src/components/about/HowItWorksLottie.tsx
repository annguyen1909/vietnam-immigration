'use client';

import dynamic from 'next/dynamic';

const HowItWorksLottiePlayer = dynamic(
  () =>
    Promise.all([import('lottie-react'), import('public/img/Animation - 1751187180561.json')]).then(
      ([lottieModule, animationModule]) => {
        const Lottie = lottieModule.default;
        const animationData = animationModule.default;

        return function HowItWorksLottiePlayer() {
          return (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          );
        };
      }
    ),
  { ssr: false }
);

export default function HowItWorksLottie() {
  return (
    <div className="w-full max-w-md aspect-square">
      <HowItWorksLottiePlayer />
    </div>
  );
}
