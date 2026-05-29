import JsonLd from '@/components/seo/JsonLd';
import type { FAQSchemaItem } from '@/components/seo/types';

type FAQSchemaProps = {
  items: FAQSchemaItem[];
};

/** FAQPage structured data — pass Q&A pairs from markdown or CMS. */
export default function FAQSchema({ items }: FAQSchemaProps) {
  if (!items.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
