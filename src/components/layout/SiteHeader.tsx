'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { href: '/apply', label: 'Apply' },
  { href: '/check-requirement', label: 'Requirements' },
  { href: '/fees', label: 'Fees' },
  { href: '/processing', label: 'Processing' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 shrink-0">
          <Image
            src="/img/vietnam-flag.svg"
            alt="Vietnam flag"
            width={44}
            height={44}
            className="block h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
          />
          <span className="hidden min-w-0 sm:block">
            <span className="font-display block text-lg font-bold leading-tight text-brand-ink">
              Vietnam eVisa
            </span>
            <span className="block text-xs text-brand-muted truncate max-w-[200px]">
              Immigration assistance
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-brand-surface-alt text-brand-primary'
                  : 'text-brand-ink hover:bg-brand-surface-alt hover:text-brand-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/applications"
            className="hidden md:inline text-sm font-medium text-brand-muted hover:text-brand-primary"
          >
            Track status
          </Link>

          {mounted && user ? (
            <div className="relative hidden sm:block" ref={userRef}>
              <button
                type="button"
                onClick={() => setUserOpen(!userOpen)}
                className="rounded-lg border border-brand-border px-3 py-2 text-sm font-medium text-brand-ink hover:bg-brand-surface-alt"
              >
                {user.fullName.split(' ')[0]} ▾
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-brand-border bg-white py-1 shadow-xl">
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm hover:bg-brand-surface-alt"
                  >
                    Account
                  </Link>
                  <Link
                    href="/applications"
                    className="block px-4 py-2 text-sm hover:bg-brand-surface-alt"
                  >
                    Applications
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-brand-surface-alt"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline rounded-lg px-3 py-2 text-sm font-medium text-brand-primary hover:bg-brand-surface-alt"
            >
              Log in
            </Link>
          )}

          <Link href="/apply" className="btn-primary !px-4 !py-2 text-sm">
            Start application
          </Link>

          <button
            type="button"
            className="lg:hidden rounded-lg p-2 text-brand-ink hover:bg-brand-surface-alt"
            aria-expanded={mobileOpen}
            aria-label="Open menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="lg:hidden border-t border-brand-border bg-white px-4 py-4"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-3 text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-ink hover:bg-brand-surface-alt'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/applications"
              className="rounded-lg px-4 py-3 text-base font-medium text-brand-ink hover:bg-brand-surface-alt"
            >
              Track application status
            </Link>
            {mounted && user ? (
              <>
                <Link
                  href="/applications"
                  className="rounded-lg px-4 py-3 text-base font-medium text-brand-ink hover:bg-brand-surface-alt"
                >
                  My applications
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="rounded-lg px-4 py-3 text-left text-base font-medium text-brand-muted"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-lg px-4 py-3 text-base font-medium text-brand-primary"
              >
                Log in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
