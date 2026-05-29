import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/** Canonical directory for blog/news markdown consumed at `/blog`. */
export const NEWS_DIRECTORY = path.join(process.cwd(), 'src/data/news');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  author?: string;
  section?: string;
  tags?: string[];
  readingTime: string;
}

export type NewsPostFrontmatter = Record<string, unknown> & {
  title?: string;
  date?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  author?: string;
  section?: string;
  tags?: string[];
};

export type NewsPostDetail = {
  slug: string;
  metadata: NewsPostFrontmatter;
  content: string;
};

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function listNewsMarkdownFiles(): string[] {
  if (!fs.existsSync(NEWS_DIRECTORY)) return [];
  return fs.readdirSync(NEWS_DIRECTORY).filter((file) => file.endsWith('.md'));
}

function parseNewsMarkdownFile(fileName: string): BlogPost {
  const fullPath = path.join(NEWS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: fileName.replace(/\.md$/, ''),
    title: String(data.title ?? ''),
    date: String(data.date ?? ''),
    excerpt: String(data.excerpt ?? ''),
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    author: data.author ? String(data.author) : undefined,
    section: data.section ? String(data.section) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    readingTime: calculateReadingTime(content),
  };
}

export function getAllNewsPosts(): BlogPost[] {
  return listNewsMarkdownFiles()
    .map(parseNewsMarkdownFile)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
}

/** Alias for legacy callers — reads from `src/data/news`, not `content/blog`. */
export function getAllBlogPosts(): BlogPost[] {
  return getAllNewsPosts();
}

export function getNewsPostSlugs(): string[] {
  return listNewsMarkdownFiles().map((file) => file.replace(/\.md$/, ''));
}

export function getNewsPostBySlug(slug: string): NewsPostDetail | null {
  const filePath = path.join(NEWS_DIRECTORY, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      metadata: data as NewsPostFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export function generateNewsStaticParams(): { slug: string }[] {
  return getNewsPostSlugs().map((slug) => ({ slug }));
}
