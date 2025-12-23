/** @format */

import { registerDialog } from '@mui-toolpad-extended-tuni/main';
import CourseSettings from './Forms/CourseSettings/CourseSettings';

// Register CourseSettings dialog when package is imported
registerDialog('CourseSettings', CourseSettings);

export { default as CourseMicroservice } from './CourseMicroservice';
export { useCourseMicroserviceRegistration } from './context/CourseMicroserviceContext';
export { default as useCourseStore } from './store/useCourseStore';
export type { 
  Course, 
  CourseRaw, 
  courseRole, 
  courseLevel, 
  courseEventType, 
  enrollmentStatus,
  courseEventFrequency,
  courseRelationType,
  legalBasis,
  visibilityMode
} from './store/useCourseStore';

// Export course filtering utilities
export { groupCoursesByEnrollment, filterUniqueCourses } from './utils/courseFilters';
export type { CourseGroups } from './utils/courseFilters';

// Export visited courses hooks
export { addVisitedCourse, getVisitedCourses, onVisitedCoursesUpdate } from './hooks/useVisitedCourses';

// Export CourseSettings component for dialogs
export { default as CourseSettings } from './Forms/CourseSettings/CourseSettings';

// Export API configuration types
export type { CoursesApiEndpoints } from '@mui-toolpad-extended-tuni/core';

// Export CourseMicroserviceProps type
export type { CourseMicroserviceProps } from './CourseMicroservice';

// Export API configuration hooks
export { useCoursesApiConfig } from './hooks/useCoursesApiConfig';

// Export network functions
export {
  getCourses,
  getCourseById,
  getCourseByUrl,
  addCourse,
  updateCourse,
  deleteCourse,
} from './network/courses';

