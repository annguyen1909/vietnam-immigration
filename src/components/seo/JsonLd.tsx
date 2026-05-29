/**
 * Safely serialize JSON-LD for inline script tags (prevents `</script>` breakout).
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Low-level JSON-LD script injector — prefer typed schema components when possible. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
