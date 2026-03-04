"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { triggerHaptic } from "@/lib/haptics";

type ButtonVariant = "primary" | "secondary";

const styles: Record<ButtonVariant, string> = {
  primary:
    "h-9 inline-flex items-center px-4 text-sm font-medium rounded-full bg-brand text-white hover:bg-brand-hover transition-colors duration-150",
  secondary:
    "h-9 inline-flex items-center px-4 text-sm font-medium rounded-full bg-surface-2 text-text-secondary border border-border-default hover:bg-surface-3 hover:text-text-primary transition-colors duration-150",
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
