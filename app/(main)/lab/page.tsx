import LabApp from "@/components/lab/LabApp";

export const metadata = {
  title: "Lab — Ulaş Alyeşil",
  description:
    "Scraps, sketches, and half-finished experiments that wouldn't fit anywhere else.",
};

export default function LabPage() {
  return (
    <div className="relative w-full h-[calc(100dvh-12rem)] sm:h-[calc(100dvh-16rem)]">
      <LabApp />
    </div>
  );
}
