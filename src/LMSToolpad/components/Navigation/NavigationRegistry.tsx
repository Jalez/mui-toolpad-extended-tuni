/** @format */
import { ComponentType, ReactNode } from "react";
import type { ReactElement } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { SvgIconComponent } from "@mui/icons-material";
import { useNavigationStore } from "./store/useNavigationStore";
import { useNavigationFilterStore } from "./store/useNavigationFilterStore";

/**
 * Microservice Registry System
 *
 * @version 1.3.0
 *
 * A flexible system for registering and managing microservices for grid layouts.
 * Supports dynamic registration, unregistration, and automatic re-rendering.
 * Optimized to prevent excessive re-rendering.
 * 
 * Now supports route providers for microservice-agnostic route registration.
 */

/**
 * Route provider function that returns Route elements
 */
export type RouteProvider = () => ReactElement[];

/**
 * Microservice entry containing both the component and optional props
 */
export interface MicroserviceEntry {
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
 * Internal store to manage microservice registry state and trigger re-renders.
 * @internal
 */
interface MicroserviceRegistryStore {
  microservices: Map<string, MicroserviceEntry>;
  routeProviders: Map<string, RouteProvider>;
  lastUpdate: number;
  registerMicroservice: (id: string, entry: MicroserviceEntry) => void;
  unregisterMicroservice: (id: string) => void;
  registerRouteProvider: (id: string, provider: RouteProvider) => void;
  unregisterRouteProvider: (id: string) => void;
  getRoutes: () => Array<{
    path: string;
    element: ReactNode;
    index?: boolean;
  }>;
}

// Create a singleton instance of the microservice registry
const microserviceRegistry = new Map<string, MicroserviceEntry>();
// Create a singleton instance of the route providers registry
const routeProvidersRegistry = new Map<string, RouteProvider>();

// Function to update navigation with current microservice state
const updateMicroserviceNavigation = () => {
  const navigationStore = useNavigationStore.getState();
  const { setFilterOptions } = useNavigationFilterStore.getState();

  // Group microservices by category, but only include microservices that should appear in navigation
  const sections: Record<
    string,
    Array<{
      segment: string;
      title: string;
      Icon?: SvgIconComponent;
      description?: string;
    }>
  > = {};

  microserviceRegistry.forEach((microservice, id) => {
    // Only add microservices to navigation if explicitly marked as showInNavigation
    if (!microservice.metadata?.showInNavigation) {
      return;
    }

    const category = microservice.category || "Microservices";
    if (!sections[category]) {
      sections[category] = [];
    }

    sections[category].push({
      segment: id,
      title: microservice.name,
      Icon: microservice.iconComponent,
      description: microservice.description,
    });

    // Set visibility if specified in metadata
    if (microservice.metadata?.keepVisible) {
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
const useMicroserviceRegistryStoreRaw = create<MicroserviceRegistryStore>((set) => ({
  microservices: microserviceRegistry,
  routeProviders: routeProvidersRegistry,
  lastUpdate: Date.now(),
  registerMicroservice: (id, entry) => {
    microserviceRegistry.set(id, entry);
    set({
      microservices: new Map(microserviceRegistry),
      lastUpdate: Date.now(),
    });
    updateMicroserviceNavigation();
  },
  unregisterMicroservice: (id) => {
    if (microserviceRegistry.has(id)) {
      microserviceRegistry.delete(id);
      set({
        microservices: new Map(microserviceRegistry),
        lastUpdate: Date.now(),
      });
      updateMicroserviceNavigation();
    }
  },
  registerRouteProvider: (id, provider) => {
    routeProvidersRegistry.set(id, provider);
    set({
      routeProviders: new Map(routeProvidersRegistry),
      lastUpdate: Date.now(),
    });
  },
  unregisterRouteProvider: (id) => {
    if (routeProvidersRegistry.has(id)) {
      routeProvidersRegistry.delete(id);
      set({
        routeProviders: new Map(routeProvidersRegistry),
        lastUpdate: Date.now(),
      });
    }
  },
  getRoutes: () => {
    const routes: Array<{
      path: string;
      element: ReactNode;
      index?: boolean;
    }> = [];

    microserviceRegistry.forEach((microservice) => {
      if (microservice.metadata?.route) {
        const Component = microservice.Component;
        routes.push({
          path: microservice.metadata.route.path,
          element: microservice.metadata.route.element || (
            <Component {...microservice.props} />
          ),
          index: microservice.metadata.route.index,
        });
      }
    });

    return routes;
  },
}));

// Helper hook that only triggers re-renders when the microservice map actually changes
export const useMicroserviceRegistryStore = () =>
  useMicroserviceRegistryStoreRaw(
    (state) => ({
      microservices: state.microservices,
      routeProviders: state.routeProviders,
      lastUpdate: state.lastUpdate,
    }),
    shallow
  );

/**
 * Register a new microservice.
 *
 * @param id - The unique identifier for this microservice.
 * @param Component - The React component to render.
 * @param options - Optional configuration for the microservice including props and metadata.
 */
export function registerMicroservice(
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
  if (microserviceRegistry.has(id)) {
    return; // Skip if microservice is already registered
  }

  const entry: MicroserviceEntry = {
    Component,
    props: options?.props,
    name: options?.name || id,
    description: options?.description,
    category: options?.category,
    iconComponent: options?.iconComponent,
    metadata: options?.metadata,
  };

  useMicroserviceRegistryStoreRaw.getState().registerMicroservice(id, entry);
}

/**
 * Unregister a microservice.
 *
 * @param id - The unique identifier for the microservice to remove.
 */
export function unregisterMicroservice(id: string) {
  useMicroserviceRegistryStoreRaw.getState().unregisterMicroservice(id);
}

/**
 * Get a specific microservice by ID.
 *
 * @param id - The unique identifier for the microservice.
 * @returns The microservice entry or undefined if not found.
 */
export function getMicroservice(id: string): MicroserviceEntry | undefined {
  return microserviceRegistry.get(id);
}

/**
 * Get all registered microservices.
 *
 * @returns A Map of all registered microservices.
 */
export function getAllMicroservices(): Map<string, MicroserviceEntry> {
  return new Map(microserviceRegistry);
}

/**
 * Get all microservice IDs.
 *
 * @returns An array of all registered microservice IDs.
 */
export function getMicroserviceIds(): string[] {
  return Array.from(microserviceRegistry.keys());
}

/**
 * Check if a microservice is registered.
 *
 * @param id - The unique identifier for the microservice.
 * @returns True if the microservice is registered, false otherwise.
 */
export function isMicroserviceRegistered(id: string): boolean {
  return microserviceRegistry.has(id);
}

/**
 * Register a route provider.
 * Route providers are functions that return Route elements, allowing microservices
 * to register complex nested route structures.
 *
 * @param id - The unique identifier for this route provider.
 * @param provider - Function that returns an array of Route elements.
 */
export function registerRouteProvider(id: string, provider: RouteProvider) {
  useMicroserviceRegistryStoreRaw.getState().registerRouteProvider(id, provider);
}

/**
 * Unregister a route provider.
 *
 * @param id - The unique identifier for the route provider to remove.
 */
export function unregisterRouteProvider(id: string) {
  useMicroserviceRegistryStoreRaw.getState().unregisterRouteProvider(id);
}
