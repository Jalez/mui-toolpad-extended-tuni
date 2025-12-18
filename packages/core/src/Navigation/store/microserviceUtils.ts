/** @format */

import { NavigationPageStoreItem, ViewStore } from "./types";

/**
 * Aggregates microservices from all available sources (app-level + external).
 * This is microservice-agnostic - it doesn't hard-code specific store types.
 *
 * @param state - The navigation store state
 * @returns Array of all available microservice navigation items
 */
export const getAllMicroservices = (
  state: ViewStore
): NavigationPageStoreItem[] => {
  return [
    ...state.allMicroserviceNavigation, // App-level
    ...state.externalMicroservices, // External (e.g., from CourseMicroservice context)
  ];
};

