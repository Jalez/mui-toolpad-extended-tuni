/** @format */

import { ComponentType } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

/**
 * Toolbar Registry System
 *
 * @version 3.1.0
 *
 * A flexible system for registering and managing toolbar actions based on routes.
 * Supports dynamic registration, unregistration, and automatic re-rendering.
 * Now with support for passing props to registered components.
 *
 * @example
 * ```tsx
 * // Register a toolbar action
 * registerToolbarAction('/my-route', MyActionComponent);
 *
 * // Register with props
 * registerToolbarAction('/my-route', MyActionComponent, { some: 'props' });
 *
 * // Clean up when component unmounts
 * useEffect(() => {
 *   registerToolbarAction('/my-route', MyActionComponent);
 *   return () => unregisterToolbarAction('/my-route', MyActionComponent);
 * }, []);
 * ```
 */

/**
 * Toolbar entry containing both the component and optional props
 */
export interface ToolbarEntry {
  Component: ComponentType<any>;
  props?: Record<string, any>;
}

/**
 * Internal store to manage toolbar state and trigger re-renders.
 * @internal
 */
interface ToolbarRegistryStore {
  version: number;
  incrementVersion: () => void;
}

// Add debounce to version updates
let debounceTimer: number | null = null;
const debouncedIncrementVersion = (store: ToolbarRegistryStore) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    store.incrementVersion();
  }, 100);
};

// Create the registry store
const useToolbarRegistryStoreRaw = create<ToolbarRegistryStore>((set) => ({
  version: 0,
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));

// New separate registries for page and app toolbars
const pageToolbarActionRegistry = new Map<string, ToolbarEntry[]>();
const appToolbarActionRegistry = new Map<string, ToolbarEntry[]>();

// Helper to check if entries are equal
const areEntriesEqual = (a: ToolbarEntry[], b: ToolbarEntry[]): boolean => {
  if (a.length !== b.length) return false;
  return a.every((entry, i) => entry.Component === b[i].Component);
};

// PAGE TOOLBAR FUNCTIONS

/**
 * Register a new page toolbar action for a specific route.
 *
 * @param path - The route path where this action should appear.
 * @param Component - The React component to render in the page toolbar.
 * @param props - Optional props to pass to the component.
 *
 * @example
 * registerPageToolbarAction('/my-route', MyPageAction);
 * registerPageToolbarAction('/my-route', MyPageAction, { color: 'primary' });
 */
export function registerPageToolbarAction(
  path: string,
  Component: ComponentType<any>,
  props?: Record<string, any>
) {
  const existing = pageToolbarActionRegistry.get(path) || [];
  const newEntry = { Component, props };

  // Check if entry already exists with same component
  const hasComponent = existing.some((entry) => entry.Component === Component);
  if (hasComponent) {
    // Update props if they changed
    const updated = existing.map((entry) =>
      entry.Component === Component ? newEntry : entry
    );
    if (!areEntriesEqual(existing, updated)) {
      pageToolbarActionRegistry.set(path, updated);
      debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
    }
  } else {
    pageToolbarActionRegistry.set(path, [...existing, newEntry]);
    debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
  }
}

/**
 * Unregister a page toolbar action from a specific route.
 *
 * @param path - The route path to remove the action from.
 * @param Component - The React component to remove.
 *
 * @example
 * unregisterPageToolbarAction('/my-route', MyPageAction);
 */
export function unregisterPageToolbarAction(
  path: string,
  Component: ComponentType<any>
) {
  const existing = pageToolbarActionRegistry.get(path);
  if (!existing) return;

  const filtered = existing.filter((entry) => entry.Component !== Component);

  if (filtered.length === 0) {
    pageToolbarActionRegistry.delete(path);
  } else {
    pageToolbarActionRegistry.set(path, filtered);
  }

  debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
}

/**
 * Get all registered page toolbar actions for a specific route.
 *
 * @param path - The route path to get the actions for.
 * @returns An array of registered page toolbar action entries.
 *
 * @example
 * const actions = getPageToolbarActions('/my-route');
 */
export function getPageToolbarActions(path: string): ToolbarEntry[] {
  return pageToolbarActionRegistry.get(path) || [];
}

/**
 * Clear all registered page toolbar actions for a specific route.
 *
 * @param path - The route path to clear the actions for.
 *
 * @example
 * clearPageToolbarActions('/my-route');
 */
export function clearPageToolbarActions(path: string) {
  if (pageToolbarActionRegistry.delete(path)) {
    debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
  }
}

// APP TOOLBAR FUNCTIONS

/**
 * Register a new app toolbar action for a specific route or global key.
 *
 * @param path - The key or route where this action should appear.
 * @param Component - The React component to render in the app toolbar.
 * @param props - Optional props to pass to the component.
 *
 * @example
 * registerAppToolbarAction('global', MyAppAction);
 * registerAppToolbarAction('global', MyAppAction, { variant: 'outlined' });
 */
export function registerAppToolbarAction(
  path: string,
  Component: ComponentType<any>,
  props?: Record<string, any>
) {
  const existing = appToolbarActionRegistry.get(path) || [];
  const newEntry = { Component, props };

  const hasComponent = existing.some((entry) => entry.Component === Component);
  if (hasComponent) {
    const updated = existing.map((entry) =>
      entry.Component === Component ? newEntry : entry
    );
    if (!areEntriesEqual(existing, updated)) {
      appToolbarActionRegistry.set(path, updated);
      debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
    }
  } else {
    appToolbarActionRegistry.set(path, [...existing, newEntry]);
    debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
  }
}

/**
 * Unregister an app toolbar action from a specific route or global key.
 *
 * @param path - The key or route to remove the action from.
 * @param Component - The React component to remove.
 *
 * @example
 * unregisterAppToolbarAction('global', MyAppAction);
 */
export function unregisterAppToolbarAction(
  path: string,
  Component: ComponentType<any>
) {
  const existing = appToolbarActionRegistry.get(path);
  if (!existing) return;

  const filtered = existing.filter((entry) => entry.Component !== Component);

  if (filtered.length === 0) {
    appToolbarActionRegistry.delete(path);
  } else {
    appToolbarActionRegistry.set(path, filtered);
  }

  debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
}

/**
 * Get all registered app toolbar actions for a specific route or global key.
 *
 * @param path - The key or route to get the actions for.
 * @returns An array of registered app toolbar action entries.
 *
 * @example
 * const actions = getAppToolbarActions('global');
 */
export function getAppToolbarActions(path: string): ToolbarEntry[] {
  return appToolbarActionRegistry.get(path) || [];
}

/**
 * Clear all registered app toolbar actions for a specific route or global key.
 *
 * @param path - The key or route to clear the actions for.
 *
 * @example
 * clearAppToolbarActions('global');
 */
export function clearAppToolbarActions(path: string) {
  if (appToolbarActionRegistry.delete(path)) {
    debouncedIncrementVersion(useToolbarRegistryStoreRaw.getState());
  }
}

// Export store hook with shallow comparison
export const useToolbarRegistryStore = () =>
  useToolbarRegistryStoreRaw((state) => ({ version: state.version }), shallow);
