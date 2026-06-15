'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect } from 'react';
import { markdownTableComponents } from '@/components/ui/markdownTableComponents';
import { MARKDOWN_HEADING_SCROLL_MARGIN, slugifyHeading } from '@/lib/markdown-headings';

interface MarkdownContentProps {
  content: string;
}

function flattenHeadingChildren(children: unknown): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenHeadingChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props?: { children?: unknown } };
    return flattenHeadingChildren(element.props?.children);
  }
  return '';
}

const headingSlugCounts = new Map<string, number>();

function headingIdFromChildren(children: unknown): string {
  const text = flattenHeadingChildren(children);
  return slugifyHeading(text, headingSlugCounts);
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  headingSlugCounts.clear();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      const href = anchor?.getAttribute('href');
      if (anchor && href?.startsWith('#')) {
        const id = decodeURIComponent(href.substring(1));
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          // scrollIntoView targets the real scroll container and respects
          // the heading's scroll-margin-top (scroll-mt-24).
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (typeof history !== 'undefined') {
            history.replaceState(null, '', `#${id}`);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = headingIdFromChildren(children);
            return (
              <h1
                id={id}
                className={`text-3xl font-bold text-brand-ink mb-4 ${MARKDOWN_HEADING_SCROLL_MARGIN}`}
              >
                {children}
              </h1>
            );
          },
          h2: ({ children }) => {
            const id = headingIdFromChildren(children);
            return (
              <h2
                id={id}
                className={`text-2xl font-bold text-brand-ink mb-3 ${MARKDOWN_HEADING_SCROLL_MARGIN}`}
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = headingIdFromChildren(children);
            return (
              <h3
                id={id}
                className={`text-xl font-bold text-brand-ink mb-2 ${MARKDOWN_HEADING_SCROLL_MARGIN}`}
              >
                {children}
              </h3>
            );
          },
          p: ({ children, node }) => {
            const onlyImage =
              node?.children?.length === 1 &&
              node.children[0].type === 'element' &&
              node.children[0].tagName === 'img';
            if (onlyImage) {
              return <div className="my-6 not-prose sm:my-8">{children}</div>;
            }
            return <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>;
          },
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li className="text-gray-700">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-bold text-brand-ink">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => {
            const isExternal =
              typeof href === 'string' &&
              (href.startsWith('http://') || href.startsWith('https://'));
            return (
              <a
                href={href}
                className="text-[var(--brand-primary)] hover:text-[#8D153A] underline"
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {children}
                {isExternal ? <span className="sr-only"> (opens in new tab)</span> : null}
              </a>
            );
          },
          img: ({ src, alt }) => (
            <figure className="my-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof src === 'string' ? src : undefined}
                alt={alt ?? ''}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </figure>
          ),
          ...markdownTableComponents,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
