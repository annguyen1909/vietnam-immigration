/** Strip markdown noise and return a plain-text snippet for schema / previews. */
export function plainTextExcerpt(text: string, maxLength = 500): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/** First substantive paragraph from FAQ markdown (skips TOC and headings). */
export function extractFaqAnswerSnippet(markdown: string): string {
  const lines = markdown.split('\n');
  let inToc = false;
  const paragraphs: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.toLowerCase().includes('table of contents')) {
      inToc = true;
      continue;
    }
    if (inToc) {
      if (trimmed.startsWith('## ') && !trimmed.toLowerCase().includes('table of contents')) {
        inToc = false;
      } else {
        continue;
      }
    }
    if (trimmed.startsWith('#') || trimmed === '---' || trimmed.startsWith('- ')) {
      if (current.length) {
        paragraphs.push(current.join(' '));
        current = [];
      }
      continue;
    }
    if (!trimmed) {
      if (current.length) {
        paragraphs.push(current.join(' '));
        current = [];
      }
      continue;
    }
    current.push(trimmed);
  }
  if (current.length) paragraphs.push(current.join(' '));

  const candidate = paragraphs.find((p) => p.length > 40) ?? paragraphs[0] ?? '';
  return plainTextExcerpt(candidate);
}
