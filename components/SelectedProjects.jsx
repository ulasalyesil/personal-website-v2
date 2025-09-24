import ProjectCard from "./ProjectCard";

import wisecareai from "../public/images/wisecare/wisecare_cover.png";
import fsiCover from "@/public/images/fsi/fsi_cover.png";
import qb from "@/public/images/quickbooks/qb_cover.png";
import gacWeb2 from "@/public/images/goodafternoon/gacWeb2.png";

export default function SelectedProjects() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h3 className="text-neutral-400 px-4 pb-2 border-b border-neutral-300 dark:border-neutral-800 font-mono font-bold w-full gap-4">
        Case Studies
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <ProjectCard
          title={"WiseCareAI"}
          description={
            "A generative AI platform that creates dynamic health insurance enrollment experiences, adapting forms and recommendations in real-time. "
          }
          img={wisecareai}
          target={"/wisecareai"}
        />
        <ProjectCard
          title={"Full Spectrum Insights"}
          description={
            "A consultancy website showcasing AI-assisted business insights through practical demos and clear outcomes. "
          }
          img={fsiCover}
          target={"/full-spectrum-insights"}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <ProjectCard
          title={"Jotform"}
          description={
            "Designing a seamless QuickBooks integration that automates invoice and customer creation from form submissions, eliminating manual data entry for small businesses. "
          }
          img={qb}
          target={"jotform-integrations"}
        />
        <ProjectCard
          title={"Good Afternoon Creative"}
          description={
            "Building a branded portfolio site for an Istanbul-based creative agency to showcase their work and establish a strong online presence in the competitive design market. "
          }
          img={gacWeb2}
          target={"good-afternoon-creative"}
        />
      </div>
    </div>
  );
}
