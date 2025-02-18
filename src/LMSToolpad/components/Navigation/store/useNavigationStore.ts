/** @format */

import { SvgIconComponent } from "@mui/icons-material";
import { create } from "zustand";
import HelpIcon from "@mui/icons-material/Help";
import ContactPageIcon from "@mui/icons-material/ContactPage";

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
  icon?: JSX.Element;
  children?: NavigationPageStoreItem[];
  view?: React.ComponentType;
  action?: JSX.Element;
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
 *
 * @breaking-changes
 * - Removed updateSection and updateCourseInstanceSection methods
 * - Changed addSection API to use header-based organization
 * - Sections are now managed through a structured record instead of flat array
 * - Navigation items require explicit header assignment
 * - Changed microservice update mechanism to be section-aware
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
export const useNavigationStore = create<ViewStore>((set, get) => ({
  navigation: DEFAULTNAVIGATION,
  sections: {},
  sectionOrder: [],
  allMicroserviceNavigation: [],
  // Initialize visibleSections as an empty object; it will be set by the filter component.
  visibleSections: {},

  setVisibleSections: (options: Record<string, boolean>) => {
    set({ visibleSections: options });
  },

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

  /**
   * Recalculate the flat navigation array from the segmented sections.
   * Only includes sections whose visibleSections flag is true.
   */
  recalculateNavigation: () => {
    const state = get();
    const { visibleSections } = state;
    // Compute the navigation built from sections
    let sectionNavigation: NavigationStoreItem[] = [];
    state.sectionOrder.forEach((sectionKey) => {
      // Only include sections that are visible; treat undefined as not visible.
      if (!visibleSections[sectionKey]) return;
      const section = state.sections[sectionKey];
      if (section) {
        if (sectionNavigation.length > 0) {
          sectionNavigation.push({ kind: "divider" });
        }
        sectionNavigation.push(section.header);
        section.pageOrder.forEach((pageKey) => {
          sectionNavigation.push(section.pages[pageKey]);
        });
      }
    });
    // Start with the default navigation items
    let newNavigation: NavigationStoreItem[] = [...DEFAULTNAVIGATION];
    // Optionally add a divider before appending section navigation
    if (sectionNavigation.length > 0) {
      newNavigation.push({ kind: "divider" }, ...sectionNavigation);
    }
    if (JSON.stringify(state.navigation) !== JSON.stringify(newNavigation)) {
      set({ navigation: newNavigation });
    }
  },

  /**
   * Add a new section or add pages to an existing section.
   * If the section does not exist, it is created.
   */
  addSection: ({ underHeader, pages }) =>
    set((state) => {
      const sectionKey = underHeader;
      const newSections = { ...state.sections };

      // Check if section exists and has the exact same pages
      if (newSections[sectionKey]) {
        const currentPages = Object.values(newSections[sectionKey].pages);
        const haveSamePages = pages.every(newPage => 
          currentPages.some(existingPage => 
            existingPage.segment === newPage.segment && 
            existingPage.title === newPage.title
          )
        );
        if (haveSamePages) {
          return state; // Return existing state if no changes needed
        }
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

        // Only update if the page doesn't exist or has changed
        const existingPage = newSections[sectionKey].pages[segment];
        const pageHasChanged = !existingPage || 
          existingPage.title !== title || 
          existingPage.iconFC !== Icon;

        if (pageHasChanged) {
          const newPage: NavigationPageStoreItem = {
            kind: "page",
            segment,
            title,
            iconFC: Icon,
            actionFC,
            metadata: {
              description,
              forRoles: ["student", "teacher"],
              isRootTool: true,
              underHeader,
              microservices: instances ? undefined : microservices, // Only set microservices if instances is not provided: otherwise it's an instance specific microservice
            },
            children:
              instances?.map((instance) => ({
                kind: "page",
                segment: instance,
                title: instance,
                metadata: {
                  description,
                  forRoles: ["student", "teacher"],
                  microservices: microservices,
                },
                children: [],
              })) || [],
          };
          newSections[sectionKey].pages[segment] = newPage;
          if (!newSections[sectionKey].pageOrder.includes(segment)) {
            newSections[sectionKey].pageOrder.push(segment);
          }
        }
      });

      // If the section is newly created, update the sectionOrder.
      const newSectionOrder = state.sections[sectionKey]
        ? state.sectionOrder
        : [...state.sectionOrder, sectionKey];

      return {
        sections: newSections,
        sectionOrder: newSectionOrder,
      };
    }),

  updateMicroserviceNavigationForSections: () =>
    set((state) => {
      const newSections = { ...state.sections };
      let hasChanges = false;

      Object.keys(newSections).forEach((sectionKey) => {
        const section = newSections[sectionKey];
        Object.keys(section.pages).forEach((pageKey) => {
          const page = section.pages[pageKey];
          if (page.metadata?.microservices) {
            const originalChildren =
              page.children?.filter(
                (child) =>
                  !state.allMicroserviceNavigation.some(
                    (ms) => ms.segment === child.segment
                  )
              ) || [];
            const msItems = state.allMicroserviceNavigation.filter((ms) =>
              page.metadata!.microservices!.includes(ms.segment)
            );
            const newChildren = [...originalChildren, ...msItems];
            if (JSON.stringify(page.children) !== JSON.stringify(newChildren)) {
              section.pages[pageKey] = { ...page, children: newChildren };
              hasChanges = true;
            }
          } else {
            //Repeat the process for children
            page.children?.forEach((child) => {
              if (child.metadata?.microservices) {
                const originalChildren =
                  child.children?.filter(
                    (subChild) =>
                      !state.allMicroserviceNavigation.some(
                        (ms) => ms.segment === subChild.segment
                      )
                  ) || [];
                const msItems = state.allMicroserviceNavigation.filter((ms) =>
                  child.metadata!.microservices!.includes(ms.segment)
                );
                const newChildren = [...originalChildren, ...msItems];
                if (
                  JSON.stringify(child.children) !== JSON.stringify(newChildren)
                ) {
                  child.children = newChildren;
                  hasChanges = true;
                }
              }
            });
          }
        });
      });
      return hasChanges ? { sections: newSections } : state;
    }),

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

// Function to filter navigation items based on user role
export const filterNavigationByRole = (role: string): NavigationStoreItem[] => {
  const roleBasedNavigation: Record<string, NavigationStoreItem[]> = {
    teacher: [],
    student: [],
    guest: [],
  };

  return roleBasedNavigation[role] || [];
};
