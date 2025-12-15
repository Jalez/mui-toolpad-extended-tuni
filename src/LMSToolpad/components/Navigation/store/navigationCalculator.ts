/** @format */

import {
  NavigationStoreItem,
  NavigationSection,
} from "./types";

const DEFAULTNAVIGATION: NavigationStoreItem[] = [];

/**
 * Calculates the navigation structure from sections.
 * Pure function that takes sections, order, and visibility and returns a flat navigation array.
 *
 * @param sections - Record of navigation sections keyed by section key
 * @param sectionOrder - Array of section keys in display order
 * @param visibleSections - Record of section visibility flags
 * @returns Flat array of navigation items for rendering
 */
export const calculateNavigationFromSections = (
  sections: Record<string, NavigationSection>,
  sectionOrder: string[],
  visibleSections: Record<string, boolean>
): NavigationStoreItem[] => {
  let sectionNavigation: NavigationStoreItem[] = [];

  // Build navigation structure from visible sections
  sectionOrder.forEach((sectionKey) => {
    if (!visibleSections[sectionKey]) {
      return;
    }

    const section = sections[sectionKey];
    if (section) {
      // Add divider before section (except for first section)
      if (sectionNavigation.length > 0) {
        sectionNavigation.push({ kind: "divider" });
      }

      // Add section header
      sectionNavigation.push(section.header);

      // Add all pages in the section
      section.pageOrder.forEach((pageKey) => {
        const page = section.pages[pageKey];
        sectionNavigation.push(page);
      });
    }
  });

  // Append default navigation items if any
  if (DEFAULTNAVIGATION.length > 0) {
    if (sectionNavigation.length > 0) {
      sectionNavigation.push({ kind: "divider" });
    }
    sectionNavigation = [...sectionNavigation, ...DEFAULTNAVIGATION];
  }

  return sectionNavigation;
};
