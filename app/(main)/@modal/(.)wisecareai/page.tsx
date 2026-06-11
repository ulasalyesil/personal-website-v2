import CaseStudyLayout from "@/components/CaseStudyLayout";
import { wisecareai } from "@/app/(case-study)/wisecareai/content";
import CaseStudyDialog from "../CaseStudyDialog";

export default function WiseCareAIIntercepted() {
  // slug deliberately omitted: it would set the same viewTransitionName as the
  // underlying page's cover, and duplicate names break view transitions.
  return (
    <CaseStudyDialog title={wisecareai.title}>
      <CaseStudyLayout {...wisecareai} slug={undefined} />
    </CaseStudyDialog>
  );
}
