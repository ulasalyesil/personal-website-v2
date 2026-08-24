import Link from "next/link";
import Footer from "@/components/Footer";

export default function CaseStudyGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <nav className="sticky top-0 z-10 bg-surface-0 border-b border-border-subtle">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
