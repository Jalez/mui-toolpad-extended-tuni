/** @format */

// Breakpoint display information
export const BREAKPOINT_INFO = {
  lg: {
    description: "Large screens (≥1200px)",
    color: "primary",
    icon: "desktop",
  },
  md: {
    description: "Medium screens (≥996px)",
    color: "success",
    icon: "tablet",
  },
  sm: {
    description: "Small screens (≥768px)",
    color: "info",
    icon: "tabletRotated",
  },
  xs: {
    description: "Extra small screens (<768px)",
    color: "warning",
    icon: "phone",
  },
};

// Types for breakpoint colors
export type BreakpointColor =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "default";
