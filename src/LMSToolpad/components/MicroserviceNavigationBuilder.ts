/** @format */

import { NavigationPageStoreItem } from '../store/useNavigationStore';

export type BuildMicroServiceNavigationProps = {
  segment: string;
  title: string;
  description: string;
  icon: any;
  forRoles: string[];
  children?: NavigationPageStoreItem[];
};

/**
 * Builds a navigation structure for a microservice that can be integrated into the LMS navigation system.
 *
 * @param {BuildMicroServiceNavigation} options - Configuration options for the microservice navigation
 * @param {string} options.segment - URL segment for the microservice (e.g., 'edutest')
 * @param {string} options.title - Display title of the microservice
 * @param {string} options.description - Description of the microservice's purpose
 * @param {any} options.icon - MUI icon component to be used for the navigation item
 * @param {string[]} options.forRoles - Array of role names that can access this microservice
 * @param {NavigationPageStoreItem[]} [options.children] - Optional sub-navigation items
 *
 * @returns {NavigationPageStoreItem[]} Array containing the navigation structure
 *
 * @example
 * ```typescript
 * import ScienceIcon from '@mui/icons-material/Science';
 *
 * const eduTestNavigation = buildMicroServiceNavigation({
 *   segment: 'edutest',
 *   title: 'EduTest',
 *   description: 'Testing system for education',
 *   icon: ScienceIcon,
 *   forRoles: ['teacher', 'student'],
 *   children: [
 *     {
 *       kind: 'page',
 *       segment: 'assignments',
 *       title: 'Assignments',
 *       // ... other properties
 *     }
 *   ]
 * });
 * ```
 */
export const buildMicroServiceNavigation = ({
  segment,
  title,
  description,
  icon,
  forRoles,
  children,
}: BuildMicroServiceNavigationProps) => {
  console.log('Building EduTest Navigation');
  // const discussionHeader = { kind: "header", title: "Discussion" } as NavigationStoreItem;
  const eduTestSegment: NavigationPageStoreItem = {
    kind: 'page',
    segment: segment,
    title: title,
    iconFC: icon,
    metadata: {
      description: description,
      forRoles: forRoles,
      isRootTool: true,
    },
    children: children,
  };

  return [eduTestSegment];
};
