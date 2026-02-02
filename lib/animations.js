// Shared animation configuration for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, type: "spring", stiffness: 25 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

// Helper to create staggered delays
export const withDelay = (config, delay) => ({
  ...config,
  transition: { ...config.transition, delay },
});

// Default animation config (matches existing pattern)
export const animationConfig = fadeInUp;
