/**
 * Adapter component that connects the visited courses system with navigation.
 * Responsible for converting visited course IDs to navigation items.
 *
 * @component
 * @example
 * <VisitedCoursesNavigationAdapter />
 */

import React, { useEffect } from "react";
import {
  onVisitedCoursesUpdate,
  getVisitedCourses,
} from "../../../hooks/useVisitedCourses";
import useCourseStore, { Course } from "../store/useCourseStore";
import { useCourseNavigationAdapter } from "./hooks/useCourseNavigationAdapter";
import { useNavigationSectionManager } from "../../Navigation/hooks/useNavigationSectionManager";

export const VisitedCoursesNavigationAdapter: React.FC = () => {
  const { addDynamicSection } = useNavigationSectionManager();
  const { courses } = useCourseStore();
  const { createNavigationItemFromCourse } = useCourseNavigationAdapter();

  console.log("[VisitedCoursesNavigationAdapter] Render - courses:", courses.length);

  useEffect(() => {
    console.log("[VisitedCoursesNavigationAdapter] useEffect - courses:", courses.length);
    // This function will be called whenever visited courses change
    const handleVisitedCourses = (visitedCourseIds: string[]) => {
      console.log("[VisitedCoursesNavigationAdapter] handleVisitedCourses - ids:", visitedCourseIds);
      if (!courses.length) return;

      const visitedCourses = visitedCourseIds
        .map((id) => {
          const [code, instance] = id.split(":");
          return courses.find(
            (course) => course.code === code && course.instance === instance
          );
        })
        .filter((course): course is Course => !!course);

      console.log("[VisitedCoursesNavigationAdapter] visitedCourses found:", visitedCourses.length);
      if (visitedCourses.length > 0) {
        const pages = visitedCourses.map((course) =>
          createNavigationItemFromCourse(course)
        );
        console.log("[VisitedCoursesNavigationAdapter] Adding section with pages:", pages.map(p => ({ segment: p.segment, microservices: p.microservices })));
        addDynamicSection({
          header: "Last 5 visited courses",
          keepVisible: true,
          pages,
        });
        // Note: Microservices.tsx handles navigation updates via useEffect
        // when sections change, so no need to call updateMicroserviceNavigationForSections here
      }
    };

    if (courses.length > 0) {
      // Initial load - get current visited courses
      const initialCourses = getVisitedCourses();
      console.log("[VisitedCoursesNavigationAdapter] Initial courses from localStorage:", initialCourses);
      handleVisitedCourses(initialCourses);

      // Subscribe to future updates
      const unsubscribe = onVisitedCoursesUpdate(handleVisitedCourses);
      return () => unsubscribe();
    }
  }, [
    courses,
    addDynamicSection,
    createNavigationItemFromCourse,
  ]);

  return null;
};
