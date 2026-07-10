// Shared motion tokens — used sparingly per baseline-ui constraints.
// Single source of truth so durations/easings/springs don't drift across
// components (sidebar-stack, lab modal, page transitions).
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

// Sidebar-stack pattern — shared by the lab demo (SidebarStack) and the real
// site navigation (SiteNavShell) so the exhibited interaction and the real
// one never drift apart.
export const STACK_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

export const STACK_SCALE = 0.95;

// Quick section-swap fade (SidebarStack body content).
export const FADE_FAST = { duration: 0.18, ease: "easeOut" } as const;

// Lab modal item-to-item cycling. Spring, not a fixed duration/ease — this
// motion is gesture-adjacent (arrow keys / j-k can repeat rapidly) and must
// stay interruptible without queuing awkwardly.
export const LAB_SLIDE_SPRING = {
  type: "spring",
  stiffness: 380,
  damping: 34,
} as const;
