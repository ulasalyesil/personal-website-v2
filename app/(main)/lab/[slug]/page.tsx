import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LabDetail from "@/components/lab/LabDetail";
import { LAB_ITEMS } from "@/components/lab/data";

export async function generateStaticParams() {
  return LAB_ITEMS.map((it) => ({ slug: it.slug }));
}

type Params = Promise<{ slug: string }>;

/** Each entry has a standalone, shareable detail page. */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = LAB_ITEMS.find((it) => it.slug === slug);
  if (!item) return {};
  const title = `${item.title} (Lab) — Ulaş Alyeşil`;
  return {
    title,
    description: item.summary,
    alternates: { canonical: `/lab/${item.slug}` },
    openGraph: {
      title,
      description: item.summary,
      images: [{ url: item.media.src, alt: item.media.alt }],
    },
  };
}

export default async function LabDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const index = LAB_ITEMS.findIndex((it) => it.slug === slug);
  if (index < 0) notFound();
  return <LabDetail item={LAB_ITEMS[index]} next={LAB_ITEMS[index + 1]} />;
}
