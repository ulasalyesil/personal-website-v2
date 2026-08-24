import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in scales. The long-form reading
 * sizes defined in `globals.css` (`text-body`, `text-lead`, …) look like text
 * *colors* to it, so `cn("text-lead", "text-text-primary")` would silently drop
 * the size. Declaring them as font sizes makes them conflict with each other
 * and with `text-sm`/`text-xl`, which is what they actually are.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["kicker", "caption", "body", "lead", "subsection", "section"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
