/** @format */

import { SvgIconComponent } from "@mui/icons-material";
import { create } from "zustand";
import HelpIcon from "@mui/icons-material/Help";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

// Import course navigation store for aggregating microservices
// This is the only place we reference the course store - the rest is generic
import { useCourseNavigationStore } from "../../Courses/store/useCourseNavigationStore";

// Base interface for common properties
interface NavigationItemBase {
  kind: "header" | "page" | "divider";
  title?: string;
  actionFC?: React.FC;
}

export interface ToolMetadata {
  description?: string;
  forRoles?: string[];
  isRootTool?: boolean;
  underHeader?: string;
  microservices?: string[];
}

export interface NavigationHeaderItem extends NavigationItemBase {
  kind: "header";
  title: string;
}

export interface NavigationDividerItem extends NavigationItemBase {
  kind: "divider";
}

export interface NavigationPageStoreItem extends NavigationItemBase {
  kind: "page";
  segment: string;
  iconFC?: SvgIconComponent;
  icon?: React.ReactElement;
  children?: NavigationPageStoreItem[];
  view?: React.ComponentType;
  action?: React.ReactElement;
  showTitle?: boolean;
  metadata?: ToolMetadata;
}

export type NavigationStoreItem =
  | NavigationHeaderItem
  | NavigationPageStoreItem
  | NavigationDividerItem;

/**
 * Updated addSectionProps type.
 * Now you provide a header (underHeader) and an array of page configs.
 */
export type addSectionProps = {
  underHeader: string;
  pages: Array<{
    segment: string;
    title: string;
    Icon?: SvgIconComponent;
    description?: string;
    instances?: string[];
    microservices?: string[];
    actionFC?: React.FC;
  }>;
};

const DEFAULTNAVIGATION: NavigationStoreItem[] = [
  { kind: "header", title: "Other" },
  {
    kind: "page", // Added kind here
    segment: "help",
    title: "Help",
    iconFC: HelpIcon,
  },
  {
    kind: "page", // Added kind here
    segment: "contact",
    title: "Contact",
    iconFC: ContactPageIcon,
  },
];

/**
 * New interface for a navigation section.
 * Each section is keyed by its header (or unique id) and contains:
 *  - header: the header item (NavigationHeaderItem)
 *  - pages: a dictionary of pages keyed by their segment
 *  - pageOrder: an array of page keys (segments) to preserve ordering
 */
interface NavigationSection {
  header: NavigationHeaderItem;
  pages: Record<string, NavigationPageStoreItem>;
  pageOrder: string[];
}

type ViewStore = {
  // Final flat navigation array (for rendering)
  navigation: NavigationStoreItem[];
  // Segmented store: sections keyed by header string
  sections: Record<string, NavigationSection>;
  // Array maintaining the order of sections
  sectionOrder: string[];
  /**
   * App-level microservice navigation items only.
   * Course microservices are handled by useCourseNavigationStore.
   * These are typically registered via NavigationRegistry for app-level routes.
   */
  allMicroserviceNavigation: NavigationPageStoreItem[];
  addSection: (props: addSectionProps) => void;
  removeHeader: (header: string) => void;
  addMicroserviceNavigation: (
    microserviceNavigation: NavigationPageStoreItem
  ) => void;
  addStandaloneNavigation: (navigation: NavigationPageStoreItem) => void;
  updateMicroserviceNavigationForSections: () => void;
  recalculateNavigation: () => void;
  // New: visibleSections state to track which sections are shown
  visibleSections: Record<string, boolean>;
  // New: setter for visibleSections
  setVisibleSections: (options: Record<string, boolean>) => void;
  // New: collapsedSections state to track which sections are collapsed (show only icon)
  collapsedSections: Record<string, boolean>;
  // New: setter for collapsedSections
  setCollapsedSections: (options: Record<string, boolean>) => void;
  // New: toggle section collapse state
  toggleSectionCollapse: (sectionKey: string) => void;
};

/**
 * Navigation management store with enhanced section management and filtering capabilities.
 *
 * @version 3.0.0
 * @updates
 * - Complete rewrite of navigation structure using sections
 * - Added section-based visibility filtering
 * - Enhanced microservice integration with automatic updates
 * - Added support for dividers in navigation
 * - Introduced flexible section management with ordered headers
 * - Added action components support in navigation items
 * - Clear separation: app-level navigation only (course microservices handled separately)
 *
 * @breaking-changes
 * - Removed updateSection and updateCourseInstanceSection methods
 * - Changed addSection API to use header-based organization
 * - Sections are now managed through a structured record instead of flat array
 * - Navigation items require explicit header assignment
 * - Changed microservice update mechanism to be section-aware
 *
 * @scope
 * This store handles **app-level navigation only**:
 * - Global sections (Help, Contact, etc.)
 * - App-level microservices registered via NavigationRegistry
 * - Course microservices are handled by useCourseNavigationStore (separate store)
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
/**
 * Helper function to aggregate microservices from all available sources.
 * This is microservice-agnostic - it doesn't hard-code specific store types.
 * The only store-specific code is here, allowing the rest of the logic to be generic.
 */
const getAllMicroservices = (state: ViewStore): NavigationPageStoreItem[] => {
  const sources: NavigationPageStoreItem[][] = [
    state.allMicroserviceNavigation, // App-level
  ];

  // Add course microservices if course navigation store exists
  if (useCourseNavigationStore) {
    try {
      const courseStore = useCourseNavigationStore.getState();
      if (courseStore?.allCourseMicroserviceNavigation) {
        sources.push(courseStore.allCourseMicroserviceNavigation);
      }
    } catch {
      // Course store not available - continue without it
    }
  }

  return sources.flat();
};

export const useNavigationStore = create<ViewStore>((set, get) => ({
  navigation: DEFAULTNAVIGATION,
  sections: {},
  sectionOrder: [],
  allMicroserviceNavigation: [],
  visibleSections: {},
  collapsedSections: {},

  setVisibleSections: (options: Record<string, boolean>) => {
    set({ visibleSections: options });
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

  addSection: ({ underHeader, pages }) =>
    set((state) => {
      const sectionKey = underHeader;
      const newSections = { ...state.sections };

      if (!newSections[sectionKey]) {
        newSections[sectionKey] = {
          header: { kind: "header", title: underHeader },
          pages: {},
          pageOrder: [],
        };
      }

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
          ...(pageChildren && pageChildren.length > 0 ? { children: pageChildren } : {}),
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
      };
    }),

  recalculateNavigation: () => {
    const state = get();
    const { visibleSections } = state;
    let sectionNavigation: NavigationStoreItem[] = [];

    // Build FULL navigation structure for route matching and breadcrumbs
    // Sidebar collapse is a UI concern handled by the sidebar component
    state.sectionOrder.forEach((sectionKey) => {
      if (!visibleSections[sectionKey]) return;

      const section = state.sections[sectionKey];
      if (section) {
        if (sectionNavigation.length > 0) {
          sectionNavigation.push({ kind: "divider" });
        }

        // Always include full section structure for proper route matching
        sectionNavigation.push(section.header);
        section.pageOrder.forEach((pageKey) => {
          sectionNavigation.push(section.pages[pageKey]);
        });
      }
    });

    if (DEFAULTNAVIGATION.length > 0) {
      if (sectionNavigation.length > 0) {
        sectionNavigation.push({ kind: "divider" });
      }
      sectionNavigation = [...sectionNavigation, ...DEFAULTNAVIGATION];
    }

    // Log navigation structure for debugging
    const pagesWithChildren = sectionNavigation.filter(
      (item): item is NavigationPageStoreItem => 
        item.kind === "page" && !!(item.children && item.children.length > 0)
    );
    if (pagesWithChildren.length > 0) {
      console.log("[recalculateNavigation] Pages with children:", pagesWithChildren.slice(0, 3).map(p => ({
        segment: p.segment,
        children: p.children?.map(c => ({
          segment: c.segment,
          grandchildren: c.children?.map(gc => gc.segment)
        }))
      })));
    }

    if (
      JSON.stringify(state.navigation) !== JSON.stringify(sectionNavigation)
    ) {
      console.log("[recalculateNavigation] Navigation changed, updating state");
      set({ navigation: sectionNavigation });
    }
  },

  /**
   * Add an app-level microservice navigation item.
   * Note: Course microservices should use useCourseNavigationStore.addCourseMicroserviceNavigation instead.
   */
  addMicroserviceNavigation: (item) =>
    set((state) => {
      const exists = state.allMicroserviceNavigation.find(
        (ms) => ms.segment === item.segment
      );
      if (!exists) {
        return {
          allMicroserviceNavigation: [...state.allMicroserviceNavigation, item],
        };
      }
      return state;
    }),

  updateMicroserviceNavigationForSections: () => {
    try {
      const result = set((state) => {
        try {
          const newSections = { ...state.sections };
          let hasChanges = false;

          // Get all microservices from all available sources (app-level + course-level)
          const allMicroservices = getAllMicroservices(state);
          
          console.log("[updateMicroserviceNavigationForSections] Starting update...");
          console.log("[updateMicroserviceNavigationForSections] All microservices:", allMicroservices.length, allMicroservices.map(m => m.segment));
          console.log("[updateMicroserviceNavigationForSections] Sections:", Object.keys(newSections));
          
          if (allMicroservices.length === 0) {
            console.log("[updateMicroserviceNavigationForSections] No microservices, returning early");
            return state; // No microservices to add
          }

          Object.keys(newSections).forEach((sectionKey) => {
            // Deep clone the section to avoid mutation issues
            let currentSection = {
              ...newSections[sectionKey],
              pages: { ...newSections[sectionKey].pages },
            };
            let sectionHasChanges = false;
            
            Object.keys(currentSection.pages).forEach((pageKey) => {
              const page = currentSection.pages[pageKey];
              
              if (page.metadata?.microservices) {
                // Page directly expects microservices
                const originalChildren =
                  page.children?.filter(
                    (child) =>
                      !allMicroservices.some((ms) => ms.segment === child.segment)
                  ) || [];
                const msItems = allMicroservices.filter((ms) =>
                  page.metadata!.microservices!.includes(ms.segment)
                );
                const newChildren = [...originalChildren, ...msItems];
                
                if (JSON.stringify(page.children) !== JSON.stringify(newChildren)) {
                  currentSection.pages[pageKey] = { ...page, children: newChildren };
                  sectionHasChanges = true;
                  hasChanges = true;
                }
              } else if (page.children && page.children.length > 0) {
                // Process children - must create new objects for immutable update
                let pageHasChanges = false;
                const updatedChildren = page.children.map((child) => {
                  if (child.metadata?.microservices) {
                    const originalSubChildren =
                      child.children?.filter(
                        (subChild) =>
                          !allMicroservices.some((ms) => ms.segment === subChild.segment)
                      ) || [];
                    const msItems = allMicroservices.filter((ms) =>
                      child.metadata!.microservices!.includes(ms.segment)
                    );
                    const newSubChildren = [...originalSubChildren, ...msItems];
                    
                    if (JSON.stringify(child.children) !== JSON.stringify(newSubChildren)) {
                      pageHasChanges = true;
                      return { ...child, children: newSubChildren };
                    }
                  }
                  return child;
                });
                
                if (pageHasChanges) {
                  currentSection.pages[pageKey] = { ...page, children: updatedChildren };
                  sectionHasChanges = true;
                  hasChanges = true;
                }
              }
            });
            
            if (sectionHasChanges) {
              newSections[sectionKey] = currentSection;
            }
          });
          
          console.log("[updateMicroserviceNavigationForSections] Done, hasChanges:", hasChanges);
          return hasChanges ? { sections: newSections } : state;
        } catch (error) {
          console.error(
            "[updateMicroserviceNavigationForSections] Error:",
            error
          );
          return state;
        }
      });
      return result;
    } catch (error) {
      console.error(
        "[updateMicroserviceNavigationForSections] Error:",
        error
      );
      throw error;
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
}));

// Component for section toggle action (defined after store to avoid circular dependency)
const SectionToggleAction: React.FC<{ sectionKey: string }> = ({ sectionKey }) => {
  const handleClick = () => {
    const store = useNavigationStore.getState();
    store.toggleSectionCollapse(sectionKey);
    store.recalculateNavigation();
  };

  return (
    <ExpandMoreIcon
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'rotate(180deg)',
        },
      }}
    />
  );
};

// Function to filter navigation items based on user role
export const filterNavigationByRole = (role: string): NavigationStoreItem[] => {
  const roleBasedNavigation: Record<string, NavigationStoreItem[]> = {
    teacher: [],
    student: [],
    guest: [],
  };

  return roleBasedNavigation[role] || [];
};
