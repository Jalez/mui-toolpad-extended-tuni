/** @format */

const STORAGE_KEY_PREFIX = "resizable-panel-dimensions-";

/**
 * loadDimensions:
 * Attempts to retrieve stored panel dimensions by ID from localStorage,
 * falling back to provided defaultDimensions if none found.
 */
export function loadDimensions(
  id: string,
  defaultDimensions: { width: number; height: number }
) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + id);
    return stored ? JSON.parse(stored) : defaultDimensions;
  } catch (error) {
    console.warn("Failed to load panel dimensions:", error);
    return defaultDimensions;
  }
}

/**
 * saveDimensions:
 * Persists the given dimensions in localStorage under a unique ID key,
 * allowing the panel to restore its last settings at load time.
 */
export function saveDimensions(
  id: string,
  dimensions: { width: number; height: number }
) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + id, JSON.stringify(dimensions));
  } catch (error) {
    console.warn("Failed to save panel dimensions:", error);
  }
}
