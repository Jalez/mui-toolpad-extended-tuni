/**
 * A simple event emitter for handling visited courses updates
 */
class VisitedCoursesEmitter {
  private listeners: ((courseIds: string[]) => void)[] = [];

  emit(courseIds: string[]) {
    this.listeners.forEach((listener) => listener(courseIds));
  }

  subscribe(callback: (courseIds: string[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }
}

const emitter = new VisitedCoursesEmitter();

/**
 * Hook to manage the last 5 visited courses list.
 * Uses a simple event emitter for updates and stores the data in user preferences.
 *
 * @module useVisitedCourses
 */

import { type Course } from "../store/useCourseStore";
import { userBus } from '@mui-toolpad-extended-tuni/main';

/**
 * Creates a unique identifier for a course by combining code and instance
 * @param {Course} course - The course to create an ID for
 * @returns {string} The unique course identifier in format "code:instance"
 */
const createCourseId = (course: Course) => `${course.code}:${course.instance}`;

/**
 * Adds a course to the visited courses list and updates user preferences
 * @param {Course} course - The course to add to visited courses
 * @returns {Promise<void>}
 */
export const addVisitedCourse = async (course: Course) => {
  if (!course || !course.code || !course.instance) {
    console.warn("Attempted to add invalid course to visited courses:", course);
    return;
  }

  const user = userBus.getCurrentUserSync();
  if (!user) return;

  const courseIds = user.preferences.lastVisitedCourses || [];
  const courseId = createCourseId(course);
  const filteredCourseIds = courseIds.filter((id) => id !== courseId);
  filteredCourseIds.unshift(courseId);
  const updatedCourseIds = filteredCourseIds.slice(0, 5);

  try {
    await userBus.updateUser({
      ...user,
      preferences: {
        ...user.preferences,
        lastVisitedCourses: updatedCourseIds,
      },
    });
    emitter.emit(updatedCourseIds);
  } catch (error) {
    console.error("Failed to update visited courses:", error);
  }
};

/**
 * Gets the current list of visited course IDs from user preferences
 * @returns {string[]} Array of course IDs in "code:instance" format
 */
export const getVisitedCourses = () => {
  const user = userBus.getCurrentUserSync();
  return user?.preferences.lastVisitedCourses || [];
};

/**
 * Subscribes to visited courses updates
 * @param {Function} callback - Function to call when visited courses list changes
 * @returns {Function} Unsubscribe function
 */
export const onVisitedCoursesUpdate = (
  callback: (courseIds: string[]) => void
) => {
  return emitter.subscribe(callback);
};
