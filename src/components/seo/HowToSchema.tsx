import JsonLd from '@/components/seo/JsonLd';
import { getPublicSiteUrl } from '@/lib/seo';
import type { HowToSchemaStep } from '@/components/seo/types';

type HowToSchemaProps = {
  name: string;
  description: string;
  steps: HowToSchemaStep[];
  /** Total time ISO 8601 duration, e.g. PT2H */
  totalTime?: string;
  /** Absolute or site path for supply/tool context */
  url?: string;
};

/** HowTo structured data for troubleshooting and application guides. */
export default function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  url,
}: HowToSchemaProps) {
  if (!steps.length) return null;

  const siteUrl = getPublicSiteUrl();
  const pageUrl = url
    ? url.startsWith('http')
      ? url
      : `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`
    : undefined;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image } : {}),
      ...(step.duration ? { duration: step.duration } : {}),
    })),
  };

  if (totalTime) schema.totalTime = totalTime;
  if (pageUrl) schema.url = pageUrl;

  return <JsonLd data={schema} />;
}
