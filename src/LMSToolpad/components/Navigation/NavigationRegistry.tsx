/** @format */
import { ComponentType, ReactNode } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { SvgIconComponent } from "@mui/icons-material";
import { useNavigationStore } from "./store/useNavigationStore";
import { useNavigationFilterStore } from "./store/useNavigationFilterStore";

/**
 * Widget Registry System
 *
 * @version 1.2.0
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
  iconComponent?: SvgIconComponent;
  metadata?: {
    keepVisible?: boolean;
    order?: number;
    tags?: string[];
    showInNavigation?: boolean;
    route?: {
      path: string;
      element?: ReactNode;
      index?: boolean;
    };
  };
}

/**
 * Internal store to manage widget registry state and trigger re-renders.
 * @internal
 */
interface WidgetRegistryStore {
  widgets: Map<string, WidgetEntry>;
  lastUpdate: number;
  registerWidget: (id: string, entry: WidgetEntry) => void;
  unregisterWidget: (id: string) => void;
  getRoutes: () => Array<{
    path: string;
    element: ReactNode;
    index?: boolean;
  }>;
}

// Create a singleton instance of the widget registry
const widgetRegistry = new Map<string, WidgetEntry>();

// Function to update navigation with current widget state
const updateWidgetNavigation = () => {
  const navigationStore = useNavigationStore.getState();
  const { setFilterOptions } = useNavigationFilterStore.getState();

  // Group widgets by category, but only include widgets that should appear in navigation
  const sections: Record<
    string,
    Array<{
      segment: string;
      title: string;
      Icon?: SvgIconComponent;
      description?: string;
    }>
  > = {};

  widgetRegistry.forEach((widget, id) => {
    // Only add widgets to navigation if explicitly marked as showInNavigation
    if (!widget.metadata?.showInNavigation) {
      return;
    }

    const category = widget.category || "Widgets";
    if (!sections[category]) {
      sections[category] = [];
    }

    sections[category].push({
      segment: id,
      title: widget.name,
      Icon: widget.iconComponent,
      description: widget.description,
    });

    // Set visibility if specified in metadata
    if (widget.metadata?.keepVisible) {
      setFilterOptions((prev) => ({
        ...prev,
        [category]: true,
      }));
    }
  });

  // Update navigation for each section
  Object.entries(sections).forEach(([category, pages]) => {
    navigationStore.addSection({
      underHeader: category,
      pages,
    });
  });

  navigationStore.recalculateNavigation();
};

// Create the store with optimized structure and singleton registry
const useWidgetRegistryStoreRaw = create<WidgetRegistryStore>((set) => ({
  widgets: widgetRegistry,
  lastUpdate: Date.now(),
  registerWidget: (id, entry) => {
    widgetRegistry.set(id, entry);
    set({
      widgets: new Map(widgetRegistry),
      lastUpdate: Date.now(),
    });
    updateWidgetNavigation();
  },
  unregisterWidget: (id) => {
    if (widgetRegistry.has(id)) {
      widgetRegistry.delete(id);
      set({
        widgets: new Map(widgetRegistry),
        lastUpdate: Date.now(),
      });
      updateWidgetNavigation();
    }
  },
  getRoutes: () => {
    const routes: Array<{
      path: string;
      element: ReactNode;
      index?: boolean;
    }> = [];

    widgetRegistry.forEach((widget) => {
      if (widget.metadata?.route) {
        const Component = widget.Component;
        routes.push({
          path: widget.metadata.route.path,
          element: widget.metadata.route.element || (
            <Component {...widget.props} />
          ),
          index: widget.metadata.route.index,
        });
      }
    });

    return routes;
  },
}));

// Helper hook that only triggers re-renders when the widget map actually changes
export const useWidgetRegistryStore = () =>
  useWidgetRegistryStoreRaw(
    (state) => ({
      widgets: state.widgets,
      lastUpdate: state.lastUpdate,
    }),
    shallow
  );

/**
 * Register a new widget.
 *
 * @param id - The unique identifier for this widget.
 * @param Component - The React component to render.
 * @param options - Optional configuration for the widget including props and metadata.
 */
export function registerWidget(
  id: string,
  Component: ComponentType<any>,
  options?: {
    props?: Record<string, any>;
    name?: string;
    description?: string;
    category?: string;
    iconComponent?: SvgIconComponent;
    metadata?: {
      keepVisible?: boolean;
      order?: number;
      tags?: string[];
      showInNavigation?: boolean;
      route?: {
        path: string;
        element?: ReactNode;
        index?: boolean;
      };
    };
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
    iconComponent: options?.iconComponent,
    metadata: options?.metadata,
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
