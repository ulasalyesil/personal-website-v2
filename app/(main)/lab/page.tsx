import LabGrid from "@/components/lab/LabGrid";
import LabCanvas from "@/components/lab/LabCanvas";
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
    <div className={styles.labBody}>
      <header className={styles.intro}>
        <div className={`content-container ${styles.introRow}`}>
          <h1 className={`reveal ${styles.introTitle}`}>
            <span className={styles.introHash} aria-hidden>
              #
            </span>
            Lab
          </h1>
          <p className={styles.introLede}>Interaction studies, prototypes, and visual experiments.</p>
          <p className={styles.introCount}>{LAB_ITEMS.length} entries</p>
        </div>
      </header>

      <div className={`content-container ${styles.canvasOnly}`}>
        <LabCanvas items={LAB_ITEMS} />
      </div>

      <div className={`content-container ${styles.page} ${styles.feedOnly}`}>
        <GalleryRestore />
        <LabGrid items={LAB_ITEMS} />
      </div>
    </div>
  );
}
