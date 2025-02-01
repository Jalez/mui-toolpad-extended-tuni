/** @format */

import { create } from 'zustand';
import { getCourseByUrl, getCourses, updateCourse } from '../network/courses';
import { fetchState } from '../interfaces';

export type courseRole = 'student' | 'teacher' | 'guest';

export type visibilityMode = 'public' | 'enrolled' | 'private';

export type courseEventType =
  | 'lecture'
  | 'exercise'
  | 'exam'
  | 'deadline'
  | 'other';

export type courseEventFrequency = 'daily' | 'weekly' | 'biweekly';

export type legalBasis =
  | 'consent' // Processing is based on explicit user consent
  | 'contract' // Processing is necessary for fulfilling educational contract
  | 'legal_obligation' // Processing is required by law (e.g., mandatory reporting)
  | 'legitimate_interests'; // Processing serves legitimate educational purposes

export type enrollmentStatus = 'enrolled' | 'pending' | 'rejected';

interface EnrollmentData {
  courseId: string;
  userId: string;
  name: string;
  email: string;
  role: courseRole;
  status: enrollmentStatus;
  // Add other fields like enrollDate, requestDate, etc. if needed
}

interface CourseEvent {
  id: string;
  type: courseEventType;
  title: string;
  description?: string;
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  location?: string; // Physical or virtual location
  teachers?: EnrollmentData[]; // Array of teacher IDs
  recurring?: {
    frequency: courseEventFrequency; // How often the event repeats
    until: string; // ISO date string
    exceptions?: string[]; // Array of ISO date strings for cancelled events
  };
  maxParticipants?: number;
  requiresRegistration?: boolean;
}

export type courseRelationType =
  | 'prerequisite' // Must complete before taking this course
  | 'recommended' // Should complete before taking this course
  | 'parallel' // Can/should be taken simultaneously
  | 'continues_from' // Natural continuation of this course
  | 'alternative_to' // Equivalent course (can't take both)
  | 'part_of' // Part of a larger study module/specialization
  | 'prepares_for'; // Helps prepare for this advanced course

export type courseLevel = 'basic' | 'intermediate' | 'advanced';

export interface CourseRelation {
  code: string;
  type: courseRelationType;
  description?: string; // Why this course is related
  required?: boolean; // Is this a hard requirement or just a suggestion
}

export interface CourseRaw {
  title: string; // Title of the course (required)
  description: string; // Description of the course (required)
  code: string; // Course code (e.g., 'COMP.CS.300') (required)
  instance: string; // Course instance identifier (e.g., 'compcs300-october-2024') (required)
  ltiLoginUrl?: string; // URL to use for LTI login (optional)
  services?: string[]; // List of services used by this course (optional)
  image?: {
    large: string; //Size should be 1200x800
    medium: string; //Size should be 600x400
    thumbnail: string; //Size should be 300x200
  };
  startDate: string | null; // ISO date string for course start date
  endDate: string | null; // ISO date string for course end date
  visibility: {
    mode: visibilityMode; // Who can see this course: everyone, enrolled users, or staff only
    startDate: string | null; // When the course becomes visible for students
    endDate: string | null; // When visibility ends for students
  };

  events: {
    [key in courseEventType]: CourseEvent[];
  };
  tags?: string[]; // Course tags for categorization and searching (optional)
  language?: string; // Primary language of instruction (ISO 639-1 code)
  dataProcessing: {
    purposes: string[]; // What the data is used for
    retention: number; // How long course data is kept after completion (in days)
    thirdPartyProcessors: {
      name: string;
      purpose: string;
      dataShared: string[];
    }[];
    specialCategories: boolean; // Whether course processes special categories of personal data
    legalBasis: legalBasis; // Legal basis for processing personal data
  };
  enrollment?: {
    startDate: string | null; // ISO date string for when enrollment opens
    endDate: string | null; // ISO date string for when enrollment closes
    status: {
      open: boolean; // Whether new enrollments are accepted
      maxStudents?: number; // Maximum number of students allowed (optional)
    };
  };
  data?: {
    myData?: {
      role: courseRole;
      status: enrollmentStatus;
    };
    enrollmentData?: EnrollmentData[];
  };
  relationships?: {
    prerequisites: CourseRelation[]; // Must/should complete these first
    continuations: CourseRelation[]; // Natural next steps after this course
    alternatives: CourseRelation[]; // Similar courses
    related: CourseRelation[]; // Other related courses
  };
  studyModule?: {
    name: string; // ID of the study module this belongs to
    order?: number; // Order within the module if relevant
    credits: number; // How many credits this course gives
    level: courseLevel; // Basic, intermediate, or advanced
  };
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
  image: {
    large: '',
    medium: '',
    thumbnail: '',
  },
  startDate: null,
  endDate: null,
  visibility: {
    mode: 'private' as const,
    startDate: null,
    endDate: null,
  },
  events: {
    lecture: [],
    exercise: [],
    exam: [],
    deadline: [],
    other: [],
  },
  tags: [],
  language: '',
  dataProcessing: {
    purposes: ['course_delivery', 'assessment'],
    retention: 365,
    thirdPartyProcessors: [],
    specialCategories: false,
    legalBasis: 'consent', // Default to most restrictive option
  },
  enrollment: {
    startDate: null,
    endDate: null,
    status: {
      open: false,
      maxStudents: undefined,
    },
  },
  relationships: {
    prerequisites: [],
    continuations: [],
    alternatives: [],
    related: [],
  },
  studyModule: {
    name: '',
    credits: 5,
    level: 'basic',
  },
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
  getCourses: async () => {
    try {
      set({ fetchState: 'loading' });
      console.log('Fetching courses...');
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
