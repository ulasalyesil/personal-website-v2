import { serializeJsonLd, type JsonLd as Data } from "@/lib/structured-data";

export default function JsonLd({ data }: { data: Data | Data[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
