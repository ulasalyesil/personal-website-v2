"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { triggerHaptic } from "@/lib/haptics";

type ButtonVariant = "primary" | "secondary";

const base =
  "inline-flex min-h-12 items-center rounded-full px-5 text-[0.9375rem] font-[550] transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const styles: Record<ButtonVariant, string> = {
  primary: `${base} bg-brand text-white hover:bg-brand-hover dark:text-[#0a0a0a]`,
  secondary: `${base} border border-border-default text-text-primary hover:bg-surface-1`,
};

interface ButtonProps {
  type?: ButtonVariant;
  label: string;
  href: string;
  target?: string;
  className?: string;
}

export default function Button({
  type = "primary",
  label,
  href,
  target,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(styles[type], className)}
      onClick={() => triggerHaptic("light")}
    >
      {label}
    </Link>
  );
}
