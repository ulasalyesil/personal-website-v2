import SiteHeader from "@/components/site/SiteHeader";
import Closing from "@/components/site/Closing";

export default function CaseStudyGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <SiteHeader back={{ href: "/works", label: "All work" }} />
      <main
        id="main-content"
        tabIndex={-1}
        className="w-full flex-1 px-[var(--gutter)] pb-24 outline-none"
      >
        {children}
      </main>
      <Closing />
    </div>
  );
}
