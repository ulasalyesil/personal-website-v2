import Link from "next/link";
import { cn } from "@/lib/cn";

const styles = {
  primary:
    "h-9 inline-flex items-center px-4 text-sm font-medium rounded-full bg-brand text-white hover:bg-brand-hover transition-colors duration-150",
  secondary:
    "h-9 inline-flex items-center px-4 text-sm font-medium rounded-full bg-surface-2 text-text-secondary border border-border-default hover:bg-surface-3 hover:text-text-primary transition-colors duration-150",
};

export default function Button({ type = "primary", label, href, target, className }) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(styles[type], className)}
    >
      {label}
    </Link>
  );
}
