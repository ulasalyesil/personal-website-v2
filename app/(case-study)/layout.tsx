import Link from "next/link";
import Footer from "@/components/Footer";

export default function CaseStudyGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh">
      <nav className="sticky top-0 z-10 bg-surface-0 border-b border-border-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link
            href="/"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Link>
        </div>
      </nav>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
