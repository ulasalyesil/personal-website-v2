import { notFound } from "next/navigation";
import LabApp from "@/components/lab/LabApp";
import { LAB_ITEMS } from "@/components/lab/data";

export async function generateStaticParams() {
  return LAB_ITEMS.map((it) => ({ slug: it.slug }));
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!LAB_ITEMS.some((it) => it.slug === slug)) notFound();
  return (
    <div className="relative w-full h-[calc(100dvh-12rem)] sm:h-[calc(100dvh-16rem)]">
      <LabApp initialSlug={slug} />
    </div>
  );
}
