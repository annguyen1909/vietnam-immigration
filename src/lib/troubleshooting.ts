import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { FAQSchemaItem, HowToSchemaStep } from '@/components/seo/types';

const TROUBLESHOOTING_DIR = path.join(process.cwd(), 'src/data/troubleshooting');

export type TroubleshootingFaqFrontmatter = {
  question: string;
  answer: string;
};

/** String step or explicit name + text (+ optional image/duration). */
export type TroubleshootingHowToStepFrontmatter =
  | string
  | {
      name?: string;
      text?: string;
      image?: string;
      duration?: string;
    };

export type TroubleshootingFrontmatter = {
  title: string;
  description: string;
  slug?: string;
  date?: string;
  updated?: string;
  image?: string;
  index?: boolean;
  priority?: number;
  /** FAQPage JSON-LD — optional array of Q&A pairs */
  faq?: TroubleshootingFaqFrontmatter[];
  /** HowTo JSON-LD — optional steps (strings or { name, text } objects) */
  howToSteps?: TroubleshootingHowToStepFrontmatter[];
  /** ISO 8601 duration for HowTo totalTime, e.g. PT4H */
  howToTotalTime?: string;
};

export type TroubleshootingGuide = {
  slug: string;
  metadata: TroubleshootingFrontmatter;
  content: string;
  /** Parsed FAQ items for FAQSchema (empty if omitted in frontmatter). */
  faq: FAQSchemaItem[];
  /** Parsed steps for HowToSchema (empty if omitted in frontmatter). */
  howToSteps: HowToSchemaStep[];
  howToTotalTime?: string;
};

function parseFaqFromFrontmatter(raw: unknown): FAQSchemaItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null;
      const question = String((entry as TroubleshootingFaqFrontmatter).question ?? '').trim();
      const answer = String((entry as TroubleshootingFaqFrontmatter).answer ?? '').trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is FAQSchemaItem => item !== null);
}

function parseHowToStepsFromFrontmatter(raw: unknown): HowToSchemaStep[] {
  if (!Array.isArray(raw)) return [];

  const steps: HowToSchemaStep[] = [];

  raw.forEach((entry, index) => {
    const position = index + 1;

    if (typeof entry === 'string') {
      const trimmed = entry.trim();
      if (!trimmed) return;

      const colonIndex = trimmed.indexOf(':');
      if (colonIndex > 0 && colonIndex < trimmed.length - 1) {
        steps.push({
          name: trimmed.slice(0, colonIndex).trim(),
          text: trimmed.slice(colonIndex + 1).trim(),
        });
      } else {
        steps.push({
          name: `Step ${position}`,
          text: trimmed,
        });
      }
      return;
    }

    if (!entry || typeof entry !== 'object') return;

    const name = String((entry as { name?: string }).name ?? '').trim();
    const text = String((entry as { text?: string }).text ?? '').trim();
    const image = (entry as { image?: string }).image;
    const duration = (entry as { duration?: string }).duration;

    if (!text && !name) return;

    steps.push({
      name: name || `Step ${position}`,
      text: text || name,
      ...(image ? { image: String(image).trim() } : {}),
      ...(duration ? { duration: String(duration).trim() } : {}),
    });
  });

  return steps;
}

export function getTroubleshootingSlugs(): string[] {
  if (!fs.existsSync(TROUBLESHOOTING_DIR)) return [];

  return fs
    .readdirSync(TROUBLESHOOTING_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export function getTroubleshootingGuide(slug: string): TroubleshootingGuide | null {
  const filePath = path.join(TROUBLESHOOTING_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const raw = data as TroubleshootingFrontmatter;
  const resolvedSlug = raw.slug || slug;

  const faq = parseFaqFromFrontmatter(raw.faq);
  const howToSteps = parseHowToStepsFromFrontmatter(raw.howToSteps);
  const howToTotalTime = raw.howToTotalTime?.trim() || undefined;

  const metadata: TroubleshootingFrontmatter = {
    ...raw,
    slug: resolvedSlug,
  };

  return {
    slug: resolvedSlug,
    metadata,
    content,
    faq,
    howToSteps,
    howToTotalTime,
  };
}

function toSortableDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  if (value != null) return String(value);
  return '';
}

export function getAllTroubleshootingGuides(): TroubleshootingGuide[] {
  return getTroubleshootingSlugs()
    .map((slug) => getTroubleshootingGuide(slug))
    .filter((guide): guide is TroubleshootingGuide => guide !== null)
    .sort((a, b) => {
      const dateA = toSortableDateString(a.metadata.updated ?? a.metadata.date);
      const dateB = toSortableDateString(b.metadata.updated ?? b.metadata.date);
      return dateB.localeCompare(dateA);
    });
}

export function formatTroubleshootingDate(iso?: string | Date): string | null {
  if (!iso) return null;
  const parsed = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
