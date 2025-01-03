/** @format */

import { create } from 'zustand';
import {
  getCourseByUrl,
  getCourses,
  getCurrentCourse,
  updateCourse,
} from '../network/courses';
import { fetchState } from '../interfaces';

export interface Course {
  id: string; // Unique ID for the course
  title: string; // Title of the course
  description: string; // Description of the course
  createdAt: string; // Date when this course chat instance was created
  ltiLoginUrl: string; // URL to use for LTI login
  updatedAt: string; // Date when the course chat instance was last updated
}

export interface CourseRaw {
  title: string; // Title of the course
  description: string; // Description of the course
}

interface CourseStore {
  fetchState: fetchState;
  currentCourseUrl: string;
  currentCourse: Course | null;
  courses: Course[]; // List of other courses where the user is a teacher
  setCurrentCourseUrl: (url: string) => void;
  setCurrentCourse: (course: Course | null) => void;
  getCurrentCourse: () => void;
  updateCurrentCourse: (course: Course) => Promise<Course>;
  getCourseByUrl: (url: string) => void;
  getCourses: () => void;
}

// Zustand store to manage course data
const useCourseStore = create<CourseStore>((set) => ({
  fetchState: 'loading',
  currentCourseUrl: '',
  currentCourse: null,
  courses: [],
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
  updateCurrentCourse: async (course) => {
    try {
      const updatedCourse = await updateCourse(course);
      // Verify update before updating state
      if (updatedCourse && updatedCourse.id === course.id) {
        set({ currentCourse: updatedCourse });
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
