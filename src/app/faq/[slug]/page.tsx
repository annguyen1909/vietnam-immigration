import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SiteFooter from '@/components/layout/SiteFooter';
import MarkdownContent from '@/components/ui/MarkdownContent';
import MarkdownArticleWithToc from '@/components/ui/MarkdownArticleWithToc';
import HelpFloatingBox from '@/components/ui/HelpFloatingBox';
import Link from 'next/link';
import glob from 'fast-glob';
import { Metadata } from 'next';
import { buildPageMetadata, faqPath } from '@/lib/seo';
import FAQSchema from '@/components/seo/FAQSchema';
import { extractMarkdownHeadings, stripManualTableOfContents } from '@/lib/markdown-headings';
import { ArrowLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface FAQData {
  question: string;
  answer: string;
  slug: string;
}

// Helper to extract Q&A pairs for FAQPage structured data
function extractFAQPairs(markdown: string): { question: string; answer: string }[] {
  const lines = markdown.split('\n');
  const faqs: { question: string; answer: string }[] = [];
  let currentQ: string | null = null;
  let currentA: string[] = [];
  const questionRegex = /^(#+)\s*(.+\?)$/; // Heading ending with ?
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(questionRegex);
    if (match) {
      if (currentQ && currentA.length > 0) {
        faqs.push({ question: currentQ, answer: currentA.join(' ').trim() });
      }
      currentQ = match[2].trim();
      currentA = [];
    } else if (currentQ) {
      // Stop answer at next heading or horizontal rule
      if (/^#+ /.test(lines[i]) || /^---+$/.test(lines[i])) {
        if (currentQ && currentA.length > 0) {
          faqs.push({ question: currentQ, answer: currentA.join(' ').trim() });
        }
        currentQ = null;
        currentA = [];
      } else {
        currentA.push(lines[i]);
      }
    }
  }
  if (currentQ && currentA.length > 0) {
    faqs.push({ question: currentQ, answer: currentA.join(' ').trim() });
  }
  return faqs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let faq: FAQData | null = null;
  try {
    const filePath = path.join(process.cwd(), 'src/data/faqs', `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    faq = { question: data.question, slug: data.slug, answer: '' };
  } catch (e) {
    faq = null;
  }

  if (!faq) {
    return {
      title: 'FAQ Not Found | Vietnam eVisa',
      description: 'The requested FAQ page could not be found.',
    };
  }

  const description = `Find comprehensive answers to: ${faq.question}. Get expert guidance on Vietnam eVisa requirements and application process.`;

  return buildPageMetadata({
    title: faq.question,
    description,
    path: faqPath(slug),
    ogType: 'article',
    keywords: [
      faq.question,
      'Vietnam eVisa FAQ',
      'Vietnam visa questions',
      'Vietnam visa help',
      'Vietnam visa information',
      'Vietnam visa requirements',
      'Vietnam visa application',
    ],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Server-side: Read the markdown file for the current FAQ
  let faq: FAQData | null = null;
  try {
    const filePath = path.join(process.cwd(), 'src/data/faqs', `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    faq = { question: data.question, slug: data.slug, answer: content };
  } catch (e) {
    // File not found or error
    faq = null;
  }

  if (!faq || !faq.question || !faq.answer) {
    return (
      <main className="relative min-h-screen w-full bg-white text-gray-900">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">FAQ Not Found</h1>
          <Link href="/faq" className="text-brand-primary hover:underline font-semibold">
            Return to FAQ
          </Link>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const markdownBody = stripManualTableOfContents(faq.answer);
  const tocItems = extractMarkdownHeadings(markdownBody);

  // Get 5 other FAQs (excluding current) from markdown files
  let otherFaqs: { question: string; slug: string }[] = [];
  try {
    const faqDir = path.join(process.cwd(), 'src/data/faqs');
    const files = glob.sync('*.md', { cwd: faqDir });
    const allFaqs = files.map((file) => {
      const fileContent = fs.readFileSync(path.join(faqDir, file), 'utf8');
      const { data } = matter(fileContent);
      return { question: data.question, slug: data.slug };
    });

    const filtered = allFaqs.filter((f) => f.slug !== slug);
    if (filtered.length <= 5) {
      otherFaqs = filtered.slice(0, 5);
    } else {
      const offset = slug
        ? slug.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) %
          filtered.length
        : 0;
      otherFaqs = [...filtered.slice(offset), ...filtered.slice(0, offset)].slice(0, 5);
    }
  } catch (e) {
    // If there's an error reading other FAQs, just use empty array
    otherFaqs = [];
  }

  const faqPairs = extractFAQPairs(markdownBody);

  return (
    <>
      <FAQSchema items={faqPairs} />
      <main className="relative min-h-screen w-full bg-white text-gray-900">
        {/* Official Header Banner */}
        <div className="brand-banner">
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

        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-white via-gray-50 to-white py-12 md:py-16 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors mb-6"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-semibold">Back to FAQ</span>
            </Link>
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  Question & Answer
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {faq.question}
              </h1>
              <div className="w-24 h-1 bg-brand-primary mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <MarkdownArticleWithToc items={tocItems}>
              <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl mb-8">
                <article>
                  <MarkdownContent content={markdownBody} />
                </article>
              </div>
            </MarkdownArticleWithToc>

            {/* Apply for eVisa Now Button */}
            <div className="w-full flex justify-center mb-8">
              <Link
                href="/apply"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary hover:to-brand-primary transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                APPLY FOR eVISA NOW
              </Link>
            </div>

            {/* Other FAQs Section */}
            {otherFaqs.length > 0 && (
              <section className="mb-10">
                <div className="bg-white border-4 border-brand-primary rounded-lg p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-brand-primary" />
                    Related Questions
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherFaqs.map((f) => (
                      <Link
                        key={f.slug}
                        href={`/faq/${f.slug}`}
                        className="block bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-brand-primary transition-all group"
                      >
                        <span className="text-base font-semibold text-gray-900 group-hover:text-brand-primary transition-colors">
                          {f.question}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <HelpFloatingBox />
          </div>
        </section>

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
        </div>

        <div className="relative w-full px-4 pb-10"></div>
        <SiteFooter />
      </main>
    </>
  );
}

export async function generateStaticParams() {
  // Hardcoded slugs for all known FAQ posts
  return [
    { slug: '24-hour-vietnam-evisa' },
    { slug: 'family-group-vietnam-evisa' },
    { slug: 'children-visa-vietnam' },
    { slug: 'vietnam-evisa-requirements' },
    { slug: 'vietnam-evisa-entry-points' },
    { slug: 'vietnam-emergency-numbers' },
    { slug: 'vietnam-country-codes' },
    { slug: 'medical-visa-vietnam' },
    { slug: 'work-in-vietnam-on-tourist-visa' },
    { slug: 'cruise-passenger-visa-vietnam' },
  ];
}
