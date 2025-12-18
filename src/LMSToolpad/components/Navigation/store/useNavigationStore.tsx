/** @format */

import { createWithEqualityFn } from "zustand/traditional";
import {
  NavigationStoreItem,
  NavigationPageStoreItem,
  ViewStore,
} from "./types";
import { calculateNavigationFromSections } from "./navigationCalculator";
import { updateMicroserviceNavigationForSections } from "./sectionManager";

const DEFAULTNAVIGATION: NavigationStoreItem[] = [];

/**
 * Navigation management store with enhanced section management and filtering capabilities.
 *
 * @version 3.1.0
 * @updates
 * - Complete rewrite of navigation structure using sections
 * - Added section-based visibility filtering
 * - Enhanced microservice integration with automatic updates
 * - Added support for dividers in navigation
 * - Introduced flexible section management with ordered headers
 * - Added action components support in navigation items
 * - Clear separation: app-level navigation only (course microservices handled separately)
 * - Refactored: Extracted types, utilities, and complex logic into separate modules
 *
 * @breaking-changes
 * - Removed updateSection and updateCourseInstanceSection methods
 * - Changed addSection API to use header-based organization
 * - Sections are now managed through a structured record instead of flat array
 * - Navigation items require explicit header assignment
 * - Changed microservice update mechanism to be section-aware
 *
 * @scope
 * This store handles navigation for the application:
 * - Global sections (Help, Contact, etc.)
 * - App-level microservices registered via NavigationRegistry
 * - External microservices provided via setExternalMicroservices (e.g., from CourseMicroservice)
 *
 * @structure
 * Navigation is now organized into sections:
 * - Each section has a header, pages, and maintained order
 * - Pages can have nested children (for instances or microservices)
 * - Sections can be individually shown/hidden through visibleSections
 *
 * @example
 * ```typescript
 * useNavigationStore.getState().addSection({
 *   underHeader: "Courses",
 *   pages: [{
 *     segment: "course-1",
 *     title: "Course 1",
 *     description: "Example course",
 *     microservices: ["attendance", "grades"]
 *   }]
 * });
 * ```
 */
export const useNavigationStore = createWithEqualityFn<ViewStore>((set, get) => ({
  navigation: DEFAULTNAVIGATION,
  sections: {},
  sectionOrder: [],
  allMicroserviceNavigation: [],
  externalMicroservices: [],
  visibleSections: {},
  collapsedSections: {},

  setVisibleSections: (options: Record<string, boolean>) => {
    set({ visibleSections: options });
    // Trigger recalculation after visible sections are updated
    get().recalculateNavigation();
  },

  setCollapsedSections: (options: Record<string, boolean>) => {
    set({ collapsedSections: options });
  },

  toggleSectionCollapse: (sectionKey: string) => {
    set((state) => ({
      collapsedSections: {
        ...state.collapsedSections,
        [sectionKey]: !state.collapsedSections[sectionKey],
      },
    }));
  },

  addSection: ({ underHeader, pages, keepVisible }) =>
    set((state) => {
      const sectionKey = underHeader;
      const newSections = { ...state.sections };
      const newVisibleSections = { ...state.visibleSections };

      // Set visibleSections if keepVisible is true
      if (keepVisible) {
        newVisibleSections[sectionKey] = true;
      } else if (!(sectionKey in newVisibleSections)) {
        // If not explicitly set, default to false (not visible)
        newVisibleSections[sectionKey] = false;
      }

      // Create section if it doesn't exist
      if (!newSections[sectionKey]) {
        newSections[sectionKey] = {
          header: { kind: "header", title: underHeader },
          pages: {},
          pageOrder: [],
        };
      }

      // Add/update pages in the section
      pages.forEach((pageConfig) => {
        const {
          segment,
          title,
          Icon,
          description,
          instances,
          microservices,
          actionFC,
        } = pageConfig;

        const pageChildren = instances?.map((instance) => ({
          kind: "page" as const,
          segment: instance,
          title: instance,
          metadata: {
            description,
            forRoles: ["student", "teacher"],
            microservices: microservices,
          },
          children: [],
        }));

        const newPage: NavigationPageStoreItem = {
          kind: "page" as const,
          segment,
          title,
          iconFC: Icon,
          actionFC,
          metadata: {
            description,
            forRoles: ["student", "teacher"],
            isRootTool: true,
            underHeader,
            microservices: instances ? undefined : microservices,
          },
          ...(pageChildren && pageChildren.length > 0
            ? { children: pageChildren }
            : {}),
        };

        newSections[sectionKey].pages[segment] = newPage;
        if (!newSections[sectionKey].pageOrder.includes(segment)) {
          newSections[sectionKey].pageOrder.push(segment);
        }
      });

      const newSectionOrder = state.sections[sectionKey]
        ? state.sectionOrder
        : [...state.sectionOrder, sectionKey];

      return {
        sections: newSections,
        sectionOrder: newSectionOrder,
        visibleSections: newVisibleSections,
      };
    }),

  recalculateNavigation: () => {
    const state = get();
    const sectionNavigation = calculateNavigationFromSections(
      state.sections,
      state.sectionOrder,
      state.visibleSections
    );

    if (
      JSON.stringify(state.navigation) !== JSON.stringify(sectionNavigation)
    ) {
      set({ navigation: sectionNavigation });
    }
  },

  /**
   * Add an app-level microservice navigation item.
   * Note: Course microservices should be registered via CourseMicroservice component context.
   */
  addMicroserviceNavigation: (item) =>
    set((state) => {
      const exists = state.allMicroserviceNavigation.find(
        (ms) => ms.segment === item.segment
      );
      if (!exists) {
        return {
          allMicroserviceNavigation: [
            ...state.allMicroserviceNavigation,
            item,
          ],
        };
      }
      return state;
    }),

  updateMicroserviceNavigationForSections: () => {
    const state = get();
    const result = updateMicroserviceNavigationForSections(state);
    if (result) {
      set(result);
    }
  },

  addStandaloneNavigation: (item) =>
    set((state) => {
      let newNavigation = [...state.navigation];
      const exists = newNavigation.find(
        (nav) => nav.kind === "page" && nav.segment === item.segment
      );

      if (!exists) {
        // Find the first divider or header after default navigation
        const insertIndex = newNavigation.findIndex(
          (nav) => nav.kind === "divider" || nav.kind === "header"
        );

        if (insertIndex !== -1) {
          // Insert before the first divider or header
          newNavigation.splice(insertIndex, 0, item);
        } else {
          // If no divider/header found, append to the end
          newNavigation.push(item);
        }

        return { navigation: newNavigation };
      }
      return state;
    }),

  removeHeader: (header) =>
    set((state) => {
      const newSections = { ...state.sections };
      if (newSections[header]) {
        delete newSections[header];
      }
      const newSectionOrder = state.sectionOrder.filter(
        (key) => key !== header
      );
      return { sections: newSections, sectionOrder: newSectionOrder };
    }),

  setExternalMicroservices: (microservices) => {
    set({ externalMicroservices: microservices });
    // Trigger navigation update when external microservices change
    get().updateMicroserviceNavigationForSections();
  },
}));

// Function to filter navigation items based on user role
export const filterNavigationByRole = (
  role: string
): NavigationStoreItem[] => {
  const roleBasedNavigation: Record<string, NavigationStoreItem[]> = {
    teacher: [],
    student: [],
    guest: [],
  };

  return roleBasedNavigation[role] || [];
};

// Re-export types for backward compatibility
export type {
  NavigationItemBase,
  ToolMetadata,
  NavigationHeaderItem,
  NavigationDividerItem,
  NavigationPageStoreItem,
  NavigationStoreItem,
  addSectionProps,
  NavigationSection,
} from "./types";
