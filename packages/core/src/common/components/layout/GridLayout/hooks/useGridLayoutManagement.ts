/** @format */
import { useState, useCallback, useEffect, useRef } from "react";
import { Layout, Layouts } from "react-grid-layout";
import { getFromLS, saveToLS } from "../layoutStorageUtils";

/**
 * Options for the useGridLayoutManagement hook
 */
interface UseGridLayoutManagementOptions {
  /** Storage key for persisting layouts */
  storageKey: string;
  /** Default layouts to use if none found in storage */
  defaultLayouts: Layouts;
  /** Function to run when layout changes */
  onLayoutChangeCallback?: (layouts: Layouts) => void;
  /** Debounce time for saving to localStorage (ms) */
  debounceTime?: number;
}

/**
 * Check if two layouts are equal by deeply comparing their structure and values
 * instead of relying on string representation which can have ordering issues
 */
function areLayoutsEqual(layoutA: Layouts, layoutB: Layouts): boolean {
  try {
    // First check if both objects have the same breakpoint keys
    const keysA = Object.keys(layoutA).sort();
    const keysB = Object.keys(layoutB).sort();

    if (keysA.length !== keysB.length) return false;

    // Check if all keys match
    if (keysA.join(",") !== keysB.join(",")) return false;

    // For each breakpoint, compare layouts
    for (const key of keysA) {
      const layoutsA = layoutA[key] || [];
      const layoutsB = layoutB[key] || [];

      if (layoutsA.length !== layoutsB.length) return false;

      // Create a map of layouts by their ID for easier comparison
      const layoutMapA = new Map(layoutsA.map((item) => [item.i, item]));
      const layoutMapB = new Map(layoutsB.map((item) => [item.i, item]));

      // Check if all IDs match
      if (layoutMapA.size !== layoutMapB.size) return false;

      // Compare each layout item's properties
      for (const [id, itemA] of layoutMapA.entries()) {
        const itemB = layoutMapB.get(id);
        if (!itemB) return false;

        // Compare essential properties of layout items
        if (
          itemA.x !== itemB.x ||
          itemA.y !== itemB.y ||
          itemA.w !== itemB.w ||
          itemA.h !== itemB.h ||
          itemA.minW !== itemB.minW ||
          itemA.minH !== itemB.minH ||
          itemA.maxW !== itemB.maxW ||
          itemA.maxH !== itemB.maxH ||
          itemA.static !== itemB.static
        ) {
          return false;
        }
      }
    }

    return true;
  } catch (e) {
    console.error("Error comparing layouts:", e);
    return false;
  }
}

/**
 * Hook for managing grid layouts, including persistence, updates, and preset handling
 *
 * @param options Configuration options
 * @returns Layout management utilities
 */
export function useGridLayoutManagement({
  storageKey,
  defaultLayouts,
  onLayoutChangeCallback,
  debounceTime = 500,
}: UseGridLayoutManagementOptions) {
  const [layouts, setLayouts] = useState<Layouts>(() => {
    const savedLayouts = getFromLS(storageKey);
    return savedLayouts || JSON.parse(JSON.stringify(defaultLayouts));
  });

  const prevLayoutsRef = useRef<Layouts>(layouts);
  const saveTimerRef = useRef<number | null>(null);
  const isUpdatingRef = useRef(false);

  const onLayoutChange = useCallback(
    (_: Layout[], allLayouts: Layouts) => {
      if (isUpdatingRef.current) return;
      if (areLayoutsEqual(allLayouts, prevLayoutsRef.current)) return;

      isUpdatingRef.current = true;
      prevLayoutsRef.current = allLayouts;

      setLayouts(allLayouts);

      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      const debounceSave = () => {
        saveToLS(storageKey, allLayouts);
        if (onLayoutChangeCallback) {
          onLayoutChangeCallback(allLayouts);
        }
        isUpdatingRef.current = false;
      };

      saveTimerRef.current = window.setTimeout(debounceSave, debounceTime);
    },
    [storageKey, onLayoutChangeCallback, debounceTime]
  );

  const applyLayout = useCallback(
    (newLayouts: Layouts) => {
      // if (areLayoutsEqual(newLayouts, layouts)) return;

      const layoutsCopy = JSON.parse(JSON.stringify(newLayouts));
      prevLayoutsRef.current = layoutsCopy;

      setLayouts(layoutsCopy);
      saveToLS(storageKey, layoutsCopy);

      if (onLayoutChangeCallback) {
        onLayoutChangeCallback(layoutsCopy);
      }
    },
    [storageKey, onLayoutChangeCallback, layouts]
  );

  const resetToDefault = useCallback(() => {
    applyLayout(defaultLayouts);
  }, [applyLayout, defaultLayouts]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  return {
    layouts,
    onLayoutChange,
    applyLayout,
    resetToDefault,
  };
}
