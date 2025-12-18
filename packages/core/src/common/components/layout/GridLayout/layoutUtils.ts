/** @format */

import { Layout } from "react-grid-layout";

/**
 * Options for creating a grid item layout.
 * All properties are optional, allowing for flexible grid item creation.
 */
export interface CreateGridItemOptions {
  /**
   * Unique identifier for the grid item.
   * If not provided, a unique ID will be generated.
   */
  id?: string;

  /**
   * X position in the grid (column index).
   * Defaults to 0 if not specified.
   */
  x?: number;

  /**
   * Y position in the grid (row index).
   * Defaults to 0 if not specified.
   */
  y?: number;

  /**
   * Width of the grid item in grid units.
   * If null, the item will span the full width of the grid.
   * Defaults to 1 if not specified.
   */
  w?: number | null;

  /**
   * Height of the grid item in grid units.
   * Defaults to 1 if not specified.
   */
  h?: number | null;

  /**
   * Minimum width constraint.
   * Defaults to 1 if not specified.
   */
  minW?: number;

  /**
   * Maximum width constraint.
   * If null, no maximum width constraint.
   */
  maxW?: number | null;

  /**
   * Minimum height constraint.
   * Defaults to 1 if not specified.
   */
  minH?: number;

  /**
   * Maximum height constraint.
   * If null, no maximum height constraint.
   */
  maxH?: number | null;

  /**
   * Whether the item is static (cannot be moved or resized).
   * Defaults to false.
   */
  static?: boolean;
}

/**
 * Creates a grid item layout configuration.
 *
 * @example
 * // Create a grid item with default settings
 * createGridItem({ id: "my-item" });
 *
 * @example
 * // Create a grid item with specific dimensions
 * createGridItem({ id: "my-item", x: 0, y: 0, w: 7, h: 5 });
 *
 * @example
 * // Create a full-width grid item
 * createGridItem({
 *   id: "my-item",
 *   w: null, // null means full width
 *   h: 5
 * });
 */
export function createGridItem(options: CreateGridItemOptions): Layout {
  const {
    id = `grid-item-${Math.random().toString(36).substr(2, 9)}`,
    x = 0,
    y = 0,
    w = 1,
    h = 1,
    minW = 1,
    maxW = null,
    minH = 1,
    maxH = null,
    static: isStatic = false,
  } = options;

  return {
    i: id,
    x,
    y,
    w: w ?? 12, // Default to full width if null
    h: h ?? 1,
    minW,
    maxW: maxW ?? undefined,
    minH,
    maxH: maxH ?? undefined,
    static: isStatic,
  };
}
