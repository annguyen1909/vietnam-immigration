import Image from 'next/image';
import Link from 'next/link';
import { getAllNewsPosts } from '@/lib/mdx';

export default function HomeNews() {
  const validPosts = getAllNewsPosts().filter((p) => p.date && !isNaN(new Date(p.date).getTime()));
  const sorted = [...validPosts].sort((a, b) => {
    const aVisa = a.tags?.includes('visa') ? 1 : 0;
    const bVisa = b.tags?.includes('visa') ? 1 : 0;
    if (bVisa !== aVisa) return bVisa - aVisa;
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });
  const largePosts = sorted.slice(0, 3);
  const smallPosts = sorted.slice(3, 6);

  if (validPosts.length === 0) return null;

  return (
    <section className="bg-white py-16 sm:py-20 border-t border-brand-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-brand-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
            News & updates
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-brand-ink sm:text-4xl">
            Latest travel information
          </h2>
          <p className="mt-3 text-brand-muted">
            Tips, guides, and updates to help you plan your visit to Vietnam.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-brand-surface p-6 sm:p-8 ring-1 ring-brand-border">
          {largePosts.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-3">
              {largePosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-brand-border transition hover:shadow-md hover:ring-brand-primary/40"
                >
                  <div className="relative aspect-[16/10] bg-brand-surface-alt">
                    <Image
                      src={post.image || '/img/vietnam-hero.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="400px"
                    />
                    <span className="absolute left-3 top-3 rounded-md bg-brand-primary px-2 py-1 text-xs font-bold text-white">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-semibold text-brand-ink line-clamp-2 group-hover:text-brand-primary">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-muted line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-semibold text-brand-primary">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {smallPosts.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {smallPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex gap-4 rounded-xl bg-white p-4 ring-1 ring-brand-border transition hover:ring-brand-primary/40 sm:flex-row"
                >
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-brand-surface-alt sm:h-20 sm:w-24">
                    <Image
                      src={post.image || '/img/vietnam-hero.jpg'}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-brand-ink line-clamp-2 group-hover:text-brand-primary text-sm">
                      {post.title}
                    </h4>
                    <p className="mt-1 text-xs text-brand-muted">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/blog" className="btn-secondary">
              View all news
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
