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
  keepVisible?: boolean;
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
/**
 * Helper function to calculate navigation structure from sections.
 * This is extracted to be reusable from both updateMicroserviceNavigationForSections and recalculateNavigation.
 */
const calculateNavigationFromSections = (
  sections: Record<string, NavigationSection>,
  sectionOrder: string[],
  visibleSections: Record<string, boolean>
): NavigationStoreItem[] => {
  let sectionNavigation: NavigationStoreItem[] = [];

  console.log("[calculateNavigationFromSections] Starting. sectionOrder:", sectionOrder, "visibleSections:", visibleSections);
  
  // Verify state after update - check if children are present
  const sectionsWithChildren = Object.entries(sections).map(([key, section]) => ({
    sectionKey: key,
    pages: Object.entries(section.pages).map(([pageKey, page]) => ({
      pageKey,
      segment: page.segment,
      childrenCount: page.children?.length || 0,
      firstChild: page.children?.[0] ? {
        segment: page.children[0].segment,
        childrenCount: page.children[0].children?.length || 0,
        microservices: page.children[0].metadata?.microservices
      } : null
    }))
  }));
  console.log("[calculateNavigationFromSections] State verification - sections with children:", 
    sectionsWithChildren.filter(s => s.pages.some(p => p.childrenCount > 0))
      .map(s => ({
        section: s.sectionKey,
        pages: s.pages.filter(p => p.childrenCount > 0)
      }))
  );

  // Build FULL navigation structure for route matching and breadcrumbs
  // Sidebar collapse is a UI concern handled by the sidebar component
  sectionOrder.forEach((sectionKey) => {
    if (!visibleSections[sectionKey]) {
      console.log(`[calculateNavigationFromSections] Skipping section ${sectionKey} - not visible`);
      return;
    }

    const section = sections[sectionKey];
    if (section) {
      if (sectionNavigation.length > 0) {
        sectionNavigation.push({ kind: "divider" });
      }

      // Always include full section structure for proper route matching
      sectionNavigation.push(section.header);
      section.pageOrder.forEach((pageKey) => {
        const page = section.pages[pageKey];
        // Log the first page's structure
        if (pageKey === section.pageOrder[0]) {
          console.log(`[calculateNavigationFromSections] Section ${sectionKey} first page:`, {
            segment: page.segment,
            childrenCount: page.children?.length,
            firstChildChildren: page.children?.[0]?.children?.length,
            firstChildSegment: page.children?.[0]?.segment
          });
        }
        sectionNavigation.push(page);
      });
    }
  });

  if (DEFAULTNAVIGATION.length > 0) {
    if (sectionNavigation.length > 0) {
      sectionNavigation.push({ kind: "divider" });
    }
    sectionNavigation = [...sectionNavigation, ...DEFAULTNAVIGATION];
  }

  // Log navigation structure for debugging - find pages with grandchildren (microservices)
  const pagesWithGrandchildren = sectionNavigation.filter(
    (item): item is NavigationPageStoreItem => 
      item.kind === "page" && 
      !!(item.children && item.children.some(c => c.children && c.children.length > 0))
  );
  
  if (pagesWithGrandchildren.length > 0) {
    console.log("[calculateNavigationFromSections] Pages with grandchildren (microservices):", 
      pagesWithGrandchildren.slice(0, 2).map(p => ({
        segment: p.segment,
        children: p.children?.map(c => ({
          segment: c.segment,
          grandchildren: c.children?.map(gc => gc.segment)
        }))
      }))
    );
  } else {
    // Check what we DO have
    const pagesWithChildren = sectionNavigation.filter(
      (item): item is NavigationPageStoreItem => 
        item.kind === "page" && !!(item.children && item.children.length > 0)
    );
    console.log("[calculateNavigationFromSections] No pages with grandchildren. Pages with children:", 
      pagesWithChildren.slice(0, 2).map(p => ({
        segment: p.segment,
        childrenCount: p.children?.length,
        firstChildHasGrandchildren: p.children?.[0]?.children?.length || 0
      }))
    );
  }

  return sectionNavigation;
};

const getAllMicroservices = (state: ViewStore): NavigationPageStoreItem[] => {
  const sources: NavigationPageStoreItem[][] = [
    state.allMicroserviceNavigation, // App-level
  ];

  console.log("[getAllMicroservices] App-level microservices:", state.allMicroserviceNavigation.length);

  // Add course microservices if course navigation store exists
  if (useCourseNavigationStore) {
    try {
      const courseStore = useCourseNavigationStore.getState();
      console.log("[getAllMicroservices] Course store state:", courseStore);
      console.log("[getAllMicroservices] Course microservices from store:", courseStore?.allCourseMicroserviceNavigation?.length, courseStore?.allCourseMicroserviceNavigation?.map(m => m.segment));
      if (courseStore?.allCourseMicroserviceNavigation) {
        sources.push(courseStore.allCourseMicroserviceNavigation);
      }
    } catch (e) {
      console.error("[getAllMicroservices] Error accessing course store:", e);
      // Course store not available - continue without it
    }
  }

  const result = sources.flat();
  console.log("[getAllMicroservices] Total microservices:", result.length, result.map(m => m.segment));
  return result;
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

      console.log(`[addSection] Adding section: ${sectionKey} with ${pages.length} pages, keepVisible=${keepVisible}`);

      // Set visibleSections if keepVisible is true (but not for "Last 5 visited courses" by default)
      if (keepVisible) {
        newVisibleSections[sectionKey] = true;
        console.log(`[addSection] Setting ${sectionKey} to visible (keepVisible=true)`);
      } else if (!(sectionKey in newVisibleSections)) {
        // If not explicitly set, default to false (not visible)
        newVisibleSections[sectionKey] = false;
        console.log(`[addSection] Setting ${sectionKey} to not visible by default`);
      }

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

        console.log(`[addSection] Page ${segment}: instances=${instances?.join(',')}, microservices=${microservices?.join(',')}`);

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

        console.log(`[addSection] Page ${segment} children (instances):`, pageChildren?.map(c => ({
          segment: c.segment,
          microservices: c.metadata?.microservices
        })));

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

      const updatedState = {
        sections: newSections,
        sectionOrder: newSectionOrder,
        visibleSections: newVisibleSections,
      };

      // If this section is visible and we have course microservices, 
      // trigger microservice navigation update immediately
      // This ensures microservices are added right away
      if (newVisibleSections[sectionKey]) {
        // Check if there are course microservices available
        try {
          const courseStore = useCourseNavigationStore?.getState();
          if (courseStore?.allCourseMicroserviceNavigation?.length > 0) {
            // We'll update microservices in a separate call to avoid circular dependencies
            // The Microservices.tsx subscription will handle this
            console.log(`[addSection] Section ${sectionKey} is visible and course microservices exist, will be updated by subscription`);
          }
        } catch (e) {
          // Course store not available - ignore
        }
      }

      return updatedState;
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
      console.log("[recalculateNavigation] Navigation changed, updating state. Total items:", sectionNavigation.length);
      set({ navigation: sectionNavigation });
    } else {
      console.log("[recalculateNavigation] No navigation changes");
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
          // Get current visibleSections - use the state's visibleSections
          // If visibleSections is empty but we have sections, this means no sections are marked as visible
          // In that case, we should still calculate navigation but it will be empty (all sections skipped)
          const effectiveVisibleSections = { ...state.visibleSections };
          
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
            // Need to deep clone pages and their nested children structure
            const originalSection = newSections[sectionKey];
            let currentSection = {
              ...originalSection,
              pages: Object.keys(originalSection.pages).reduce((acc, pageKey) => {
                const page = originalSection.pages[pageKey];
                // Deep clone page with nested children structure
                acc[pageKey] = {
                  ...page,
                  children: page.children?.map(child => ({
                    ...child,
                    children: child.children ? [...child.children] : undefined
                  }))
                };
                return acc;
              }, {} as Record<string, NavigationPageStoreItem>),
            };
            let sectionHasChanges = false;
            
            console.log(`[updateMicroserviceNavigationForSections] Processing section: ${sectionKey}, pages:`, Object.keys(currentSection.pages));
            
            Object.keys(currentSection.pages).forEach((pageKey) => {
              const page = currentSection.pages[pageKey];
              
              console.log(`[updateMicroserviceNavigationForSections] Page ${pageKey}: metadata.microservices=${page.metadata?.microservices}, children=${page.children?.length || 0}`);
              
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
                
                console.log(`[updateMicroserviceNavigationForSections] Page ${pageKey} direct microservices: msItems=`, msItems.map(m => m.segment));
                
                if (JSON.stringify(page.children) !== JSON.stringify(newChildren)) {
                  currentSection.pages[pageKey] = { ...page, children: newChildren };
                  sectionHasChanges = true;
                  hasChanges = true;
                }
              } else if (page.children && page.children.length > 0) {
                // Process children - must create new objects for immutable update
                let pageHasChanges = false;
                
                console.log(`[updateMicroserviceNavigationForSections] Page ${pageKey} has children (instances):`, (page.children || []).map(c => ({
                  segment: c.segment,
                  microservices: c.metadata?.microservices
                })));
                
                // Ensure we always have an array to map over
                const updatedChildren = (page.children || []).map((child) => {
                  if (child.metadata?.microservices) {
                    console.log(`[updateMicroserviceNavigationForSections] Child ${child.segment} expects microservices:`, child.metadata.microservices);
                    
                    const originalSubChildren =
                      (child.children || []).filter(
                        (subChild) =>
                          !allMicroservices.some((ms) => ms.segment === subChild.segment)
                      );
                    const msItems = allMicroservices.filter((ms) =>
                      child.metadata!.microservices!.includes(ms.segment)
                    );
                    
                    console.log(`[updateMicroserviceNavigationForSections] Child ${child.segment} matched microservices:`, msItems.map(m => m.segment));
                    
                    const newSubChildren = [...originalSubChildren, ...msItems];
                    
                    // Compare lengths and segments to avoid expensive JSON.stringify
                    const currentChildren = child.children || [];
                    const hasChanged = 
                      currentChildren.length !== newSubChildren.length ||
                      !currentChildren.every((c, i) => c.segment === newSubChildren[i]?.segment);
                    
                    if (hasChanged) {
                      console.log(`[updateMicroserviceNavigationForSections] Child ${child.segment} children CHANGED:`, currentChildren.length, '->', newSubChildren.length);
                      pageHasChanges = true;
                      // Create new child object with new children array
                      return { ...child, children: newSubChildren };
                    } else {
                      console.log(`[updateMicroserviceNavigationForSections] Child ${child.segment} children unchanged`);
                      // Still return a new object reference to ensure immutability
                      return { ...child };
                    }
                  }
                  // Return new object reference even if no changes
                  return { ...child };
                });
                
                if (pageHasChanges) {
                  // Create new page object with new children array
                  currentSection.pages[pageKey] = { ...page, children: updatedChildren };
                  sectionHasChanges = true;
                  hasChanges = true;
                } else if (page.children) {
                  // Even if no changes, ensure we have a new array reference for immutability
                  currentSection.pages[pageKey] = { ...page, children: [...updatedChildren] };
                }
              }
            });
            
            if (sectionHasChanges) {
              newSections[sectionKey] = currentSection;
            }
          });
          
          console.log("[updateMicroserviceNavigationForSections] Done, hasChanges:", hasChanges);
          if (hasChanges) {
            // Verify the updated sections before returning
            const sectionsWithUpdates = Object.entries(newSections).map(([key, section]) => ({
              sectionKey: key,
              pages: Object.entries(section.pages).map(([pageKey, page]) => ({
                pageKey,
                segment: page.segment,
                childrenCount: page.children?.length || 0,
                firstChild: page.children?.[0] ? {
                  segment: page.children[0].segment,
                  childrenCount: page.children[0].children?.length || 0,
                  microservices: page.children[0].metadata?.microservices
                } : null
              }))
            }));
            console.log("[updateMicroserviceNavigationForSections] State after update - sections with children:", 
              sectionsWithUpdates.filter(s => s.pages.some(p => (p.firstChild?.childrenCount ?? 0) > 0))
                .map(s => ({
                  section: s.sectionKey,
                  pages: s.pages.filter(p => p.firstChild && (p.firstChild.childrenCount ?? 0) > 0)
                }))
            );
            
            // Calculate navigation from the updated sections immediately (within the same set() callback)
            // Use effectiveVisibleSections to ensure we use the updated state, not stale state
            const updatedNavigation = calculateNavigationFromSections(
              newSections,
              state.sectionOrder,
              effectiveVisibleSections
            );
            
            console.log("[updateMicroserviceNavigationForSections] Calculated navigation with", updatedNavigation.length, "items");
            
            // Return both updated sections and navigation in the same state update
            return { 
              sections: newSections,
              navigation: updatedNavigation
            };
          }
          return state;
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
// Note: Currently unused but kept for potential future use
// @ts-expect-error - Intentionally unused, kept for future use
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
