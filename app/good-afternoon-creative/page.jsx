"use client";

import CaseStudyLayout from "@/components/CaseStudyLayout";
import banner from "@/public/images/goodafternoon/banner.png";
import gacWeb from "@/public/images/goodafternoon/gacWeb.png";
import gacContent from "./gacContent.json";

export default function Page() {
  return (
    <CaseStudyLayout
      title="Good Afternoon Creative"
      date="April, 2023"
      company="Good Afternoon Creative"
      role="Web Design & Development"
      websiteUrl="https://goodafternooncreative.com"
      contentBlocks={[
        // hero image
        {
          type: "image",
          src: banner,
          alt: "Banner shot of Good Afternoon Creative site",
        },
        // text blocks
        ...gacContent.paragraphs.map((text) => ({ type: "text", text })),
        // full-width screenshot
        {
          type: "image",
          src: gacWeb,
          alt: "Full Good Afternoon Creative landing page",
        },
      ]}
    />
  );
}
