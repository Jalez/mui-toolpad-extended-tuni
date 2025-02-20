/**
 * A utility hook that transforms course data into navigation-compatible format.
 * Separates course-specific logic from navigation components.
 *
 * @module useCourseNavigationAdapter
 */

import { useMemo } from "react";
import { Course } from "../../store/useCourseStore";
import { subjectConfig } from "../../config/subjectConfig";
import { createCourseIcon } from "../../CourseItem/CourseIcon";

export const useCourseNavigationAdapter = () => {
  /**
   * Creates a navigation item object from a course
   * Memoized to prevent unnecessary recalculations
   *
   * @param {Course} course - The course to transform
   * @returns {Object} Navigation item compatible with NavigationBuilder
   */
  const createNavigationItemFromCourse = useMemo(
    () => (course: Course) => {
      const subject = course.code.split(".")[0];
      const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
      const level = course.studyModule?.level || "basic";
      const courseColor = config.levelShades[level] || config.baseColor;
      const Icon = createCourseIcon(courseColor, config);

      return {
        segment: course.code,
        title: course.code.toUpperCase(),
        Icon,
        instances: [course.instance],
        description: course.description,
        microservices: course.services,
      };
    },
    []
  );

  return {
    createNavigationItemFromCourse,
  };
};
