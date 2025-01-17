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
  title: string; // Title of the course (required)
  description: string; // Description of the course (required)
  code: string; // Course code (e.g., 'COMP.CS.300') (required)
  instance: string; // Course instance identifier (e.g., 'compcs300-october-2024') (required)
  ltiLoginUrl?: string; // URL to use for LTI login (optional)
  services?: string[]; // List of services available for this course (optional)
  image?: string; // URL to course cover image, can be external or internal path (optional)
  staff?: string[]; // Array of staff member IDs associated with the course (optional)
  visibility: {
    mode: 'public' | 'enrolled' | 'private'; // Who can see this course: everyone, enrolled users, or staff only
    startDate?: string | null; // When the course becomes visible (ISO date string)
    endDate?: string | null; // When the course visibility ends (ISO date string)
  };
  enrollmentStatus: {
    open: boolean; // Whether new enrollments are accepted
    startDate?: string | null; // When enrollment opens (ISO date string)
    endDate?: string | null; // When enrollment closes (ISO date string)
    maxStudents?: number; // Maximum number of students allowed (optional)
  };
  tags?: string[]; // Course tags for categorization and searching (optional)
  language?: string; // Primary language of instruction (ISO 639-1 code)
  status: 'draft' | 'active' | 'archived'; // Current state of the course
}
export interface Course extends CourseRaw {
  id: string; // Unique ID for the course
  createdAt: string; // Date when this course chat instance was created
  updatedAt: string; // Date when the course chat instance was last updated
}

export const courseTemplate: CourseRaw = {
  code: '',
  instance: '',
  title: '',
  description: '',
  image: '',
  status: 'draft' as const, // Explicitly type as const
  visibility: {
    mode: 'private' as const, // Explicitly type as const
    startDate: null,
    endDate: null,
  },
  enrollmentStatus: {
    open: false,
    startDate: null,
    endDate: null,
    maxStudents: undefined,
  },
  tags: [],
  language: '',
  staff: [],
};

interface CourseStore {
  fetchState: fetchState;
  currentCourseUrl: string;
  currentCourse: Course | null;
  courseToUpdate: Course | null;
  courses: Course[]; // List of other courses where the user is a teacher
  currentCourseCode: string | null;
  setCourseToUpdate: (course: Course | null) => void;
  setCurrentCourseUrl: (url: string) => void;
  setCurrentCourse: (course: Course | null) => void;
  setCurrentCourseCode: (code: string) => void;
  getCurrentCourse: () => void;
  updateStateCourse: (course: Course) => Promise<Course>;
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
const useCourseStore = create<CourseStore>((set, get) => ({
  fetchState: 'loading',
  currentCourseUrl: '',
  currentCourse: null,
  courses: [],
  currentCourseCode: null,
  courseToUpdate: null,
  getCourseByUrl: async (url) => {
    try {
      const course = await getCourseByUrl(url);
      set({ currentCourse: course });
    } catch (error) {
      console.error('Failed to fetch course by URL:', error);
    }
  },
  setCourseToUpdate: (course) => set({ courseToUpdate: course }),
  setCurrentCourseUrl: (url) => set({ currentCourseUrl: url }),
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentCourseCode: (code) => set({ currentCourseCode: code }),
  updateStateCourse: async (course) => {
    try {
      const updatedCourse = await updateCourse(course);
      const { currentCourse } = get();
      // Verify update before updating state
      if (updatedCourse && updatedCourse.id === currentCourse?.id) {
        set({ currentCourse: updatedCourse });
        //Also update the courses list if the current course was updated
      }
      set((state) => ({
        courses: state.courses.map((c) =>
          c.id === updatedCourse.id ? updatedCourse : c
        ),
      }));
      return updatedCourse;
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
