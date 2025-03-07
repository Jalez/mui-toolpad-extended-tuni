/** @format */
import { ComponentType } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";

/**
 * Widget Registry System
 *
 * @version 1.1.0
 *
 * A flexible system for registering and managing widgets for grid layouts.
 * Supports dynamic registration, unregistration, and automatic re-rendering.
 * Optimized to prevent excessive re-rendering.
 */

/**
 * Widget entry containing both the component and optional props
 */
export interface WidgetEntry {
  Component: ComponentType<any>;
  props?: Record<string, any>;
  name: string;
  description?: string;
  category?: string;
  icon?: string;
}

/**
 * Internal store to manage widget registry state and trigger re-renders.
 * @internal
 */
interface WidgetRegistryStore {
  // Using a map for widgets ensures shallow comparison works better
  widgets: Map<string, WidgetEntry>;
  registerWidget: (id: string, entry: WidgetEntry) => void;
  unregisterWidget: (id: string) => void;
}

// Create a singleton instance of the widget registry
const widgetRegistry = new Map<string, WidgetEntry>();

// Create the store with optimized structure and singleton registry
const useWidgetRegistryStoreRaw = create<WidgetRegistryStore>((set) => ({
  widgets: widgetRegistry,
  registerWidget: (id, entry) => {
    widgetRegistry.set(id, entry);
    set({ widgets: new Map(widgetRegistry) });
  },
  unregisterWidget: (id) => {
    if (widgetRegistry.has(id)) {
      widgetRegistry.delete(id);
      set({ widgets: new Map(widgetRegistry) });
    }
  },
}));

// Helper hook that only triggers re-renders when the widget map actually changes
export const useWidgetRegistryStore = () =>
  useWidgetRegistryStoreRaw((state) => state.widgets, shallow);

/**
 * Register a new widget.
 *
 * @param id - The unique identifier for this widget.
 * @param Component - The React component to render.
 * @param options - Optional configuration for the widget including props.
 */
export function registerWidget(
  id: string,
  Component: ComponentType<any>,
  options?: {
    props?: Record<string, any>;
    name?: string;
    description?: string;
    category?: string;
    icon?: string;
  }
) {
  if (widgetRegistry.has(id)) {
    return; // Skip if widget is already registered
  }

  const entry: WidgetEntry = {
    Component,
    props: options?.props,
    name: options?.name || id,
    description: options?.description,
    category: options?.category,
    icon: options?.icon,
  };

  useWidgetRegistryStoreRaw.getState().registerWidget(id, entry);
}

/**
 * Unregister a widget.
 *
 * @param id - The unique identifier for the widget to remove.
 */
export function unregisterWidget(id: string) {
  useWidgetRegistryStoreRaw.getState().unregisterWidget(id);
}

/**
 * Get a specific widget by ID.
 *
 * @param id - The unique identifier for the widget.
 * @returns The widget entry or undefined if not found.
 */
export function getWidget(id: string): WidgetEntry | undefined {
  return widgetRegistry.get(id);
}

/**
 * Get all registered widgets.
 *
 * @returns A Map of all registered widgets.
 */
export function getAllWidgets(): Map<string, WidgetEntry> {
  return new Map(widgetRegistry);
}

/**
 * Get all widget IDs.
 *
 * @returns An array of all registered widget IDs.
 */
export function getWidgetIds(): string[] {
  return Array.from(widgetRegistry.keys());
}

/**
 * Check if a widget is registered.
 *
 * @param id - The unique identifier for the widget.
 * @returns True if the widget is registered, false otherwise.
 */
export function isWidgetRegistered(id: string): boolean {
  return widgetRegistry.has(id);
}
