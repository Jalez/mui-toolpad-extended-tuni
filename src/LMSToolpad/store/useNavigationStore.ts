/** @format */

import { SvgIconComponent } from '@mui/icons-material';
import { create } from 'zustand';
import HelpIcon from '@mui/icons-material/Help';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SchoolIcon from '@mui/icons-material/School';
import { Course } from './useCourseStore';
import { slugify } from '../utils/slugify';
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
    // metadata: {
    //   description: "Get help and documentation",
    //   forRoles: ["student", "teacher", "guest"],
    //   isRootTool: true
    // }
  },
  {
    segment: 'contact',
    title: 'Contact',
    iconFC: ContactPageIcon,
    kind: 'page',
  },
];

type ViewStore = {
  navigation: NavigationStoreItem[];
  baseSections: Record<string, NavigationStoreItem>;
  sections: Record<string, NavigationPageStoreItem>; // Changed to nested structure
  setNavigation: (navigation: NavigationStoreItem[]) => void;
  updateSection: (
    course: Course,
    sectionId: string,
    items: NavigationPageStoreItem[]
  ) => void;
};

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
  updateSection: (course, sectionId, items) =>
    set((state) => {
      console.log('Updating section: ', course, sectionId, items);
      const slugifiedCourseTitle = slugify(course.title);
      const existingSection = state.sections[slugifiedCourseTitle];

      const courseSections: NavigationPageStoreItem =
        existingSection ||
        ({
          kind: 'page',
          segment: slugifiedCourseTitle,
          title: course.title,
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
        [slugifiedCourseTitle]: courseSections,
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
