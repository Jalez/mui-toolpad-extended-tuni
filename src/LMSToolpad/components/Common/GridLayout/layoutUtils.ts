/** @format */

import { Layout } from "react-grid-layout";

// Drastically reduced leap sizes for finer control
export const WIDTH_LEAP = 30 / 30; // 1 grid unit = 30px
export const HEIGHT_LEAP = 30 / 30; // 1 grid unit = 30px

// Minimal size constraints
export const MIN_WIDTH_LEAP = 1; // 1 grid unit minimum
export const MIN_HEIGHT_LEAP = 1; // 1 grid unit minimum

/**
 * Options for creating a grid layout item
 */
export interface CreateGridItemOptions {
  /** Item ID */
  id: string;
  /** X position (column) */
  x?: number | null;
  /** Y position (row) */
  y?: number | null;
  /** Width in grid columns. If null/undefined, defaults to full width (15 cols) */
  w?: number | null;
  /** Height in grid rows. If null/undefined, defaults to 3 rows */
  h?: number | null;
  /** Minimum width in grid columns */
  minW?: number | null;
  /** Maximum width in grid columns */
  maxW?: number | null;
  /** Minimum height in grid rows */
  minH?: number | null;
  /** Maximum height in grid rows */
  maxH?: number | null;
}

/**
 * Create a grid layout item config
 * 
 * @param options - Configuration options for the grid item
 * @returns Layout configuration for react-grid-layout
 * 
 * @example
 * ```ts
 * // Full width item
 * createGridItem({ id: "my-item", w: null, h: 5 });
 * 
 * // Specific size
 * createGridItem({ id: "my-item", x: 0, y: 0, w: 7, h: 5 });
 * 
 * // With constraints
 * createGridItem({ 
 *   id: "my-item", 
 *   w: 8, 
 *   h: 6,
 *   minW: 4,
 *   maxW: 12 
 * });
 * ```
 */
export function createGridItem(options: CreateGridItemOptions): Layout {
  const {
    id,
    x = 0,
    y = 0,
    w = null,
    h = null,
    minW = null,
    maxW = null,
    minH = null,
    maxH = null,
  } = options;

  // Default to full width (15 cols) if width is not specified
  const width = w ?? 15;
  // Default to 3 rows height if height is not specified
  const height = h ?? 3;

  return {
    i: id,
    x: x ?? 0,
    y: y ?? 0,
    w: width,
    h: height,
    // Default to smaller minimum sizes if not specified
    minW: minW ?? 1,
    maxW: maxW ?? undefined,
    minH: minH ?? 1,
    maxH: maxH ?? undefined,
  };
}
