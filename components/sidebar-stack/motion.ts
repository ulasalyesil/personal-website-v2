// Shared motion constants for the sidebar-stack pattern — used by both the
// lab demo (SidebarStack) and the site navigation (SiteNavShell) so the
// exhibited interaction and the real one never drift apart.
export const STACK_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

export const STACK_SCALE = 0.95;
