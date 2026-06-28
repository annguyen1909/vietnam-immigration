import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MarkdownContent from '@/components/ui/MarkdownContent';
import MarkdownArticleWithToc from '@/components/ui/MarkdownArticleWithToc';
import { extractMarkdownHeadings } from '@/lib/markdown-headings';
import SiteFooter from '@/components/layout/SiteFooter';
import { CalendarIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { generateNewsStaticParams, getAllNewsPosts, getNewsPostBySlug } from '@/lib/mdx';
import { BLOG_AUTHOR_NAME } from '@/components/seo/constants';
import {
  absoluteAssetUrl,
  blogPath,
  buildPageMetadata,
  DEFAULT_OG_IMAGE,
  getPublicSiteUrl,
  pageUrl,
} from '@/lib/seo';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FAQSchema from '@/components/seo/FAQSchema';
import JsonLd from '@/components/seo/JsonLd';
import type { FAQSchemaItem } from '@/components/seo/types';
import BlogApplyCta from '@/components/blog/BlogApplyCta';
import BlogVisaResources from '@/components/blog/BlogVisaResources';

export async function generateStaticParams() {
  return generateNewsStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  const postTags = (post.metadata.tags as string[] | undefined) || ['Vietnam', 'eVisa', 'Travel'];
  const postSection = post.metadata.section || 'News & Updates';
  const defaultAuthor = BLOG_AUTHOR_NAME;

  return buildPageMetadata({
    title: String(post.metadata.title ?? ''),
    description: String(post.metadata.excerpt ?? ''),
    path: blogPath(slug),
    ogType: 'article',
    ogImage: post.metadata.image || DEFAULT_OG_IMAGE,
    keywords: [
      ...postTags,
      'Vietnam eVisa',
      'Vietnam visa',
      'Vietnam travel',
      'Vietnam immigration',
      'Vietnam visa news',
      'Vietnam travel updates',
    ],
    authors: post.metadata.author
      ? [{ name: String(post.metadata.author) }]
      : [{ name: defaultAuthor }],
    creator: post.metadata.author ? String(post.metadata.author) : defaultAuthor,
    publisher: defaultAuthor,
    category: postSection,
    publishedTime: String(post.metadata.date ?? ''),
    modifiedTime: String(post.metadata.dateModified ?? post.metadata.date ?? ''),
    articleTags: postTags,
    articleSection: postSection,
    articleAuthors: post.metadata.author ? [String(post.metadata.author)] : [defaultAuthor],
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postTitle = String(post.metadata.title ?? 'News Article');
  const postDate = String(post.metadata.date ?? '');

  const allPosts = getAllNewsPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aVisa = Array.isArray(a.tags) && a.tags.includes('visa') ? 1 : 0;
      const bVisa = Array.isArray(b.tags) && b.tags.includes('visa') ? 1 : 0;
      if (bVisa !== aVisa) return bVisa - aVisa;
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 3);

  const postImage = absoluteAssetUrl(post.metadata.image || DEFAULT_OG_IMAGE);
  const tocItems = extractMarkdownHeadings(post.content);
  const faq = (Array.isArray(post.metadata.faq) ? post.metadata.faq : []) as FAQSchemaItem[];
  const authorName = post.metadata.author || BLOG_AUTHOR_NAME;

  // BlogPosting schema — authored/published by the organization (no individual author).
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postTitle,
    description: String(post.metadata.excerpt ?? ''),
    image: postImage,
    datePublished: postDate,
    dateModified: String(post.metadata.dateModified ?? post.metadata.date ?? postDate),
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: authorName,
      url: getPublicSiteUrl(),
    },
    publisher: {
      '@type': 'Organization',
      name: BLOG_AUTHOR_NAME,
      url: getPublicSiteUrl(),
      logo: {
        '@type': 'ImageObject',
        url: absoluteAssetUrl(DEFAULT_OG_IMAGE),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl(blogPath(slug)),
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <FAQSchema items={faq} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', href: '/' },
          { name: 'News & Updates', href: '/blog' },
          { name: postTitle, href: blogPath(slug) },
        ]}
      />
      <main className={`relative min-h-screen w-full bg-brand-surface text-brand-ink`}>
        {/* Official Header Banner */}
        <div className="brand-banner">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-white text-sm font-semibold uppercase tracking-wider">
                Assisted eVisa Service
              </span>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-white via-gray-50 to-white py-12 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-primary hover:underline font-semibold mb-6"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to News & Updates
            </Link>
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-brand-primary rounded-lg mb-4 border-2 border-white shadow-md">
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  News Article
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {postTitle}
              </h1>
              <div className="w-24 h-1 bg-brand-primary mx-auto mb-4"></div>
              <div className="flex items-center justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>{postDate ? new Date(postDate).toLocaleDateString() : ''}</span>
                </div>
                {post.metadata.author && (
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    <span>{post.metadata.author}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative w-full border-b-2 border-gray-200 bg-white py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <MarkdownArticleWithToc items={tocItems}>
              <article className="min-w-0">
                <div className="rounded-lg border-4 border-brand-primary bg-white p-4 shadow-2xl sm:p-6 lg:p-8">
                  {/* Featured Image */}
                  {post.metadata.image && (
                    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-100 sm:mb-8 sm:aspect-[16/9]">
                      <Image
                        src={post.metadata.image}
                        alt={post.metadata.imageAlt || `${postTitle} - Vietnam eVisa News Article`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 800px"
                        priority
                      />
                    </div>
                  )}

                  <BlogApplyCta className="mb-8" />

                  {/* Article Content */}
                  <div className="min-w-0">
                    <MarkdownContent content={post.content} />
                  </div>

                  <BlogApplyCta compact className="my-8" />

                  <BlogVisaResources />

                  {/* Back to Blog Link */}
                  <div className="mt-12 pt-8 border-t-2 border-gray-200">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary transition-all shadow-md uppercase tracking-wide text-sm border-2 border-brand-primary"
                    >
                      <ArrowLeftIcon className="w-5 h-5" />
                      Back to News & Updates
                    </Link>
                  </div>

                  {/* Breadcrumb Navigation */}
                  <nav className="mt-8 pt-8 border-t-2 border-gray-200" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-sm text-gray-600">
                      <li>
                        <Link href="/" className="hover:text-brand-primary transition-colors">
                          Home
                        </Link>
                      </li>
                      <li>/</li>
                      <li>
                        <Link href="/blog" className="hover:text-brand-primary transition-colors">
                          News & Updates
                        </Link>
                      </li>
                      <li>/</li>
                      <li className="text-gray-900 font-semibold truncate max-w-xs">{postTitle}</li>
                    </ol>
                  </nav>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="mt-12 pt-8 border-t-2 border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.slug}
                            href={`/blog/${relatedPost.slug}`}
                            className="group bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-brand-primary transition-all"
                          >
                            {relatedPost.image && (
                              <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                                <Image
                                  src={relatedPost.image}
                                  alt={`${relatedPost.title} - Related Article`}
                                  fill
                                  className="object-cover object-center"
                                  sizes="(max-width: 768px) 100vw, 240px"
                                />
                              </div>
                            )}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </MarkdownArticleWithToc>
          </div>
        </section>

        {/* Service Disclaimer */}
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
                <h3 className="text-xl font-bold text-gray-900">Service Disclaimer</h3>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-gray-900">vietnamemigration.com</strong> is operated by
                  Vietnam eVisa Assistance Team, a private company providing professional visa
                  application preparation and support services. We are{' '}
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
