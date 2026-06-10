import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SiteFooter from '@/components/layout/SiteFooter';
import HelpFloatingBox from '@/components/ui/HelpFloatingBox';
import { NewspaperIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import JsonLd from '@/components/seo/JsonLd';
import { getAllNewsPosts, type BlogPost } from '@/lib/mdx';
import { blogPath, pageUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Official Vietnam eVisa News & Updates | vietnamemigration.com',
  description:
    'Latest news, updates, and travel information about Vietnam eVisa requirements and application process. Stay informed with official Vietnam visa news, travel advisories, and immigration updates.',
  keywords: [
    'Vietnam eVisa news',
    'Vietnam visa updates',
    'Vietnam travel news',
    'Vietnam immigration updates',
    'Vietnam visa requirements',
    'Vietnam travel information',
    'Vietnam visa blog',
    'Vietnam travel blog',
    'Vietnam visa news',
    'Vietnam immigration news',
  ],
  alternates: {
    canonical: 'https://vietnamemigration.com/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://vietnamemigration.com/blog',
    title: 'Official Vietnam eVisa News & Updates | vietnamemigration.com',
    description:
      'Latest news, updates, and travel information about Vietnam eVisa requirements and application process.',
    siteName: 'Vietnam Official eVisa',
    images: [
      {
        url: '/img/vietnam-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Vietnam eVisa News & Updates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vietnam_immigration',
    creator: '@vietnam_immigration',
    title: 'Official Vietnam eVisa News & Updates',
    description:
      'Latest news, updates, and travel information about Vietnam eVisa requirements and application process.',
    images: ['/img/vietnam-hero.jpg'],
  },
};

export default function BlogPage() {
  const posts = getAllNewsPosts();
  const visaGuides = posts.filter((p) => p.tags?.includes('visa'));
  const travelPosts = posts.filter((p) => !p.tags?.includes('visa'));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vietnam eVisa News & Travel Guides',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: pageUrl(blogPath(post.slug)),
      name: post.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <main className={`relative min-h-screen w-full bg-brand-surface text-brand-ink`}>
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
        <section className="relative w-full bg-gradient-to-br from-white via-gray-50 to-white py-16 md:py-24 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  News & Updates
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Vietnam eVisa
                <span className="block text-brand-primary">News & Updates</span>
              </h1>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Stay informed with the latest news, travel advisories, and updates about Vietnam
                eVisa requirements and application process.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative w-full bg-white py-16 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Blog Posts */}
              <div className="flex-1 min-w-0">
                <div className="bg-white border-4 border-brand-primary rounded-lg p-8 shadow-2xl mb-8">
                  <div className="flex items-center gap-3 mb-8">
                    <NewspaperIcon className="w-8 h-8 text-brand-primary" />
                    <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                  </div>
                  {visaGuides.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-lg font-bold text-brand-primary mb-4 uppercase tracking-wide">
                        Visa guides
                      </h3>
                      <div className="space-y-6">
                        {visaGuides.map((post: BlogPost) => (
                          <article
                            key={post.slug}
                            className="bg-gray-50 border-2 border-brand-primary rounded-lg p-6"
                          >
                            <Link href={`/blog/${post.slug}`} className="block group">
                              <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative w-full sm:w-48 aspect-video flex-shrink-0 rounded-lg overflow-hidden">
                                  <Image
                                    src={post.image || '/img/vietnam-hero.jpg'}
                                    alt={post.title}
                                    fill
                                    className="object-cover object-center"
                                    sizes="192px"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-primary">
                                    {post.title}
                                  </h3>
                                  <p className="text-gray-700 mt-2 line-clamp-2">{post.excerpt}</p>
                                  <span className="text-brand-primary font-semibold text-sm mt-2 inline-block">
                                    Read guide →
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                  {visaGuides.length > 0 && (
                    <h3 className="text-lg font-bold text-brand-primary mb-4 uppercase tracking-wide">
                      Travel &amp; destination guides
                    </h3>
                  )}
                  <div className="space-y-8">
                    {(visaGuides.length > 0 ? travelPosts : posts).map((post: BlogPost) => (
                      <article
                        key={post.slug}
                        className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 hover:border-brand-primary transition-all"
                      >
                        <Link href={`/blog/${post.slug}`} className="block group">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Post Image */}
                            <div className="relative w-full md:w-64 aspect-video flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={post.image || '/img/vietnam-hero.jpg'}
                                alt={`${post.title} - Vietnam eVisa News Article`}
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 256px"
                              />
                              <div className="absolute top-3 left-3 bg-brand-primary text-white px-3 py-1 rounded text-xs font-bold uppercase shadow-md">
                                {new Date(post.date).toLocaleDateString()}
                              </div>
                            </div>

                            {/* Post Content */}
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                                {post.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                {post.author && (
                                  <div className="flex items-center gap-2">
                                    <UserIcon className="w-4 h-4" />
                                    <span>{post.author}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-700 leading-relaxed mb-4">{post.excerpt}</p>
                              <span className="text-brand-primary font-semibold hover:underline inline-flex items-center gap-2">
                                Read More
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="w-full lg:w-[340px] flex flex-col gap-6">
                <HelpFloatingBox />
              </aside>
            </div>
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
                  By using our professional service, you agree to pay the government visa fee plus
                  our service fee, which is clearly disclosed throughout the application process.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="relative w-full px-4 pb-10"></div>
        <SiteFooter />
      </main>
    </>
  );
}
