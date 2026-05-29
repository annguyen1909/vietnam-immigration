import type { FAQSchemaItem } from '@/components/seo/types';

export type FaqFrontmatterEntry = {
  question: string;
  answer: string;
};

export function parseFaqFromFrontmatter(raw: unknown): FAQSchemaItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null;
      const question = String((entry as FaqFrontmatterEntry).question ?? '').trim();
      const answer = String((entry as FaqFrontmatterEntry).answer ?? '').trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is FAQSchemaItem => item !== null);
}
