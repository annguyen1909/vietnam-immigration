/** Matches sticky site header (~4.25rem) — keep in sync with SiteHeader */
export const MARKDOWN_HEADING_SCROLL_MARGIN = 'scroll-mt-24';

export type MarkdownTocItem = {
  id: string;
  title: string;
  /** TOC includes H2 sections only (flat list). */
  level: 2;
};

/** Plain text from a markdown heading line (strips inline formatting). */
export function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!])/g, '$1')
    .trim();
}

/**
 * Stable kebab-case id for heading anchors (shared by TOC extraction and rendered HTML).
 */
export function slugifyHeading(text: string, usedSlugs?: Map<string, number>): string {
  const base = stripInlineMarkdown(text)
    .toLowerCase()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '');

  const slug = base || 'section';

  if (!usedSlugs) {
    return slug;
  }

  const count = usedSlugs.get(slug) ?? 0;
  usedSlugs.set(slug, count + 1);
  return count === 0 ? slug : `${slug}-${count + 1}`;
}

/**
 * Extract H2 headings only (`## `) from raw markdown for Table of Contents (server-side).
 * H3 and below are ignored to keep the TOC flat and scannable.
 */
export function extractMarkdownHeadings(markdown: string): MarkdownTocItem[] {
  const lines = markdown.split('\n');
  const items: MarkdownTocItem[] = [];
  const usedSlugs = new Map<string, number>();
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = trimmed.match(/^##\s+(.+)$/);
    if (!match) continue;

    const title = stripInlineMarkdown(match[1]);
    if (!title) continue;

    const id = slugifyHeading(title, usedSlugs);
    items.push({ id, title, level: 2 });
  }

  return items;
}

/**
 * Removes legacy manual "Table of Contents" blocks from FAQ-style markdown.
 */
export function stripManualTableOfContents(markdown: string): string {
  const lines = markdown.split('\n');
  let tocHeading = -1;
  let tocStart = -1;
  let tocEnd = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('table of contents')) {
      tocHeading = i;
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      tocStart = j;
      for (; j < lines.length; j++) {
        if (!lines[j].trim().startsWith('- ')) {
          tocEnd = j;
          break;
        }
      }
      if (tocEnd === -1) tocEnd = lines.length;
      break;
    }
  }

  if (tocHeading === -1 || tocStart === -1 || tocEnd === -1) {
    return markdown;
  }

  return [...lines.slice(0, tocHeading), ...lines.slice(tocEnd)].join('\n');
}
