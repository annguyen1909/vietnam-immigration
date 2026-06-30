'use client';

import { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <button
        className="w-full flex justify-between items-center px-4 py-3 min-h-[48px] text-left font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] rounded-t-lg transition-colors hover:bg-brand-surface-alt"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
      >
        <span>{title}</span>
        <span className={`ml-2 transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
      </button>
      {open && (
        <div
          id={`accordion-content-${title.replace(/\s+/g, '-')}`}
          className="px-4 pb-4 pt-1 text-[#222] border-t border-gray-100 animate-fadeIn"
        >
          {children}
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
      `}</style>
    </div>
  );
}
