import Link from "next/link";
import Tabs from "./Tabs";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-surface-0 border-b border-border-subtle">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="size-8 bg-brand rounded-full hover:scale-105 transition-transform duration-150"
          aria-label="Home"
        />
        <Tabs />
      </div>
    </header>
  );
}
