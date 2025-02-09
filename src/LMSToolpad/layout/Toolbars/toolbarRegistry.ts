/** @format */

import { ComponentType } from 'react';
import { create } from 'zustand';

/**
 * Toolbar Registry System
 *
 * @version 3.0.0
 *
 * A flexible system for registering and managing toolbar actions based on routes.
 * Supports dynamic registration, unregistration, and automatic re-rendering.
 *
 * @example
 * ```tsx
 * // Register a toolbar action
 * registerToolbarAction('/my-route', MyActionComponent);
 *
 * // Clean up when component unmounts
 * useEffect(() => {
 *   registerToolbarAction('/my-route', MyActionComponent);
 *   return () => unregisterToolbarAction('/my-route', MyActionComponent);
 * }, []);
 * ```
 */

/**
 * Internal store to manage toolbar state and trigger re-renders.
 * @internal
 */
interface ToolbarStore {
  version: number;
  incrementVersion: () => void;
}

const useToolbarStore = create<ToolbarStore>((set) => ({
  version: 0,
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));

// New separate registries for page and app toolbars
const pageToolbarActionRegistry = new Map<string, ComponentType[]>();
const appToolbarActionRegistry = new Map<string, ComponentType[]>();

// PAGE TOOLBAR FUNCTIONS

/**
 * Register a new page toolbar action for a specific route.
 *
 * @param path - The route path where this action should appear.
 * @param Component - The React component to render in the page toolbar.
 *
 * @example
 * registerPageToolbarAction('/my-route', MyPageAction);
 */
export function registerPageToolbarAction(
  path: string,
  Component: ComponentType
) {
  const existing = pageToolbarActionRegistry.get(path) || [];
  pageToolbarActionRegistry.set(path, [...existing, Component]);
  useToolbarStore.getState().incrementVersion();
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
  Component: ComponentType
) {
  const existing = pageToolbarActionRegistry.get(path);
  if (!existing) return;
  const filtered = existing.filter((comp) => comp !== Component);
  if (filtered.length === 0) {
    pageToolbarActionRegistry.delete(path);
  } else {
    pageToolbarActionRegistry.set(path, filtered);
  }
  useToolbarStore.getState().incrementVersion();
}

/**
 * Get all registered page toolbar actions for a specific route.
 *
 * @param path - The route path to get the actions for.
 * @returns An array of registered page toolbar action components.
 *
 * @example
 * const actions = getPageToolbarActions('/my-route');
 */
export function getPageToolbarActions(path: string): ComponentType[] {
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
  pageToolbarActionRegistry.delete(path);
  useToolbarStore.getState().incrementVersion();
}

// APP TOOLBAR FUNCTIONS

/**
 * Register a new app toolbar action for a specific route or global key.
 *
 * @param path - The key or route where this action should appear.
 * @param Component - The React component to render in the app toolbar.
 *
 * @example
 * registerAppToolbarAction('global', MyAppAction);
 */
export function registerAppToolbarAction(
  path: string,
  Component: ComponentType
) {
  const existing = appToolbarActionRegistry.get(path) || [];
  const filtered = existing.filter((comp) => comp !== Component);
  appToolbarActionRegistry.set(path, [...filtered, Component]);
  useToolbarStore.getState().incrementVersion();
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
  Component: ComponentType
) {
  const existing = appToolbarActionRegistry.get(path);
  if (!existing) return;
  const filtered = existing.filter((comp) => comp !== Component);
  if (filtered.length === 0) {
    appToolbarActionRegistry.delete(path);
  } else {
    appToolbarActionRegistry.set(path, filtered);
  }
  useToolbarStore.getState().incrementVersion();
}

/**
 * Get all registered app toolbar actions for a specific route or global key.
 *
 * @param path - The key or route to get the actions for.
 * @returns An array of registered app toolbar action components.
 *
 * @example
 * const actions = getAppToolbarActions('global');
 */
export function getAppToolbarActions(path: string): ComponentType[] {
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
  appToolbarActionRegistry.delete(path);
  useToolbarStore.getState().incrementVersion();
}

export { useToolbarStore };
