export { default as AuthorBio } from '@/components/trust/AuthorBio';
export type { AuthorBioProps } from '@/components/trust/AuthorBio';
export { default as TrustBadges } from '@/components/trust/TrustBadges';
export type { TrustBadgesProps, TrustBadgeItem } from '@/components/trust/TrustBadges';
export { default as EmergencyCTA } from '@/components/trust/EmergencyCTA';
export type { EmergencyCTAProps } from '@/components/trust/EmergencyCTA';

/**
 * Editorial attribution for guides. We attribute review to the website/team
 * (not an individual) and intentionally omit any personal profile link.
 */
export const EDITORIAL_TEAM_BIO = {
  name: 'Vietnam eVisa Assistance Team',
  role: 'Editorial & Visa Support Team · vietnamemigration.com',
  bio: 'Our editorial and support team has handled thousands of Vietnam eVisa applications, including error fixes, payment failures, and last-minute entry issues. Every guide is reviewed and kept up to date against the current National Immigration Portal requirements.',
} as const;
