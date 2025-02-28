/** @format */

import { Layout } from "react-grid-layout";

// Drastically reduced leap sizes for finer control
export const WIDTH_LEAP = 30 / 30; // 1 grid unit = 30px
export const HEIGHT_LEAP = 30 / 30; // 1 grid unit = 30px

// Minimal size constraints
export const MIN_WIDTH_LEAP = 1; // 1 grid unit minimum
export const MIN_HEIGHT_LEAP = 1; // 1 grid unit minimum

/**
 * Create a grid layout item config
 */
export function createGridItem(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
  options?: {
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
  }
): Layout {
  return {
    i: id,
    x,
    y,
    w,
    h,
    // Default to smaller minimum sizes if not specified
    minW: options?.minW ?? 1,
    maxW: options?.maxW,
    minH: options?.minH ?? 1,
    maxH: options?.maxH,
  };
}
