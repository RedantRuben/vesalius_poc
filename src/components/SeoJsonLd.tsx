export default function SeoJsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON for search engines.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
