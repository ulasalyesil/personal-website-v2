import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
