/** @format */

import {
  NavigationPageStoreItem,
  NavigationSection,
  ViewStore,
} from "./types";
import { getAllMicroservices } from "./microserviceUtils";
import { calculateNavigationFromSections } from "./navigationCalculator";

/**
 * Updates microservices for a single child navigation item.
 * Filters out existing microservices and adds new ones that match the child's metadata.
 *
 * @param child - The child navigation item to update
 * @param allMicroservices - All available microservices
 * @returns Updated child item or null if no changes
 */
const updateChildMicroservices = (
  child: NavigationPageStoreItem,
  allMicroservices: NavigationPageStoreItem[]
): NavigationPageStoreItem | null => {
  if (!child.metadata?.microservices) {
    return null;
  }

  // Filter out existing microservices from children
  const originalSubChildren =
    (child.children || []).filter(
      (subChild) =>
        !allMicroservices.some((ms) => ms.segment === subChild.segment)
    );

  // Get matching microservices
  const msItems = allMicroservices.filter((ms) =>
    child.metadata!.microservices!.includes(ms.segment)
  );

  const newSubChildren = [...originalSubChildren, ...msItems];

  // Check if children actually changed
  const currentChildren = child.children || [];
  const hasChanged =
    currentChildren.length !== newSubChildren.length ||
    !currentChildren.every(
      (c, i) => c.segment === newSubChildren[i]?.segment
    );

  if (hasChanged) {
    return { ...child, children: newSubChildren };
  }

  return null;
};

/**
 * Updates microservices for a single page navigation item.
 * Handles both direct page microservices and nested children microservices.
 *
 * @param page - The page navigation item to update
 * @param allMicroservices - All available microservices
 * @returns Updated page item or null if no changes
 */
const updatePageMicroservices = (
  page: NavigationPageStoreItem,
  allMicroservices: NavigationPageStoreItem[]
): NavigationPageStoreItem | null => {
  // Case 1: Page directly expects microservices
  if (page.metadata?.microservices) {
    const originalChildren =
      page.children?.filter(
        (child) =>
          !allMicroservices.some((ms) => ms.segment === child.segment)
      ) || [];

    const msItems = allMicroservices.filter((ms) =>
      page.metadata!.microservices!.includes(ms.segment)
    );

    const newChildren = [...originalChildren, ...msItems];

    // Check if children changed
    const currentChildren = page.children || [];
    const hasChanged =
      JSON.stringify(currentChildren) !== JSON.stringify(newChildren);

    if (hasChanged) {
      return { ...page, children: newChildren };
    }
    return null;
  }

  // Case 2: Page has children that may need microservice updates
  if (page.children && page.children.length > 0) {
    let hasChanges = false;
    const updatedChildren = page.children.map((child) => {
      const updated = updateChildMicroservices(child, allMicroservices);
      if (updated) {
        hasChanges = true;
        return updated;
      }
      // Return new reference for immutability
      return { ...child };
    });

    if (hasChanges) {
      return { ...page, children: updatedChildren };
    }

    // Even if no changes, ensure new array reference for immutability
    return { ...page, children: [...updatedChildren] };
  }

  return null;
};

/**
 * Updates microservices for all pages in a section.
 * Creates a deep clone of the section to avoid mutations.
 *
 * @param section - The navigation section to update
 * @param allMicroservices - All available microservices
 * @returns Updated section or null if no changes
 */
const updateSectionMicroservices = (
  section: NavigationSection,
  allMicroservices: NavigationPageStoreItem[]
): NavigationSection | null => {
  // Deep clone the section to avoid mutation issues
  const clonedSection: NavigationSection = {
    ...section,
    pages: Object.keys(section.pages).reduce((acc, pageKey) => {
      const page = section.pages[pageKey];
      // Deep clone page with nested children structure
      acc[pageKey] = {
        ...page,
        children: page.children?.map((child) => ({
          ...child,
          children: child.children ? [...child.children] : undefined,
        })),
      };
      return acc;
    }, {} as Record<string, NavigationPageStoreItem>),
  };

  let hasChanges = false;

  // Update each page in the section
  Object.keys(clonedSection.pages).forEach((pageKey) => {
    const page = clonedSection.pages[pageKey];
    const updated = updatePageMicroservices(page, allMicroservices);

    if (updated) {
      clonedSection.pages[pageKey] = updated;
      hasChanges = true;
    }
  });

  return hasChanges ? clonedSection : null;
};

/**
 * Updates microservice navigation for all sections.
 * Orchestrates the update process across all sections and recalculates navigation.
 *
 * @param state - The current navigation store state
 * @returns Updated state with sections and navigation, or null if no changes
 */
export const updateMicroserviceNavigationForSections = (
  state: ViewStore
): Partial<ViewStore> | null => {
  try {
    const allMicroservices = getAllMicroservices(state);

    if (allMicroservices.length === 0) {
      return null; // No microservices to add
    }

    const newSections = { ...state.sections };
    let hasChanges = false;

    // Update each section
    Object.keys(newSections).forEach((sectionKey) => {
      const section = newSections[sectionKey];
      const updated = updateSectionMicroservices(section, allMicroservices);

      if (updated) {
        newSections[sectionKey] = updated;
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      return null;
    }

    // Calculate navigation from the updated sections
    const updatedNavigation = calculateNavigationFromSections(
      newSections,
      state.sectionOrder,
      state.visibleSections
    );

    return {
      sections: newSections,
      navigation: updatedNavigation,
    };
  } catch (error) {
    console.error(
      "[updateMicroserviceNavigationForSections] Error:",
      error
    );
    throw error;
  }
};

