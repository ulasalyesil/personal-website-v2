import Footer from "@/components/Footer";
import SiteNavShell from "@/components/sidebar-stack/SiteNavShell";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <SiteNavShell>
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-32 sm:pb-0">
          {children}
        </main>
        <Footer />
      </SiteNavShell>
      {/* Overlays stay outside the shell: the plane is transformed while the
          menu is open, and a transformed ancestor breaks position:fixed. */}
      {modal}
    </>
  );
}
