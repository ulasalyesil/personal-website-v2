import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import Closing from "@/components/site/Closing";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="px-[var(--gutter)] pb-24 pt-[clamp(3rem,10vw,8rem)] outline-none"
      >
        <p className="text-[clamp(5rem,22vw,20rem)] font-[560] leading-[0.8] tracking-[-0.06em] text-text-tertiary tabular-nums">
          404
        </p>
        <h1 className="mt-10 max-w-[22ch] text-[clamp(1.75rem,3.6vw,3rem)] font-[560] leading-[1.08] tracking-[-0.03em] text-text-primary text-balance">
          We regret to inform that we decided to move on with other pages.
          We&apos;ll keep your candidate info and reach out if we see any fit.
        </h1>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/" label="Go home" type="primary" />
          <Link
            href="/works"
            className="inline-flex min-h-12 items-center px-2 text-[0.9375rem] text-text-secondary underline decoration-border-default underline-offset-4 transition-colors hover:text-text-primary"
          >
            See the work
          </Link>
        </div>
      </main>
      <Closing />
    </>
  );
}
