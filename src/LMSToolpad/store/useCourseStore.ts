/** @format */

import { create } from 'zustand';
import {
  getCourseByUrl,
  getCourses,
  getCurrentCourse,
  updateCourse,
} from '../network/courses';
import { fetchState } from '../interfaces';

export interface CourseRaw {
  title: string; // Title of the course
  description: string; // Description of the course
  code: string; // Course code (e.g., 'COMP.CS.300')
  instance: string; // Course instance identifier (e.g., 'compcs300-october-2024')
  ltiLoginUrl?: string; // URL to use for LTI login
  services?: string[]; // List of services available for this course
}
export interface Course extends CourseRaw {
  id: string; // Unique ID for the course
  createdAt: string; // Date when this course chat instance was created
  updatedAt: string; // Date when the course chat instance was last updated
}

interface CourseStore {
  fetchState: fetchState;
  currentCourseUrl: string;
  currentCourse: Course | null;
  courses: Course[]; // List of other courses where the user is a teacher
  currentCourseCode: string | null;
  setCurrentCourseUrl: (url: string) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentCourseCode: (code: string) => void;
  getCurrentCourse: () => void;
  updateCurrentCourse: (course: Course) => Promise<Course>;
  getCourseByUrl: (url: string) => void;
  getCourses: () => void;
}

/**
 * Course management store with enhanced instance handling.
 *
 * @version 2.1.0
 * @updates
 * - Added support for course codes and instances
 * - Enhanced course filtering capabilities
 * - Added currentCourseCode state
 * - Updated Course interface with new fields
 * - Added instance-specific state management
 *
 * @breaking-changes
 * - Updated Course interface requires code and instance fields
 * - Changed course identification logic to use code + instance
 */
const useCourseStore = create<CourseStore>((set) => ({
  fetchState: 'loading',
  currentCourseUrl: '',
  currentCourse: null,
  courses: [],
  currentCourseCode: null,
  getCourseByUrl: async (url) => {
    try {
      const course = await getCourseByUrl(url);
      set({ currentCourse: course });
    } catch (error) {
      console.error('Failed to fetch course by URL:', error);
    }
  },
  setCurrentCourseUrl: (url) => set({ currentCourseUrl: url }),
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentCourseCode: (code) => set({ currentCourseCode: code }),
  updateCurrentCourse: async (course) => {
    try {
      const updatedCourse = await updateCourse(course);
      // Verify update before updating state
      if (updatedCourse && updatedCourse.id === course.id) {
        set({ currentCourse: updatedCourse });
        //Also update the courses list if the current course was updated
        set((state) => ({
          courses: state.courses.map((c) =>
            c.id === updatedCourse.id ? updatedCourse : c
          ),
        }));
        return updatedCourse;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Failed to update the course:', error);
      throw error; // Re-throw to handle in component
    }
  },
  getCurrentCourse: async () => {
    try {
      const response = await getCurrentCourse();
      set({ currentCourse: response });
    } catch (error) {
      console.error('Failed to fetch current course:', error);
    }
  },
  getCourses: async () => {
    try {
      set({ fetchState: 'loading' });
      const response = await getCourses();
      const courses = response;
      set({ fetchState: 'idle' });
      set({ courses });
    } catch (error) {
      set({ fetchState: 'error' });
      console.error('Failed to fetch courses:', error);
    }
  },
}));

export default useCourseStore;
