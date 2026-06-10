import type { ReactNode } from 'react';
import TableOfContents from '@/components/ui/TableOfContents';
import type { MarkdownTocItem } from '@/lib/markdown-headings';

type MarkdownArticleWithTocProps = {
  items: MarkdownTocItem[];
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/**
 * Left-sidebar TOC on desktop, inline TOC on mobile — wraps markdown article body.
 */
export default function MarkdownArticleWithToc({
  items,
  children,
  className = '',
  contentClassName = '',
}: MarkdownArticleWithTocProps) {
  const hasToc = items.length > 0;

  return (
    <div className={className}>
      {hasToc ? (
        <div className="mb-6 lg:hidden">
          <TableOfContents items={items} />
        </div>
      ) : null}

      <div
        className={
          hasToc
            ? `grid grid-cols-1 gap-8 lg:grid-cols-[minmax(200px,260px)_1fr] lg:gap-10`
            : 'grid grid-cols-1'
        }
      >
        {hasToc ? (
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)]">
              <TableOfContents items={items} className="max-h-full" />
            </div>
          </aside>
        ) : null}

        <div className={`min-w-0 ${contentClassName}`}>{children}</div>
      </div>
    </div>
  );
}
