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

  useEffect(() => {
    // This function will be called whenever visited courses change
    const handleVisitedCourses = (visitedCourseIds: string[]) => {
      console.log("Received visited course IDs:", visitedCourseIds); // Debug log
      if (!courses.length) return;

      const visitedCourses = visitedCourseIds
        .map((id) => {
          const [code, instance] = id.split(":");
          return courses.find(
            (course) => course.code === code && course.instance === instance
          );
        })
        .filter((course): course is Course => !!course);

      if (visitedCourses.length > 0) {
        console.log("Found matching courses:", visitedCourses); // Debug log
        addDynamicSection({
          header: "Last 5 visited courses",
          keepVisible: true,
          pages: visitedCourses.map((course) =>
            createNavigationItemFromCourse(course)
          ),
        });
      }
    };

    if (courses.length > 0) {
      // Initial load - get current visited courses
      const initialCourses = getVisitedCourses();
      console.log("Initial visited courses:", initialCourses); // Debug log
      handleVisitedCourses(initialCourses);

      // Subscribe to future updates
      const unsubscribe = onVisitedCoursesUpdate(handleVisitedCourses);
      return () => {
        console.log("Unsubscribing from visited courses updates"); // Debug log
        unsubscribe();
      };
    }
  }, [courses, addDynamicSection, createNavigationItemFromCourse]);

  return null;
};
