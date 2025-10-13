/** @format */

import { ComponentType } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

/**
 * Controls Registry System
 *
 * @version 1.1.0
 *
 * A flexible system for registering and managing different types of controls in the mindmap.
 * Supports dynamic registration, unregistration, and automatic re-rendering.
 * Different control types can be registered separately (navigation, view settings, etc.)
 * Uses named controls to prevent duplicate registrations.
 *
 * @example
 * ```tsx
 * // Register a navigation control
 * registerControl('navigation', 'fit-view', FitViewComponent);
 *
 * // Register with props
 * registerControl('viewSettings', 'grid-toggle', GridToggleComponent, { some: 'props' });
 *
 * // Clean up when component unmounts
 * useEffect(() => {
 *   registerControl('navigation', 'my-control', MyComponent);
 *   return () => unregisterControl('navigation', 'my-control');
 * }, []);
 * ```
 */

// Control types - add more as needed
export type ControlType = "navigation" | "viewSettings" | "tools" | "custom";

/**
 * Control entry containing the component, name, and optional props
 */
export interface ControlEntry {
  name: string;
  Component: ComponentType<any>;
  props?: Record<string, any>;
  order?: number; // Optional order property to sort controls
}

/**
 * Internal store to manage controls state and trigger re-renders.
 * @internal
 */
interface ControlsRegistryStore {
  version: number;
  incrementVersion: () => void;
}

// Add debounce to version updates
let debounceTimer: number | null = null;
const debouncedIncrementVersion = (store: ControlsRegistryStore) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    store.incrementVersion();
  }, 100);
};

// Create the registry store
const useControlsRegistryStoreRaw = create<ControlsRegistryStore>((set) => ({
  version: 0,
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));

// Separate registries for different control types, using Map<ControlType, Map<context, Map<name, ControlEntry>>>
const controlsRegistry = new Map<
  ControlType,
  Map<string, Map<string, ControlEntry>>
>();

// Initialize registry for each control type
const initRegistry = (type: ControlType) => {
  if (!controlsRegistry.has(type)) {
    controlsRegistry.set(type, new Map<string, Map<string, ControlEntry>>());
  }
  return controlsRegistry.get(type)!;
};

// Initialize context in registry
const initContext = (
  registry: Map<string, Map<string, ControlEntry>>,
  context: string
) => {
  if (!registry.has(context)) {
    registry.set(context, new Map<string, ControlEntry>());
  }
  return registry.get(context)!;
};

/**
 * Register a new control for a specific context and type.
 *
 * @param type - The type of control (navigation, viewSettings, etc.)
 * @param context - The context identifier (usually the component name or path)
 * @param name - A unique name for this control within its type and context
 * @param Component - The React component to render
 * @param props - Optional props to pass to the component
 * @param order - Optional order number to sort controls (lower numbers appear first)
 */
export function registerControl(
  type: ControlType,
  context: string,
  name: string,
  Component: ComponentType<any>,
  props?: Record<string, any>,
  order?: number
) {
  const registry = initRegistry(type);
  const contextRegistry = initContext(registry, context);

  const controlEntry = { name, Component, props, order };

  // Set the control in the registry - this will replace any existing control with the same name
  contextRegistry.set(name, controlEntry);

  // Trigger a re-render
  debouncedIncrementVersion(useControlsRegistryStoreRaw.getState());
}

/**
 * Unregister a control from a specific context and type.
 *
 * @param type - The type of control (navigation, viewSettings, etc.)
 * @param context - The context identifier to remove the control from
 * @param name - The name of the control to remove
 */
export function unregisterControl(
  type: ControlType,
  context: string,
  name: string
) {
  const registry = controlsRegistry.get(type);
  if (!registry) return;

  const contextRegistry = registry.get(context);
  if (!contextRegistry) return;

  const deleted = contextRegistry.delete(name);

  // If the context is now empty, remove it
  if (contextRegistry.size === 0) {
    registry.delete(context);
  }

  // Only trigger re-render if something was actually removed
  if (deleted) {
    debouncedIncrementVersion(useControlsRegistryStoreRaw.getState());
  }
}

/**
 * Get all registered controls for a specific context and type.
 *
 * @param type - The type of control (navigation, viewSettings, etc.)
 * @param context - The context identifier to get the controls for
 * @returns An array of registered control entries
 */
export function getControls(
  type: ControlType,
  context: string
): ControlEntry[] {
  const registry = controlsRegistry.get(type);
  if (!registry) return [];

  const contextRegistry = registry.get(context);
  if (!contextRegistry) return [];

  // Convert Map values to array and sort by order
  const entries = Array.from(contextRegistry.values());

  // Sort by order if available
  return entries.sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
}

/**
 * Clear all registered controls for a specific context and type.
 *
 * @param type - The type of control (navigation, viewSettings, etc.)
 * @param context - The context identifier to clear the controls for
 */
export function clearControls(type: ControlType, context: string) {
  const registry = controlsRegistry.get(type);
  if (registry?.delete(context)) {
    debouncedIncrementVersion(useControlsRegistryStoreRaw.getState());
  }
}

/**
 * Check if a control exists in a specific context and type.
 *
 * @param type - The type of control (navigation, viewSettings, etc.)
 * @param context - The context identifier to check in
 * @param name - The name of the control to check for
 * @returns Whether the control exists
 */
export function hasControl(
  type: ControlType,
  context: string,
  name: string
): boolean {
  const registry = controlsRegistry.get(type);
  if (!registry) return false;

  const contextRegistry = registry.get(context);
  if (!contextRegistry) return false;

  return contextRegistry.has(name);
}

// Export store hook with shallow comparison
export const useControlsRegistryStore = () =>
  useControlsRegistryStoreRaw((state) => ({ version: state.version }), shallow);
