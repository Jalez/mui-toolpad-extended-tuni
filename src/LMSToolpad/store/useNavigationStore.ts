/** @format */

import { SvgIconComponent } from '@mui/icons-material';
import { create } from 'zustand';
import HelpIcon from '@mui/icons-material/Help';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SchoolIcon from '@mui/icons-material/School';
import { Course } from './useCourseStore';
// Base interface for common properties
interface NavigationItemBase {
  kind: 'header' | 'page';
  title: string;
  actionFC?: React.FC;
}

export interface ToolMetadata {
  description?: string;
  forRoles?: string[];
  isRootTool?: boolean; // Indicates if this is a main tool that should appear in tool selector
}

export interface NavigationHeaderItem extends NavigationItemBase {
  kind: 'header';
}

export interface NavigationPageStoreItem extends NavigationItemBase {
  kind: 'page';
  segment: string;
  iconFC?: SvgIconComponent; // Updated type to SvgIconComponent
  icon?: JSX.Element;
  children?: NavigationPageStoreItem[]; // Can only contain page items
  action?: JSX.Element;
  metadata?: ToolMetadata; // Added tool metadata
}

export type NavigationStoreItem =
  | NavigationHeaderItem
  | NavigationPageStoreItem;

// Update DEFAULTNAVIGATION to use icon components
const DEFAULTNAVIGATION: NavigationStoreItem[] = [
  { kind: 'header', title: 'Other' },
  {
    segment: 'help',
    title: 'Help',
    iconFC: HelpIcon,
    kind: 'page',
  },
  {
    segment: 'contact',
    title: 'Contact',
    iconFC: ContactPageIcon,
    kind: 'page',
  },
];

type addSectionProps = {
  segment: string;
  title: string;
  Icon: SvgIconComponent;
  description: string;
  instances?: string[]; // Add this
};

type ViewStore = {
  navigation: NavigationStoreItem[];
  baseSections: Record<string, NavigationStoreItem>;
  sections: Record<string, NavigationPageStoreItem>; // Changed to nested structure
  setNavigation: (navigation: NavigationStoreItem[]) => void;
  updateSection: (course: Course, items: NavigationPageStoreItem[]) => void;
  addSection: ({
    segment,
    title,
    Icon,
    description,
    instances,
  }: addSectionProps) => void;
  updateCourseInstanceSection: (
    course: Course,
    items: NavigationPageStoreItem[]
  ) => void;
};

/**
 * Navigation management store with enhanced course instance support.
 *
 * @version 2.1.0
 * @updates
 * - Added course instance section management
 * - Enhanced navigation structure for course instances
 * - Added support for instance-specific tools
 * - Improved section management with code-based identification
 *
 * @breaking-changes
 * - Changed section identification from slugified title to course code
 * - Updated navigation structure to support instance hierarchy
 */
export const useNavigationStore = create<ViewStore>((set) => ({
  navigation: DEFAULTNAVIGATION,
  baseSections: {
    header: { kind: 'header', title: 'Other' },
    contact: {
      segment: 'contact',
      title: 'Contact',
      iconFC: ContactPageIcon,
      kind: 'page',
    },
    help: {
      segment: 'help',
      title: 'Help',
      iconFC: HelpIcon,
      kind: 'page',
    },
  },

  sections: {},

  setNavigation: (navigation) => set({ navigation }),
  updateSection: (course, items) =>
    set((state) => {
      const segmentIdentifier = course.code;
      const existingSection = state.sections[segmentIdentifier];

      const courseSections: NavigationPageStoreItem =
        existingSection ||
        ({
          kind: 'page',
          segment: segmentIdentifier,
          title: course.code,
          iconFC: SchoolIcon,
          metadata: {
            description: course.description,
            forRoles: ['student', 'teacher'],
            isRootTool: true,
          },
          children: [] as NavigationPageStoreItem[],
        } as NavigationPageStoreItem);
      courseSections.children = [...items];
      // const newCourseSections = { ...courseSections};
      const newSections = {
        ...state.sections,
        [segmentIdentifier]: courseSections,
      };

      const newNavigation = [];
      for (const section in state.baseSections) {
        newNavigation.push(state.baseSections[section]);
      }
      for (const section in newSections) {
        console.log('Item: ', newSections[section]);
        newNavigation.push(newSections[section]);
      }

      return {
        sections: newSections,
        navigation: newNavigation,
      };
    }),
  addSection: ({ segment, title, Icon, description, instances }) =>
    set((state) => {
      console.log('Adding section:', { segment, title, instances });
      const existingSection = state.sections[segment] || {
        kind: 'page',
        segment: segment,
        title: title,
        iconFC: Icon,
        metadata: {
          description: description,
          forRoles: ['student', 'teacher'],
          isRootTool: true,
        },
        children:
          instances?.map((instance) => ({
            kind: 'page',
            segment: instance,
            title: instance,
            children: [],
          })) || [],
      };

      const newSections = {
        ...state.sections,
        [segment]: existingSection,
      };

      const newNavigation = [
        ...Object.values(state.baseSections),
        ...Object.values(newSections),
      ];

      console.log('New navigation:', newNavigation);

      return {
        sections: newSections,
        navigation: newNavigation,
      };
    }),
  updateCourseInstanceSection: (course, items) =>
    set((state) => {
      const segmentIdentifier = course.code;
      const existingSection = state.sections[segmentIdentifier];

      const courseSections: NavigationPageStoreItem = existingSection || {
        kind: 'page',
        segment: course.code,
        title: course.code.toUpperCase(),
        metadata: {
          description: course.description,
          forRoles: ['student', 'teacher'],
          isRootTool: true,
        },
        children: [],
      };

      const children = courseSections.children || [];
      const otherChildren = children.filter(
        (item) => item.segment !== course.instance
      );

      // Find existing instance section or create new one
      const existingInstance = children.find(
        (item) => item.segment === course.instance
      );
      console.log('Existing instance: ', existingInstance);
      const existingInstanceChildren = existingInstance?.children || [];

      // For each new item, replace existing ones with matching segments or add new
      const updatedInstanceChildren = existingInstanceChildren.slice();
      items.forEach((newItem) => {
        const index = updatedInstanceChildren.findIndex(
          (child) => child.segment === newItem.segment
        );
        if (index !== -1) {
          updatedInstanceChildren[index] = newItem;
        } else {
          updatedInstanceChildren.push(newItem);
        }
      });

      // Create or update the instance section with preserved children
      const instanceSection: NavigationPageStoreItem = {
        kind: 'page',
        segment: course.instance,
        title: course.instance,
        children: updatedInstanceChildren,
      };
      console.log('Instance section: ', instanceSection);

      // Combine other course instance children with the updated instance
      courseSections.children = [...otherChildren, instanceSection];

      const newSections = {
        ...state.sections,
        [course.code]: courseSections,
      };
      console.log('New sections: ', newSections);

      const newNavigation = [];
      for (const section in state.baseSections) {
        newNavigation.push(state.baseSections[section]);
      }

      for (const section in newSections) {
        newNavigation.push(newSections[section]);
      }

      return {
        sections: newSections,
        navigation: newNavigation,
      };
    }),
}));

// Function to filter navigation items based on user role
export const filterNavigationByRole = (role: string): NavigationStoreItem[] => {
  const roleBasedNavigation: Record<string, NavigationStoreItem[]> = {
    teacher: DEFAULTNAVIGATION,
    student: DEFAULTNAVIGATION.filter(
      (item) =>
        item.kind !== 'header' || item.title !== 'Exercise Session manager'
    ),
    guest: DEFAULTNAVIGATION.filter(
      (item) => item.kind !== 'header' || item.title !== 'Exercise statistics'
    ),
  };

  return roleBasedNavigation[role] || [];
};
