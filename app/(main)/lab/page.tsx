import PageIntro from "@/components/site/PageIntro";
import LabGrid from "@/components/lab/LabGrid";
import { LAB_ITEMS } from "@/components/lab/data";
import { GalleryRestore } from "@/components/lab/LabNavigation";
import styles from "@/components/lab/Lab.module.css";

export const metadata = {
  alternates: { canonical: "/lab" },
  title: "Lab — Ulaş Alyeşil",
  description: "Interaction studies, prototypes, and visual experiments.",
};

export default function LabPage() {
  return (
    <>
      <PageIntro
        title="Lab"
        lede="Interaction studies, prototypes, and visual experiments."
      />
      <div className={`content-container ${styles.page}`}>
        <GalleryRestore />
        <LabGrid items={LAB_ITEMS} />
      </div>
    </>
  );
}
