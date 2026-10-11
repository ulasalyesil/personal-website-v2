import type { Metadata } from "next";
import HomeLabSlot from "@/components/home/HomeLabSlot";
import styles from "@/components/home/Home.module.css";
import Hero from "@/components/home/Hero";
import SiteHeader from "@/components/site/SiteHeader";
import SelectedWork from "@/components/home/SelectedWork";
import KitFeature from "@/components/home/KitFeature";
import WorkIndex from "@/components/site/WorkIndex";
import Closing from "@/components/site/Closing";
import { CASE_STUDIES } from "@/data/work";
import projectsData from "@/public/data/projects.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className={styles.home}>
      <SiteHeader home />
      <Hero />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HomeLabSlot />
        <SelectedWork pieces={CASE_STUDIES} />
        <KitFeature />
        <WorkIndex
          id="work-index"
          heading="Everything, by year"
          data={projectsData}
        />
      </main>
      <Closing />
    </div>
  );
}
