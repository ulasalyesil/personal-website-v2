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
    <div className={styles.page}>
      <header className={styles.intro}>
        <h1>Lab</h1>
        <p>Interaction studies, prototypes, and visual experiments.</p>
      </header>
      <GalleryRestore />
      <LabGrid items={LAB_ITEMS} />
    </div>
  );
}
