'use client';
import { useEffect, useRef, useState } from 'react';

const phrases = [
  'for transit',
  'for business travel',
  'for tourism',
  'for a layover',
  'URGENTLY!',
  'for a conference',
  'for a business meeting',
  'for a vacation',
  'for a family visit',
  'URGENTLY!',
  'for a group tour',
  'for a quick stopover',
  'for urgent travel',
  'for a last-minute trip',
  'URGENTLY!',
  'for a connecting flight',
  'for a business seminar',
  'for sightseeing',
  'for a trade show',
  'URGENTLY!',
  'for a cultural event',
  'for a holiday',
  'for a business expo',
  'for a guided tour',
  'URGENTLY!',
];

const TYPING_SPEED = 60; // ms per character
const ERASING_SPEED = 30; // ms per character
const PAUSE_BETWEEN = 1200; // ms pause after typing a phrase
const URGENT_PAUSE = 5000; // ms pause for URGENTLY!

export default function AnimatedTyping() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    if (typing) {
      if (displayed.length < phrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutRef.current = setTimeout(
          () => setTyping(false),
          phrase === 'URGENTLY!' ? URGENT_PAUSE : PAUSE_BETWEEN
        );
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, ERASING_SPEED);
      } else {
        setTyping(true);
        setPhraseIdx((idx) => (idx + 1) % phrases.length);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, typing, phraseIdx]);

  return (
    <span className="inline-block align-middle min-h-[1.5em]">
      <span
        className={
          displayed === 'URGENTLY!'
            ? 'text-[#FF5733] font-bold animate-pulse'
            : 'text-brand-accent font-semibold'
        }
      >
        {displayed}
      </span>
      <span
        className="inline-block w-2 h-5 bg-brand-accent ml-1 align-middle animate-blink rounded-sm"
        aria-hidden="true"
      />
      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s steps(1) infinite;
        }
      `}</style>
    </span>
  );
}
