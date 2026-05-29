export { default as AuthorBio } from '@/components/trust/AuthorBio';
export type { AuthorBioProps } from '@/components/trust/AuthorBio';
export { default as TrustBadges } from '@/components/trust/TrustBadges';
export type { TrustBadgesProps, TrustBadgeItem } from '@/components/trust/TrustBadges';
export { default as EmergencyCTA } from '@/components/trust/EmergencyCTA';
export type { EmergencyCTAProps } from '@/components/trust/EmergencyCTA';

/** Demo props for previews and Storybook-style pages. */
export const DEMO_AUTHOR_BIO = {
  name: 'Lan Nguyen',
  role: 'Senior Immigration Specialist',
  bio: 'Former immigration consultant with 8+ years helping travelers resolve Vietnam eVisa errors, payment failures, and last-minute entry issues. Guides are reviewed against current National Immigration Portal requirements.',
  linkedInUrl: 'https://www.linkedin.com/in/placeholder',
} as const;
