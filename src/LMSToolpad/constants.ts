/** @format */

export const baseUrl = "/";
export const MTETVERSION = "2.1.0";

// Grid layout breakpoints (in pixels)
export const GRID_BREAKPOINTS = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
};

// Grid layout columns per breakpoint
export const GRID_COLS = {
  lg: 12,
  md: 12,
  sm: 12,
  xs: 12,
};

// Grid layout constants
export const GRID_ROW_HEIGHT = 200;
export const GRID_MARGIN = [10, 10];
export const GRID_CONTAINER_PADDING = [0, 0];

// Resize handle directions
export type ResizeHandle = "s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne";
export const GRID_RESIZE_HANDLES: ResizeHandle[] = ["se", "sw", "ne", "nw"];

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

// Control types for Mindmap
export const CONTROL_TYPES = {
  ZOOM: "zoom",
  FIT_VIEW: "fit-view",
  CONTROLS: "controls",
  MINIMAP: "minimap",
  BACKGROUND: "background",
  PANEL: "panel",
  SELECTION: "selection",
  KEYBOARD: "keyboard",
} as const;

// Control IDs for Mindmap
export const CONTROL_IDS = {
  ZOOM_IN: "zoom-in",
  ZOOM_OUT: "zoom-out",
  FIT_VIEW: "fit-view",
  SHOW_MINIMAP: "show-minimap",
  SHOW_BACKGROUND: "show-background",
  SHOW_CONTROLS: "show-controls",
  CENTER_SELECTED: "center-selected",
} as const;

// Control priorities for Mindmap
export const CONTROL_PRIORITIES = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
} as const;
