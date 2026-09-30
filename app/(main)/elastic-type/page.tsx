import type { Metadata } from "next";
import ElasticType from "@/components/elastic-type/ElasticType";

export const metadata: Metadata = {
  alternates: { canonical: "/elastic-type" },
  title: "Elastic type — Ulaş Alyeşil",
  description:
    "A React recreation of ElevenLabs' elastic text selector, with dragging, snap selection, and keyboard support.",
};

export default function ElasticTypePage() {
  return <ElasticType />;
}
