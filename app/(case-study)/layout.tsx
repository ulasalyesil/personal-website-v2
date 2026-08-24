import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";

export default function CaseStudyGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <nav className="sticky top-0 z-10 bg-surface-0 border-b border-border-subtle">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
          <BackLink />
        </div>
      </nav>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
