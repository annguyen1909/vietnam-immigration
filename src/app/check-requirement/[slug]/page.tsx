import HelpFloatingBox from '@/components/ui/HelpFloatingBox';
import { countryVisaContent, sharedFaqs } from '@/data/countryVisaContent';
import { getVietnamVisaTypes, buildVisaTypesFaqStay } from '@/lib/vietnamVisa';
import { getVietnamVisaTypesFaqMarkdown, VIETNAM_PROCESSING_TIME } from '@/lib/vietnamPricing';
import Accordion from '@/components/ui/Accordion';
import ReactMarkdown from 'react-markdown';
import SiteFooter from '@/components/layout/SiteFooter';
import Image from 'next/image';
import ContactForm from '@/components/ui/ContactForm';
import Link from 'next/link';
import { Metadata } from 'next';
import { buildPageMetadata, checkRequirementPath, isIndexableCountrySlug } from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import HowToSchema from '@/components/seo/HowToSchema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const countryData =
    slug && countryVisaContent[slug] ? countryVisaContent[slug] : countryVisaContent['default'];

  const citizen = countryData.demonym ? countryData.demonym : `${countryData.displayName} citizens`;
  const country = countryData.displayName;

  const pageTitle = `Official Vietnam Visa for ${citizen} | eVisa Requirements & Application`;
  const pageDescription =
    countryData.eligibilityIntro ??
    `Get the latest official Vietnam eVisa requirements, fees, and step-by-step application guide for ${citizen}. Professional, secure online visa processing for ${country}.`;

  return buildPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: checkRequirementPath(slug),
    index: isIndexableCountrySlug(slug),
    ogType: 'article',
    keywords: [
      `Vietnam visa ${citizen}`,
      `Vietnam eVisa ${country}`,
      `Vietnam visa requirements ${country}`,
      `Vietnam visa application ${country}`,
      `Vietnam visa for ${citizen}`,
      `Vietnam travel visa ${country}`,
      `Vietnam tourist visa ${country}`,
      `Vietnam business visa ${country}`,
      `Vietnam visa online ${country}`,
      `apply Vietnam visa ${country}`,
      `Vietnam entry permit ${country}`,
    ],
  });
}

export default async function CountryRequirementPage({ params }: PageProps) {
  const { slug } = await params;
  const [countryData, visaTypesFromDb] = await Promise.all([
    Promise.resolve(
      slug && countryVisaContent[slug] ? countryVisaContent[slug] : countryVisaContent['default']
    ),
    getVietnamVisaTypes(),
  ]);
  const visaTypesFaqStay = buildVisaTypesFaqStay(visaTypesFromDb);

  const citizen = countryData.demonym ? countryData.demonym : `${countryData.displayName} citizens`;
  const country = countryData.displayName;

  const faqSchemaItems = sharedFaqs.map((faq) => ({
    question: faq.q.replace(/\{country\}/g, country).replace(/\{citizen\}/g, citizen),
    answer: faq.a.replace(/\{country\}/g, country).replace(/\{citizen\}/g, citizen),
  }));

  const howToSteps = [
    {
      name: 'Prepare your valid passport',
      text: `Ensure your ${country} passport is valid for at least 6 months from arrival date.`,
    },
    {
      name: 'Complete the online eVisa application form',
      text: 'Fill in your personal and travel details accurately.',
    },
    {
      name: 'Upload required documents',
      text: 'Upload clear scans of your passport and any required documents if requested.',
    },
    {
      name: 'Pay the fees',
      text: 'Pay the government and service fees securely online using a credit or debit card.',
    },
    {
      name: 'Receive your eVisa approval',
      text: `Your eVisa will be sent to your email, usually within ${VIETNAM_PROCESSING_TIME}.`,
    },
    {
      name: 'Print your eVisa',
      text: 'Bring a printed copy of your eVisa and your passport when you travel to Vietnam.',
    },
  ];

  return (
    <>
      <FAQSchema items={faqSchemaItems} />
      <HowToSchema
        name={`How to Apply for a Vietnam eVisa for ${citizen}`}
        description={`Step-by-step instructions for ${citizen} to apply for a Vietnam eVisa online.`}
        steps={howToSteps}
        url={checkRequirementPath(slug)}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'Visa Requirements', href: '/check-requirement' },
          { name: country, href: checkRequirementPath(slug) },
        ]}
      />
      <main className={`relative min-h-screen w-full bg-brand-surface text-brand-ink`}>
        {/* Official Header Banner */}
        <div className="w-full bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary py-3 border-b-4 border-white">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-white text-sm font-semibold uppercase tracking-wider">
                Official Service
              </span>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto py-8 px-4 gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header Section */}
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Official Visa Information
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Official Vietnam Visa for {citizen}
              </h1>
              <div className="w-24 h-1 bg-brand-primary mb-4"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Complete guide to Vietnam eVisa requirements, fees, and application process for{' '}
                {citizen}. Professional assistance with official standards and certified expertise.
              </p>
            </div>

            {/* Table of Contents */}
            <section className="bg-white border-4 border-brand-primary rounded-lg p-6 mb-8 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Table of Contents
              </h2>
              <ol className="list-decimal ml-6 text-gray-900 text-base font-semibold space-y-2">
                <li>
                  <a href="#overview" className="text-brand-primary hover:underline">
                    Why Visit Vietnam?
                  </a>
                </li>
                <li>
                  <a href="#requirements" className="text-brand-primary hover:underline">
                    Do {citizen} need an Vietnam visa?
                  </a>
                </li>
                <li>
                  <a href="#visa-types" className="text-brand-primary hover:underline">
                    Vietnam e-Visa Types for {citizen}
                  </a>
                </li>
                <li>
                  <a href="#ports-of-entry" className="text-brand-primary hover:underline">
                    Available Ports of Entry for Vietnam eVisa
                  </a>
                </li>
                <li>
                  <a href="#application-process" className="text-brand-primary hover:underline">
                    How to Apply for an Vietnam eVisa
                  </a>
                </li>
                <li>
                  <a href="#requirements-list" className="text-brand-primary hover:underline">
                    Vietnam visa requirements for {citizen}
                  </a>
                </li>
                <li>
                  <a href="#fees" className="text-brand-primary hover:underline">
                    Vietnam visa fees for {citizen}
                  </a>
                </li>
                <li>
                  <a href="#entry-exit" className="text-brand-primary hover:underline">
                    Entry &amp; Exit Information
                  </a>
                </li>
                <li>
                  <a href="#validity-extension" className="text-brand-primary hover:underline">
                    Visa Validity &amp; Extension
                  </a>
                </li>
                <li>
                  <a href="#common-mistakes" className="text-brand-primary hover:underline">
                    Common Mistakes to Avoid
                  </a>
                </li>
                <li>
                  <a href="#travel-tips" className="text-brand-primary hover:underline">
                    Travel Tips for {citizen}
                  </a>
                </li>
                <li>
                  <a href="#contact-support" className="text-brand-primary hover:underline">
                    Contact &amp; Support
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="text-brand-primary hover:underline">
                    Frequently Asked Questions
                  </a>
                </li>
              </ol>
            </section>

            {/* Section 1: Why Visit Vietnam? */}
            <section id="overview" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </span>
                  Why Visit Vietnam?
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Vietnam is a vibrant Southeast Asian destination known for Ha Long Bay&apos;s
                  limestone karsts, the lantern-lit streets of Hoi An, imperial Hue, bustling Hanoi
                  and Ho Chi Minh City, and the Mekong Delta&apos;s floating markets. Whether you
                  want to cruise emerald waters, explore cave systems in Phong Nha, trek rice
                  terraces in Sapa, or savor regional cuisine from pho to fresh seafood, Vietnam
                  offers unforgettable experiences for every traveler.
                </p>
                <div className="w-full flex justify-center mb-4">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-300">
                    <Image
                      src="/img/vietnam-hero.jpg"
                      alt="Beautiful Vietnam landscape with temples and beaches"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Do I need a visa? */}
            <section id="requirements" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </span>
                  Do {citizen} need an Vietnam visa?
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <div className="flex flex-wrap gap-6 items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Visa Required?</span>
                    <span className="inline-block bg-brand-primary text-white text-sm font-bold px-4 py-2 rounded border-2 border-white shadow-md">
                      REQUIRED
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">Eligible for eVisa?</span>
                    <span className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-2 rounded border-2 border-white shadow-md">
                      ELIGIBLE
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {countryData.eligibilityIntro ??
                    `${citizen} are eligible for the Vietnam e-Visa, which allows for tourism and travel. The e-Visa process is fully online—no need to visit a Vietnamese embassy. Vietnam welcomes visitors to experience its coastlines, UNESCO heritage towns, diverse cultures, and incredible natural beauty from north to south.`}
                </p>
              </div>
            </section>

            {/* Section 3: Visa Types */}
            <section id="visa-types" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </span>
                  Vietnam e-Visa Types for {citizen}
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <div className="space-y-4">
                  {visaTypesFromDb.map((visa) => (
                    <div
                      key={visa.id}
                      className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary mb-1">
                        {visa.category}
                      </p>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {visa.name} – ${visa.govFee}
                      </h3>
                      <p className="text-gray-700">
                        {visa.entry} for up to {visa.durationDays} days.
                        {visa.category === 'Tourist'
                          ? ' For tourism, family visits, or leisure.'
                          : ' For business meetings, conferences, and commercial visits.'}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-brand-primary border-2 border-white rounded-lg p-4 text-white">
                  <p className="font-semibold">
                    <strong>Processing time:</strong> All Vietnam eVisas are typically processed
                    within {VIETNAM_PROCESSING_TIME}.
                  </p>
                </div>
                <div className="mt-3 text-gray-700">
                  <strong>Group Applications:</strong> Families or groups can apply for up to 15
                  passengers in a single application. Please note that children also need visa
                  applications.
                </div>
              </div>
            </section>

            {/* Section 4: Ports of Entry */}
            <section id="ports-of-entry" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </span>
                  Available Ports of Entry for Vietnam eVisa
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-4">
                  <li>
                    <strong>Airports:</strong> Tan Son Nhat (SGN – Ho Chi Minh City), Noi Bai (HAN –
                    Hanoi), Da Nang (DAD), Cam Ranh (CXR – Nha Trang), Phu Quoc (PQC)
                  </li>
                  <li>
                    <strong>Land borders:</strong> Major designated crossings with Cambodia, Laos,
                    and China (confirm your gate on your eVisa approval)
                  </li>
                </ul>
                <p className="text-gray-700 text-sm bg-gray-50 border-2 border-gray-200 rounded-lg p-3">
                  You must enter Vietnam through one of these official ports when using an eVisa.
                </p>
              </div>
            </section>

            {/* Section 5: How to Apply */}
            <section id="application-process" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    5
                  </span>
                  How to Apply for an Vietnam eVisa: Step-by-Step
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <ol className="list-decimal ml-6 text-gray-700 space-y-3 mb-4">
                  <li>
                    Prepare your valid {country} passport (at least 6 months validity from arrival
                    date, 1 blank page).
                  </li>
                  <li>
                    Complete the online eVisa application form with accurate personal and travel
                    details.
                  </li>
                  <li>
                    Pay the government and service fees securely online using a credit or debit
                    card.
                  </li>
                  <li>Upload any required documents (if requested).</li>
                  <li>
                    Receive your eVisa approval by email (typically within {VIETNAM_PROCESSING_TIME}
                    ).
                  </li>
                  <li>
                    Print your eVisa and bring it with your passport when you travel to Vietnam.
                  </li>
                </ol>
                <div className="bg-brand-primary border-2 border-white rounded-lg p-4 text-white">
                  <p className="text-sm">
                    <strong>Tip:</strong> Double-check all information before submitting your
                    application to avoid delays. Processing typically takes{' '}
                    {VIETNAM_PROCESSING_TIME}. Note that children also need visa applications, and
                    families or groups can apply for up to 15 passengers in a single application.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Requirements */}
            <section id="requirements-list" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    6
                  </span>
                  Vietnam visa requirements for {citizen}
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-4">
                  {countryData.requirements.map((req: string, idx: number) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Most travelers only need a valid passport (with at least 6 months validity from
                  arrival), a recent passport photo, and a completed online application. In some
                  cases, you may be asked for proof of accommodation, return flight, or yellow fever
                  vaccination (if arriving from a country with risk of yellow fever). Your e-Visa
                  will be sent to your email—print it and bring it with your passport.
                </p>
                <div className="bg-gray-50 border-2 border-brand-primary rounded-lg p-4">
                  <p className="text-gray-900 font-semibold mb-2">Why apply with us?</p>
                  <p className="text-gray-700">
                    Our team provides step-by-step guidance, helps you gather the required
                    documents, keeps you informed throughout the process, and delivers your approved
                    visa directly to you—on time and hassle-free. We offer 24/7 support and a
                    real-time status portal for your peace of mind.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Fees */}
            <section id="fees" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    7
                  </span>
                  Vietnam visa fees for {citizen}
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  {countryData.fees.map((fee: string, idx: number) => (
                    <li key={idx}>{fee}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 8: Entry & Exit */}
            <section id="entry-exit" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    8
                  </span>
                  Entry &amp; Exit Information
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>
                    Present your printed eVisa and passport at Vietnamese immigration on arrival.
                  </li>
                  <li>
                    Be prepared to show proof of onward travel, accommodation, and sufficient funds
                    if requested.
                  </li>
                  <li>
                    Follow all customs regulations—do not bring prohibited items (e.g., narcotics,
                    certain plants, or animals).
                  </li>
                  <li>Keep your eVisa and passport with you at all times during your stay.</li>
                </ul>
              </div>
            </section>

            {/* Section 9: Visa Validity & Extension */}
            <section id="validity-extension" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    9
                  </span>
                  Visa Validity &amp; Extension
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  If you wish to extend your stay, you can apply for an extension at local
                  immigration offices in Vietnam before your visa expires. Extensions may be
                  possible depending on your visa type and circumstances.
                </p>
              </div>
            </section>

            {/* Section 10: Common Mistakes */}
            <section id="common-mistakes" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    10
                  </span>
                  Common Mistakes to Avoid
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  <li>Submitting an application with incorrect or incomplete information.</li>
                  <li>Using a passport with less than 6 months validity.</li>
                  <li>
                    Not checking your email (including spam/junk) for the eVisa approval notice.
                  </li>
                  <li>Forgetting to print your eVisa before travel.</li>
                  <li>Bringing prohibited or restricted items into Vietnam.</li>
                  <li>Forgetting that children also need visa applications.</li>
                </ul>
              </div>
            </section>

            {/* Section 11: Travel Tips */}
            <section id="travel-tips" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    11
                  </span>
                  Travel Tips for {citizen} Visiting Vietnam
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                {countryData.travelInsight && (
                  <p className="text-gray-800 bg-brand-surface border-l-4 border-brand-primary pl-4 py-3 mb-4 leading-relaxed">
                    <strong>Visa tip for {citizen}:</strong> {countryData.travelInsight}
                  </p>
                )}
                <ul className="list-disc ml-6 text-gray-700 space-y-3">
                  <li>
                    <strong>Currency:</strong> The official currency is the Vietnamese Dong (VND).
                    ATMs are widely available in major cities and tourist areas. US dollars are
                    sometimes accepted at hotels and tour operators, but you&apos;ll get better
                    value using Vietnamese dong (VND).
                  </li>
                  <li>
                    <strong>Language:</strong> Vietnamese is the national language, and English is
                    commonly spoken in tourist areas, especially in Ho Chi Minh City, Hanoi, and
                    major destinations.
                  </li>
                  <li>
                    <strong>Health:</strong> Bring mosquito repellent and consider anti-malarial
                    medication for certain regions. Yellow fever vaccination is required if arriving
                    from a country with risk of yellow fever.
                  </li>
                  <li>
                    <strong>Weather:</strong> Vietnam stretches over 1,600 km north to south, so
                    seasons vary by region. The north is coolest November–March; central coast is
                    driest February–August; the south has a dry season roughly December–April.
                  </li>
                  <li>
                    <strong>Culture:</strong> Dress modestly, especially when visiting temples and
                    religious sites. Always ask before taking photos of people. Respect local
                    customs and traditions.
                  </li>
                  <li>
                    <strong>Safety:</strong> Vietnam is generally safe for tourists, but use common
                    sense, keep valuables secure, and be cautious in crowded areas.
                  </li>
                  <li>
                    <strong>Electricity:</strong> Vietnam uses Type C and F plugs (European style,
                    220V). Bring an adapter if needed.
                  </li>
                  <li>
                    <strong>Emergency:</strong> Dial 113 for police, 115 for ambulance, 114 for
                    fire. Tourist support hotline: 1800 1120.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 12: Contact & Support */}
            <section id="contact-support" className="mb-10">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    12
                  </span>
                  Contact &amp; Support
                </h2>
                <div className="w-24 h-1 bg-brand-primary mb-4"></div>
                <p className="text-gray-700 leading-relaxed">
                  Vietnam eVisa Team is dedicated to providing 24/7 support for your Vietnam eVisa
                  application. Every inquiry is handled by a real human—never a chatbot. If you have
                  questions or need assistance, use the contact form on this page or email us at{' '}
                  <a
                    href="mailto:visa@vietnamemigration.com"
                    className="text-brand-primary font-semibold hover:underline"
                  >
                    visa@vietnamemigration.com
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Apply Now Button */}
            <div className="w-full flex justify-center mb-10">
              <Link
                href="/apply"
                className="px-10 py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all shadow-lg hover:shadow-xl uppercase tracking-wide text-base border-2 border-brand-primary"
              >
                APPLY FOR A VISA NOW
              </Link>
            </div>

            {/* Section 13: FAQs */}
            <section id="faqs" className="mb-10">
              <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-xl">
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                    <span className="text-sm font-bold text-white uppercase tracking-wide">
                      Frequently Asked Questions
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
                  <div className="w-24 h-1 bg-brand-primary mx-auto mb-2"></div>
                </div>
                <div className="space-y-4">
                  <Accordion title={`What types of Vietnam eVisas are available?`}>
                    <ReactMarkdown>
                      {`${getVietnamVisaTypesFaqMarkdown({ includeProcessingNote: true })} Families or groups can apply for up to 15 passengers in a single application. Children also need visa applications.`}
                    </ReactMarkdown>
                  </Accordion>
                  <Accordion
                    title={`How long can ${country} citizens stay in Vietnam with an eVisa?`}
                  >
                    <ReactMarkdown>
                      {`The duration of stay for ${country} citizens depends on the type of eVisa obtained:\n\n${visaTypesFaqStay}\n\nIf you need to stay longer, see the FAQ about visa extensions.`}
                    </ReactMarkdown>
                  </Accordion>
                  {sharedFaqs
                    .filter(
                      (faq) => !/visa type|visa types|how many types|how long can/i.test(faq.q)
                    )
                    .map((faq, idx) => (
                      <Accordion
                        key={idx}
                        title={faq.q
                          .replace(/\{country\}/g, country)
                          .replace(/\{citizen\}/g, citizen)}
                      >
                        <ReactMarkdown>
                          {faq.a
                            .replace(/\{country\}/g, country)
                            .replace(/\{citizen\}/g, citizen)
                            .replace(
                              /5 business hours to 3 business days/gi,
                              VIETNAM_PROCESSING_TIME
                            )}
                        </ReactMarkdown>
                      </Accordion>
                    ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-[340px] flex flex-col gap-6">
            <ContactForm variant="sidebar" />
            <HelpFloatingBox />
          </aside>
        </div>

        {/* Official Disclaimer */}
        <section className="relative w-full bg-white py-12 border-b-2 border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gray-50 border-4 border-brand-primary rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-900">Official Disclaimer</h3>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">vietnamemigration.com</strong> is operated by
                  Vietnam Official eVisa Immigration Assistance Service, a private company providing
                  professional visa application preparation and support services. We are{' '}
                  <strong>not affiliated with</strong> the Government of Vietnam or any official
                  immigration authority.
                </p>
                <p>
                  Visa applications may be submitted directly through the official government portal
                  at a lower cost. By using our professional service, you agree to pay the
                  government visa fee plus our service fee, which is clearly disclosed throughout
                  the application process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hidden honeypot links in page content - invisible to users but crawled by bots */}
        <div
          className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <Link href="/faq/visa-extension-process" className="hidden">
            Visa Extension Process FAQ
          </Link>
          <Link href="/faq/visa-renewal-procedure" className="hidden">
            Visa Renewal Procedure FAQ
          </Link>
          <Link href="/faq/visa-status-check-online" className="hidden">
            Visa Status Check Online FAQ
          </Link>
          <Link href="/check-requirement/xyz-country" className="hidden">
            XYZ Country Visa Requirements
          </Link>
          <Link href="/check-requirement/test-nation" className="hidden">
            Test Nation Visa Requirements
          </Link>
          <Link href="/check-requirement/sample-country" className="hidden">
            Sample Country Visa Requirements
          </Link>
        </div>

        <div className="relative w-full px-4 pb-10"></div>
        <SiteFooter />
      </main>
    </>
  );
}
