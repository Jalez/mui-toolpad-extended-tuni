/** @format */
import { Layouts } from "react-grid-layout";
import { createGridItem } from "./layoutUtils";

// Use smaller minimum constraints to allow more flexibility
const baseConstraints = {
  minW: 1,
  minH: 1,
  maxW: 12,
  maxH: 12,
};

/**
 * Home screen preset layouts
 * These define different arrangements of the course-list, calendar, and mindmap components
 */
export const homePresetLayouts: Record<string, Layouts> = {
  default: {
    lg: [
      createGridItem("course-list", 0, 0, 6, 3, baseConstraints),
      createGridItem("calendar", 6, 0, 6, 3, baseConstraints),
      createGridItem("mindmap", 0, 3, 12, 3, baseConstraints),
    ],
    md: [
      createGridItem("course-list", 0, 0, 6, 3, baseConstraints),
      createGridItem("calendar", 6, 0, 6, 3, baseConstraints),
      createGridItem("mindmap", 0, 3, 12, 3, baseConstraints),
    ],
    sm: [
      createGridItem("course-list", 0, 0, 6, 3, baseConstraints),
      createGridItem("calendar", 6, 0, 6, 3, baseConstraints),
      createGridItem("mindmap", 0, 3, 12, 3, baseConstraints),
    ],
    xs: [
      createGridItem("course-list", 0, 0, 12, 3, baseConstraints),
      createGridItem("calendar", 0, 3, 12, 3, baseConstraints),
      createGridItem("mindmap", 0, 6, 12, 3, baseConstraints),
    ],
  },
};

/**
 * Helper function to create constraint objects for grid items
 * @param minW Minimum width
 * @param minH Minimum height
 * @param maxW Maximum width
 * @param maxH Maximum height
 * @returns Constraints object
 */
export function createConstraints(minW = 1, minH = 1, maxW = 12, maxH = 12) {
  return { minW, minH, maxW, maxH };
}
