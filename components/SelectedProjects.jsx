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
            "An AI-powered platform helping US health insurance agents recommend the best ACA and Medicare plans faster and smarter."
          }
          img={wisecareai}
          target={"/wisecareai"}
        />
        <ProjectCard
          title={"Full Spectrum Insights"}
          description={
            "Redesigned and built Full Spectrum Insights's website to clearly communicate their expertise and value to industry clients."
          }
          img={fsiCover}
          target={"/full-spectrum-insights"}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <ProjectCard
          title={"Jotform"}
          description={
            "Designing the QuickBooks integration and re-imagining the integrations experience."
          }
          img={qb}
          target={"jotform-integrations"}
        />
        <ProjectCard
          title={"Good Afternoon Creative"}
          description={
            "Building a branded portfolio site for a Istanbul-based creative duo to showcase selected work and studio capabilities."
          }
          img={gacWeb2}
          target={"good-afternoon-creative"}
        />
      </div>
    </div>
  );
}
