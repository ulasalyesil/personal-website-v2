import SiteHeader from "@/components/site/SiteHeader";
import Closing from "@/components/site/Closing";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Closing />
    </>
  );
}
