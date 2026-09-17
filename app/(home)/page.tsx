import ModeSplitHero from "@/components/home/ModeSplitHero";
import SelectedWork from "@/components/home/SelectedWork";
import LabFeature from "@/components/home/LabFeature";
import WorkIndex from "@/components/site/WorkIndex";
import Closing from "@/components/site/Closing";
import { CASE_STUDIES } from "@/data/work";
import projectsData from "@/public/data/projects.json";

export default function HomePage() {
  return (
    <>
      <ModeSplitHero />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <SelectedWork pieces={CASE_STUDIES} />
        <LabFeature />
        <WorkIndex id="work-index" heading="Everything, by year" data={projectsData} />
      </main>
      <Closing />
    </>
  );
}
