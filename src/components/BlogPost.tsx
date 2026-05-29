import { BlogPost as BlogPostType } from '@/lib/mdx';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  // The MDX content will be rendered by the page, not here
  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-600">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          <span className="mx-2">•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>
      <div className="prose-headings:font-bold prose-a:text-brand-primary prose-img:rounded-lg">
        {/* MDX content will be rendered in the page file */}
      </div>
    </article>
  );
}
