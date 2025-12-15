/** @format */

import React, { ReactNode } from "react";
import { CourseMicroserviceProvider } from "./context/CourseMicroserviceContext";
import CourseRoutesProvider from "./CourseRoutesProvider";
import CourseManager from "./CourseManager";

interface CourseMicroserviceProps {
  children?: ReactNode;
}

/**
 * CourseMicroservice Component
 *
 * @version 3.0.0
 *
 * Fully self-contained microservice that handles all course-related functionality:
 * - Course data fetching and management (via CourseManager)
 * - Course navigation building
 * - Course code and instance routing (/:code, /:code/:instance)
 * - Course tools display
 * - Course microservice registration and routing (/:code/:instance/:microservice)
 * - Route registration with NavigationRegistry (via CourseRoutesProvider)
 *
 * Course microservices (like EduTest) are passed as children and register
 * themselves through the CourseMicroserviceContext.
 *
 * Routes handled:
 * - /:code - Course code selection (CourseCodeLoader + CourseInstanceSelector)
 * - /:code/:instance - Course instance (CourseInstanceLoader + CourseTools)
 * - /:code/:instance/:microservice/* - Course microservice routes
 *
 * @breaking-changes
 * - v3.0.0: Now fully self-contained - includes CourseManager and CourseRoutesProvider
 * - v2.0.0: Uses local state instead of Zustand store
 * - Context provides allCourseMicroserviceNavigation array
 * - Integrates with useNavigationStore to notify about course microservices
 * - v3.1.0: Context logic extracted to separate context file
 *
 * @example
 * ```tsx
 * <CourseMicroservice>
 *   <EduTest />
 *   <EduTest2 />
 * </CourseMicroservice>
 * ```
 */
const CourseMicroservice: React.FC<CourseMicroserviceProps> = ({ children }) => {
  return (
    <CourseMicroserviceProvider>
      <CourseManager />
      {children}
      <CourseRoutesProvider />
    </CourseMicroserviceProvider>
  );
};

export default CourseMicroservice;
