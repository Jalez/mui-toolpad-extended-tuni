/** @format */

import { Course } from '../store/useCourseStore';

export const filterUniqueCourses = (courses: Course[]): Course[] => {
  const courseMap = new Map<string, Course[]>();

  // Group courses by code
  courses.forEach((course) => {
    const existing = courseMap.get(course.code) || [];
    courseMap.set(course.code, [...existing, course]);
  });

  // For each group, select the most recently updated instance
  return Array.from(courseMap.values()).map((instances) => {
    return instances.reduce((mostRecent, current) => {
      const mostRecentDate = new Date(mostRecent.updatedAt);
      const currentDate = new Date(current.updatedAt);
      return currentDate > mostRecentDate ? current : mostRecent;
    });
  });
};

const INACTIVE_THRESHOLD_DAYS = 30; // 6 months

export const isActiveCourse = (course: Course): boolean => {
  const lastUpdate = new Date(course.updatedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastUpdate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= INACTIVE_THRESHOLD_DAYS;
};

// For course codes with multiple instances, check if any instance is active
export const isActivecode = (courses: Course[], code: string): boolean => {
  const instances = courses.filter((course) => course.code === code);
  return instances.some(isActiveCourse);
};

/**
 * Group courses by activity status (active/inactive).
 * @param courses List of courses or instances
 * @param skipUnique If true, do not apply unique filtering/logic.
 */
export const groupCoursesByActivity = (
  courses: Course[],
  skipUnique = false
) => {
  if (courses.length === 0) {
    return { active: [], inactive: [] };
  }

  // If skipUnique is requested, treat each course/instance individually
  if (skipUnique) {
    return courses.reduce(
      (acc, course) => {
        if (isActiveCourse(course)) {
          acc.active.push(course);
        } else {
          acc.inactive.push(course);
        }
        return acc;
      },
      { active: [] as Course[], inactive: [] as Course[] }
    );
  }

  // Otherwise, do the normal logic:
  // - If all share the same code, handle them as one set of instances
  // - If mixed codes, show only the most recently updated instance per code

  const allSameCourse = courses.every((c) => c.code === courses[0].code);

  if (allSameCourse) {
    // ...existing "allSameCourse" logic...
    return courses.reduce(
      (acc, course) => {
        if (isActiveCourse(course)) {
          acc.active.push(course);
        } else {
          acc.inactive.push(course);
        }
        return acc;
      },
      { active: [] as Course[], inactive: [] as Course[] }
    );
  }

  // For mixed courses, pick unique courses and check if the single, most-recent instance is active or not
  const uniqueCourses = filterUniqueCourses(courses);
  const activeCourses = uniqueCourses.filter((course) =>
    isActiveCourse(course)
  );
  const inactiveCourses = uniqueCourses.filter(
    (course) => !isActiveCourse(course)
  );

  return {
    active: activeCourses,
    inactive: inactiveCourses,
  };
};
