import Header from "@/components/Header";
import MobileTabBar from "@/components/MobileTabBar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-8 pb-28 sm:pt-32 sm:pb-0">
        {children}
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
