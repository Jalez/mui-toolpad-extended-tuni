/** @format */
import { Theme } from "@mui/material/styles";
import { Layout, Layouts } from "react-grid-layout";

/**
 * Helper function for theme.palette.primary.main with alpha
 */
export function alpha(color: string, value: number) {
  return (
    color +
    Math.round(value * 255)
      .toString(16)
      .padStart(2, "0")
  );
}

/**
 * Widget types available for grid layout
 */
export const WIDGET_TYPES = [
  { id: "course-list", name: "Course List", color: "#bbdefb" },
  { id: "calendar", name: "Calendar", color: "#c8e6c9" },
  { id: "mindmap", name: "Mindmap", color: "#b3e5fc" },
  { id: "announcements", name: "Announcements", color: "#ffcc80" },
  { id: "tasks", name: "Tasks", color: "#e1bee7" },
  { id: "chat", name: "Chat", color: "#f8bbd0" },
  { id: "timer", name: "Timer", color: "#d1c4e9" },
  { id: "notes", name: "Notes", color: "#c5cae9" },
  { id: "resources", name: "Resources", color: "#b2dfdb" },
];

/**
 * Get widget color based on its type
 */
export function getWidgetColor(type: string, theme: Theme) {
  const colorMap: Record<string, string> = {
    "course-list": theme.palette.primary.light,
    calendar: theme.palette.success.light,
    mindmap: theme.palette.info.light,
    announcements: theme.palette.warning.light,
    tasks: theme.palette.secondary.light,
    chat: theme.palette.error.light,
    custom: "#f5f5f5",
    timer: "#d1c4e9",
    notes: "#c5cae9",
    resources: "#b2dfdb",
  };

  return colorMap[type] || colorMap.custom;
}

/**
 * Create a grid layout item with default values
 */
export function createDefaultLayoutItem(id: string): Layout {
  return {
    i: id,
    x: 0,
    y: 0,
    w: 3,
    h: 2,
    minW: 1,
    minH: 1,
  };
}

/**
 * Create a copy of layouts to prevent mutation
 */
export function cloneLayouts(layouts: Layouts): Layouts {
  return JSON.parse(JSON.stringify(layouts));
}

/**
 * Validate layouts to ensure all items have proper positions
 */
export function validateLayouts(layouts: Layouts): Layouts {
  const validated: Layouts = {};

  // Process each breakpoint
  Object.keys(layouts).forEach((breakpoint) => {
    // Skip empty layouts
    if (!layouts[breakpoint] || !Array.isArray(layouts[breakpoint])) {
      validated[breakpoint] = [];
      return;
    }

    // Copy the layout items, ensuring they all have valid positions
    validated[breakpoint] = layouts[breakpoint].map((item) => {
      // Default values if missing
      return {
        ...item,
        x: typeof item.x === "number" ? item.x : 0,
        y: typeof item.y === "number" ? item.y : 0,
        w: typeof item.w === "number" ? item.w : 3,
        h: typeof item.h === "number" ? item.h : 2,
      };
    });
  });

  return validated;
}

/**
 * Check for grid items that overflow the container
 */
export function checkForOverflows(
  layouts: Layouts | null,
  breakpoint: string
): string[] {
  if (!layouts || !layouts[breakpoint]) return [];

  const overflowItems = layouts[breakpoint].filter((item) => {
    // Check if any item exceeds column bounds (12 columns max)
    return item.x + item.w > 12;
  });

  return overflowItems.map((item) => item.i);
}

/**
 * Get breakpoint container style with scale factor
 */
export function getBreakpointContainerStyle(
  breakpoint: string,
  scale: number,
  theme: Theme
) {
  const baseStyle = {
    transform: `scale(${scale})`,
    transformOrigin: "top center",
    height: `calc(${Math.round(100 / scale)}%)`,
    display: "flex",
    flexDirection: "column" as const,
  };

  switch (breakpoint) {
    case "lg":
      return {
        ...baseStyle,
        width: "100%",
      };
    case "md":
      return {
        ...baseStyle,
        width: "85%",
        margin: "0 auto",
        border: `1px solid ${theme.palette.success.main}`,
      };
    case "sm":
      return {
        ...baseStyle,
        width: "65%",
        margin: "0 auto",
        border: `1px solid ${theme.palette.info.main}`,
      };
    case "xs":
      return {
        ...baseStyle,
        width: "40%",
        margin: "0 auto",
        border: `1px solid ${theme.palette.warning.main}`,
      };
    default:
      return {
        ...baseStyle,
        width: "100%",
      };
  }
}
