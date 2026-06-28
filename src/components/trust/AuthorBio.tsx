import Image from 'next/image';
import Link from 'next/link';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export type AuthorBioProps = {
  name: string;
  role: string;
  avatarUrl?: string;
  bio: string;
  /** Optional profile link. Omit for organization/team attribution. */
  linkedInUrl?: string;
  className?: string;
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** E-E-A-T author box for blog posts and troubleshooting guides. */
export default function AuthorBio({
  name,
  role,
  avatarUrl,
  bio,
  linkedInUrl,
  className = '',
}: AuthorBioProps) {
  const initials = getInitials(name);

  return (
    <aside
      className={`rounded-xl border-2 border-brand-border bg-white p-6 shadow-md sm:p-8 ${className}`}
      aria-label={`About the author: ${name}`}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-brand-primary sm:mx-0">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={`${name}, ${role}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-brand-surface-alt font-display text-2xl font-bold text-brand-primary"
              aria-hidden
            >
              {initials}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Reviewed by
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-brand-ink">{name}</h3>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-primary sm:justify-start">
            <AcademicCapIcon className="h-4 w-4 shrink-0" aria-hidden />
            {role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">{bio}</p>
          {linkedInUrl ? (
            <Link
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark underline-offset-2 hover:underline"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              View LinkedIn profile
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
