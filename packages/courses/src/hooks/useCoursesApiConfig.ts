/** @format */

import { useServiceApiConfig } from '@mui-toolpad-extended-tuni/core';
import type { CoursesApiEndpoints } from '@mui-toolpad-extended-tuni/core';

/**
 * Hook to access courses API configuration.
 * Returns the courses endpoint configuration merged with defaults.
 * 
 * @returns Courses API endpoints configuration, or undefined if not registered
 * @throws Error if used outside of ApiConfigProvider
 * 
 * @example
 * ```tsx
 * const coursesConfig = useCoursesApiConfig();
 * const endpoint = coursesConfig?.get; // "api/courses/" or custom value
 * ```
 */
export const useCoursesApiConfig = (): CoursesApiEndpoints | undefined => {
  return useServiceApiConfig('courses') as CoursesApiEndpoints | undefined;
};
