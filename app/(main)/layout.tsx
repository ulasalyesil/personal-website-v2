import Footer from "@/components/Footer";
import SiteNavShell from "@/components/sidebar-stack/SiteNavShell";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavShell>
        <main id="main-content" className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-0">
          {children}
        </main>
        <Footer />
      </SiteNavShell>
    </>
  );
}
