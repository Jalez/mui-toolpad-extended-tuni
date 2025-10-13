/** @format */

export const PANEL_DIMENSIONS = {
  MIN_WIDTH: 400,
  MAX_WIDTH: 1200,
  DEFAULT_WIDTH: 600,
  MIN_HEIGHT: 500,
} as const;

// Viewport constants
export const VIEWPORT_CONSTRAINTS = {
  MIN_ZOOM: 0.2,
  MAX_ZOOM: 4,
  DEFAULT_ZOOM: 1.5,
  FIT_VIEW_PADDING: 0.2,
  CENTER_ANIMATION_DURATION: 800,
} as const;

// Grid constants
export const GRID_SETTINGS = {
  SNAP_GRID: [20, 20],
  BACKGROUND_GAP: 30,
  BACKGROUND_SIZE: 1,
} as const;

// Layout constants
export const LAYOUT_OPTIONS = {
  NODE_DISTANCE: 200,
  RANK_SEPARATION: 200,
  CENTER_STRENGTH: 0.5,
} as const;

// Node position constants
export const NODE_POSITION = {
  DEFAULT_ROOT_X: 400,
  DEFAULT_ROOT_Y: 300,
  LEVEL_X_OFFSET: 400,
  LEVEL_Y_OFFSET: 200,
} as const;
