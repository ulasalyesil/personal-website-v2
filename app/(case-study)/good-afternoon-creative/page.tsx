import CaseStudyLayout from "@/components/CaseStudyLayout";
import banner from "@/public/images/goodafternoon/banner.webp";
import gacWeb from "@/public/images/goodafternoon/gacWeb.webp";
import gacContent from "./gacContent.json";
import type { TextBlock } from "@/types";

export default function Page() {
  return (
    <CaseStudyLayout
      slug="good-afternoon-creative"
      title="Good Afternoon Creative"
      date="April, 2023"
      company="Good Afternoon Creative"
      role="Web Design & Development"
      websiteUrl="https://goodafternooncreative.com"
      contentBlocks={[
        {
          type: "image",
          src: banner,
          alt: "Banner shot of Good Afternoon Creative site",
        },
        ...gacContent.paragraphs.map((text): TextBlock => ({ type: "text", text })),
        {
          type: "image",
          src: gacWeb,
          alt: "Full Good Afternoon Creative landing page",
        },
      ]}
    />
  );
}
