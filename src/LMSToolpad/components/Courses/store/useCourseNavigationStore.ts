/** @format */

import { create } from "zustand";
import { NavigationPageStoreItem } from "../../Navigation/store/useNavigationStore";

/**
 * Dedicated navigation store for course microservices.
 *
 * @version 1.0.0
 *
 * This store provides clean separation between app-level and course-level
 * navigation concerns. Course microservices (like EduTest, EduTest2) register
 * here instead of the main navigation store.
 *
 * Benefits:
 * - Clean separation of concerns
 * - No complex context-aware logic required
 * - Dedicated course microservice management
 * - Simplified main navigation store
 *
 * @example
 * ```typescript
 * const { addCourseMicroserviceNavigation } = useCourseNavigationStore();
 *
 * useEffect(() => {
 *   addCourseMicroserviceNavigation(myNavigation);
 * }, []);
 * ```
 */
interface CourseNavigationStore {
  /**
   * All registered course microservice navigation items.
   * These are the navigation definitions provided by course microservices.
   */
  allCourseMicroserviceNavigation: NavigationPageStoreItem[];

  /**
   * Add a course microservice navigation item to the store.
   * Prevents duplicates based on segment.
   */
  addCourseMicroserviceNavigation: (item: NavigationPageStoreItem) => void;

  /**
   * Remove a course microservice navigation item by segment.
   */
  removeCourseMicroserviceNavigation: (segment: string) => void;

  /**
   * Get enabled microservices for a specific course.
   * Filters the registered microservices based on the course's enabled services.
   *
   * @param courseServices - Array of service segments enabled for the course
   * @returns Array of navigation items for enabled microservices
   */
  getEnabledMicroservicesForCourse: (
    courseServices: string[]
  ) => NavigationPageStoreItem[];

  /**
   * Get all registered course microservices (regardless of course enablement).
   * Useful for showing available tools that can be enabled.
   */
  getAllCourseMicroservices: () => NavigationPageStoreItem[];

  /**
   * Clear all course microservice navigation items.
   * Useful for cleanup during unmount or reset scenarios.
   */
  clearCourseMicroserviceNavigation: () => void;
}

export const useCourseNavigationStore = create<CourseNavigationStore>(
  (set, get) => ({
    allCourseMicroserviceNavigation: [],

    addCourseMicroserviceNavigation: (item) =>
      set((state) => {
        const exists = state.allCourseMicroserviceNavigation.find(
          (ms) => ms.segment === item.segment
        );
        if (!exists) {
          return {
            allCourseMicroserviceNavigation: [
              ...state.allCourseMicroserviceNavigation,
              item,
            ],
          };
        }
        return state;
      }),

    removeCourseMicroserviceNavigation: (segment) =>
      set((state) => ({
        allCourseMicroserviceNavigation:
          state.allCourseMicroserviceNavigation.filter(
            (ms) => ms.segment !== segment
          ),
      })),

    getEnabledMicroservicesForCourse: (courseServices) => {
      const state = get();
      if (!courseServices || courseServices.length === 0) {
        return [];
      }
      return state.allCourseMicroserviceNavigation.filter((ms) =>
        courseServices.includes(ms.segment)
      );
    },

    getAllCourseMicroservices: () => {
      return get().allCourseMicroserviceNavigation;
    },

    clearCourseMicroserviceNavigation: () =>
      set({ allCourseMicroserviceNavigation: [] }),
  })
);

export default useCourseNavigationStore;
