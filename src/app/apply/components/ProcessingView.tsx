import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import processingAnimation from 'public/img/processing.json';
import SupportBox from './SupportBox';
import SiteFooter from '@/components/layout/SiteFooter';
import Link from 'next/link';

interface ProcessingViewProps {
  applicationId: string;
  email: string;
  passengers: Array<{ fullName: string }>;
}

const wittyPhrases = [
  'Our expert team is carefully reviewing',
  "We're ensuring everything is perfect for",
  'Your application is being processed with precision for',
  'Our specialists are working efficiently for',
  "We're making your journey seamless for",
  'Your application is in excellent hands for',
  "We're dotting the i's and crossing the t's for",
  'Our team is ensuring a smooth process for',
  "We're reviewing every detail carefully for",
  'Your application is being handled with expertise for',
  "We're making sure everything meets the highest standards for",
  'Our experts are working diligently for',
  "We're ensuring your adventure starts perfectly for",
  'Your application is being processed with dedication for',
  'Our team is working efficiently around the clock for',
  "We're making the process as smooth as possible for",
  'Your application is being reviewed with care for',
  "We're ensuring every requirement is met for",
  'Our specialists are processing your case for',
  "We're making your Vietnam dreams come true for",
];

export default function ProcessingView({ applicationId, email, passengers }: ProcessingViewProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = wittyPhrases[currentMessageIndex];
    const currentPassenger = passengers[currentMessageIndex]?.fullName || 'your application';
    const fullText = `${currentPhrase} ${currentPassenger}`;

    let currentIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          // Wait before deleting
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        // Deleting
        if (currentIndex > 0) {
          currentIndex--;
          setDisplayText(fullText.slice(0, currentIndex));
        } else {
          isDeleting = false;
          // Move to next phrase/passenger
          setCurrentMessageIndex((prev) => (prev + 1) % wittyPhrases.length);
        }
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex, passengers]);

  // Remove the old CSS effect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .typewriter-cursor {
        animation: blink 1s infinite;
      }
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        {/* Lottie Animation */}
        <div className="w-64 h-64 mb-6">
          <Lottie
            animationData={processingAnimation}
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Modern Typewriter Text */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl px-8 py-6 shadow-lg">
            <div className="flex items-center justify-center">
              <span className="text-gray-800 text-xl font-medium">
                {displayText}
                <span className="typewriter-cursor text-brand-primary ml-1">|</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-brand-primary mb-4">
            Your Visa is Being Processed! 🎉
          </h1>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Order Number:</span> {applicationId}
          </p>

          <p className="text-gray-600 mb-6">
            Great news! Your payment was successful and we&apos;re now working on your application.
          </p>

          {/* Encouraging Message */}
          <div className="bg-gradient-to-r from-brand-surface-alt to-brand-surface border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-3">
              Sit Back, Relax, and Pack Your Bags! 🧳
            </h2>
            <p className="text-green-700 mb-4">
              Our expert team is carefully reviewing your application to ensure everything is
              perfect. We&apos;re as excited as you are about your upcoming Vietnam adventure!
            </p>
            <p className="text-green-700">
              <span className="font-semibold">Processing time:</span> 3-5 business days
            </p>
          </div>

          {/* Email Notification Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              📧 We&apos;ll Keep You Updated
            </h3>
            <p className="text-yellow-700">
              You&apos;ll receive your visa result via email at{' '}
              <span className="font-semibold">{email}</span>
            </p>
            <p className="text-yellow-700 text-sm mt-2">
              Please check your spam folder if you don&apos;t see our emails in your inbox.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/applications"
              className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-primary-dark transition"
            >
              View All Applications
            </Link>
            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Support Box */}
          <SupportBox />
        </div>
      </main>

      {/* Bottom NavBar and Footer */}
      <div className="w-full mt-10"></div>
      <SiteFooter />
    </div>
  );
}
