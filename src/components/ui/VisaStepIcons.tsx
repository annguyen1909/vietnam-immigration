'use client';
import React from 'react';
import Lottie from 'lottie-react';

export function Step1Icon() {
  return (
    <Lottie
      animationData={require('../../../public/img/Animation - 1750267241441.json')}
      loop
      autoplay
      style={{ width: 192, height: 192 }}
    />
  );
}

export function Step2Icon() {
  return (
    <Lottie
      animationData={require('../../../public/img/Animation - 1750267749204.json')}
      loop
      autoplay
      style={{ width: 192, height: 192 }}
    />
  );
}

export function Step3Icon() {
  return (
    <Lottie
      animationData={require('../../../public/img/Animation - 1750267941411.json')}
      loop
      autoplay
      style={{ width: 192, height: 192 }}
    />
  );
}

export function Step4Icon() {
  return (
    <Lottie
      animationData={require('../../../public/img/Animation - 1750268079990.json')}
      loop
      autoplay
      style={{ width: 256, height: 256 }}
    />
  );
}

export function Step5Icon() {
  return (
    <svg className="icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Mobile phone */}
      <rect
        x="30"
        y="15"
        width="40"
        height="70"
        rx="8"
        fill="#2D3748"
        stroke="#4299E1"
        strokeWidth="2"
      >
        <animate
          attributeName="stroke"
          values="#4299E1;#63B3ED;#90CDF4;#63B3ED;#4299E1"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
      {/* Screen */}
      <rect x="33" y="22" width="34" height="50" rx="2" fill="#1A202C" />
      {/* eVisa document on screen */}
      <rect x="36" y="28" width="28" height="20" rx="2" fill="#FFFFFF" stroke="#E2E8F0">
        <animate
          attributeName="fill"
          values="#FFFFFF;#F7FAFC;#FFFFFF"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      {/* Visa header */}
      <rect x="38" y="30" width="24" height="2" fill="#4299E1" />
      <rect x="38" y="34" width="18" height="1" fill="#4A5568" />
      <rect x="38" y="37" width="20" height="1" fill="#4A5568" />
      <rect x="38" y="40" width="16" height="1" fill="#4A5568" />
      <rect x="38" y="43" width="22" height="1" fill="#4A5568" />
      {/* QR code */}
      <rect x="38" y="52" width="12" height="12" fill="#2D3748" />
      <rect x="40" y="54" width="2" height="2" fill="#FFFFFF" />
      <rect x="44" y="54" width="2" height="2" fill="#FFFFFF" />
      <rect x="40" y="58" width="2" height="2" fill="#FFFFFF" />
      <rect x="46" y="58" width="2" height="2" fill="#FFFFFF" />
      {/* Success checkmark */}
      <circle cx="56" cy="58" r="6" fill="#48BB78">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
      </circle>
      <path
        d="M53 58 L55 60 L59 56"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0,8;8,0"
          dur="1s"
          begin="1s"
          repeatCount="indefinite"
        />
      </path>
      {/* Home button */}
      <circle cx="50" y="78" r="3" fill="#4A5568">
        <animate
          attributeName="fill"
          values="#4A5568;#718096;#4A5568"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Notification badges */}
      <circle cx="65" cy="20" r="4" fill="#F56565">
        <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="65" y="22" textAnchor="middle" fontFamily="Arial" fontSize="6" fill="#FFFFFF">
        1
      </text>
      {/* Sparkle effects */}
      <g opacity="0.8">
        <path d="M20 30 L22 32 L20 34 L18 32 Z" fill="#F6AD55">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 20 32;360 20 32"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M75 65 L78 68 L75 71 L72 68 Z" fill="#68D391">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 75 68;360 75 68"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M15 70 L17 72 L15 74 L13 72 Z" fill="#4299E1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 15 72;360 15 72"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      {/* Download arrow (subtle) */}
      <path d="M50 10 L50 5" stroke="#48BB78" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,3;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <path d="M47 7 L50 10 L53 7" stroke="#48BB78" strokeWidth="2" fill="none" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,3;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
