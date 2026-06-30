import { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import HomeHelpStrip from '@/components/home/HomeHelpStrip';
import HomeOfficialServices from '@/components/home/HomeOfficialServices';
import HomeServicePackage from '@/components/home/HomeServicePackage';
import HomeVisaOptions from '@/components/home/HomeVisaOptions';
import HomeProcessDetailed from '@/components/home/HomeProcessDetailed';
import HomeSupportGlobal from '@/components/home/HomeSupportGlobal';
import HomeNews from '@/components/home/HomeNews';
import HomeDisclaimer from '@/components/home/HomeDisclaimer';
import SiteFooter from '@/components/layout/SiteFooter';
import { getVietnamVisaTypes } from '@/lib/vietnamVisa';
import JsonLd from '@/components/seo/JsonLd';
import { getPublicSiteUrl, SITE_NAME } from '@/lib/seo';
import { getVietnamHomePageDescription } from '@/lib/vietnamPricing';
import EssentialEvisaResources from '@/components/ui/EssentialEvisaResources';

export const metadata: Metadata = {
  title: 'Vietnam eVisa Application Assistance',
  description: getVietnamHomePageDescription(),
  alternates: {
    canonical: 'https://vietnamemigration.com',
    languages: {
      'en-US': 'https://vietnamemigration.com',
      'x-default': 'https://vietnamemigration.com',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://vietnamemigration.com',
    title: 'Vietnam eVisa — Apply Online',
    description: 'Guided Vietnam eVisa applications with transparent pricing and expert review.',
    siteName: SITE_NAME,
    images: [{ url: '/img/vietnam-hero.jpg', width: 1200, height: 630, alt: 'Vietnam travel' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vietnam_immigration',
    creator: '@vietnam_immigration',
    title: 'Vietnam eVisa — Apply Online',
    description: 'Guided Vietnam eVisa applications with transparent pricing and expert review.',
    images: ['/img/vietnam-hero.jpg'],
  },
};

const siteUrl = getPublicSiteUrl();

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: siteUrl,
  description:
    'Apply for Vietnam eVisa online with guided assistance, transparent fees, and 24/7 support.',
  publisher: { '@id': `${siteUrl}/#organization` },
};

export default async function Home() {
  const visaTypes = await getVietnamVisaTypes();

  return (
    <>
      <JsonLd data={websiteSchema} />
      <main className="flex min-h-screen flex-col bg-brand-surface">
        <HomeHero />
        <HomeHelpStrip />
        <div className="max-w-7xl mx-auto px-4 py-8 w-full">
          <EssentialEvisaResources />
        </div>
        <HomeOfficialServices />
        <HomeServicePackage />
        <HomeVisaOptions visaTypes={visaTypes} />
        <HomeProcessDetailed />
        <HomeSupportGlobal />
        <HomeNews />
        <HomeDisclaimer />
        <SiteFooter />
      </main>
    </>
  );
}
