/** @format */

import { Course, CourseRaw } from "../store/useCourseStore";
import { axios } from "mui-toolpad-extended-tuni";
import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from "mui-toolpad-extended-tuni";

const cache = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL = 300000; // 5 minutes TTL

/**
 * Helper to fetch with caching
 */
async function fetchWithCache<T>(
  key: string,
  fetchFn: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  const data = await fetchFn();
  cache.set(key, { timestamp: Date.now(), data });
  return data;
}

/**
 * @description Helper function to make a GET request to retrieve courses
 * @returns Promise<Course[]> - The list of courses
 */
export async function getCourses(): Promise<Course[]> {
  return fetchWithCache("getCourses", async () => {
    try {
      const response = await axios.get("api/courses/");
      // Ensure response.data is an array
      if (!Array.isArray(response.data)) {
        console.error("Expected array but got:", response.data);
        return [];
      }
      return convertObjectKeysToCamelCase(response.data) as Course[];
    } catch (error) {
      throw new Error("Failed to retrieve courses: " + error);
    }
  });
}

/**
 * @description Helper function to make a GET request to retrieve a course by ID
 * @param courseId - The ID of the course to retrieve
 * @returns Promise<Course> - The course object
 */
export async function getCourseById(courseId: string): Promise<Course> {
  const cacheKey = `getCourseById_${courseId}`;
  return fetchWithCache(cacheKey, async () => {
    try {
      const response = await axios.get(`api/courses/${courseId}`);
      return convertObjectKeysToCamelCase(response.data) as Course;
    } catch (error) {
      throw new Error("Failed to retrieve course: " + error);
    }
  });
}

/**
 * @description Helper function to make a GET request to retrieve a course by URL
 * @param url - The URL of the course to retrieve
 * @returns Promise<Course> - The course object
 */
export async function getCourseByUrl(url: string): Promise<Course> {
  const encodedUrl = btoa(url);
  const cacheKey = `getCourseByUrl_${encodedUrl}`;
  return fetchWithCache(cacheKey, async () => {
    try {
      const response = await axios.get(
        `api/courses/?encoded_url=${encodedUrl}`
      );
      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error("Course not found");
      }
      return convertObjectKeysToCamelCase(response.data[0] as Course);
    } catch (error) {
      throw new Error("Failed to retrieve course by URL: " + error);
    }
  });
}

/**
 * @description Helper function to make a POST request to add a new course
 * **Should only be used by teachers or admins!**
 * @param courseData - The course data to add
 * @returns Added course object
 */
export async function addCourse(courseData: CourseRaw): Promise<Course> {
  try {
    const response = await axios.post("api/courses/", courseData);
    return convertObjectKeysToCamelCase(response.data) as Course;
  } catch (error) {
    throw new Error("Failed to add a new course: " + error);
  }
}

/**
 * @description Helper function to make a PUT request to update a course
 * @param courseData - The course data to update
 * @returns Updated course object
 */
export const updateCourse = async (course: Course): Promise<Course> => {
  // Ensure dataProcessing exists when updating
  const courseWithDataProcessing = {
    ...course,
    dataProcessing: course.dataProcessing || {
      purposes: ["course_delivery", "assessment"],
      retention: 365,
      thirdPartyProcessors: [],
      specialCategories: false,
      legalBasis: "consent",
    },
  };

  try {
    // Convert camelCase to snake_case for backend
    const response = await axios.put(
      `api/courses/${courseWithDataProcessing.id}/`,
      convertObjectKeysToUnderscore(courseWithDataProcessing)
    );

    const updatedCourse = convertObjectKeysToCamelCase(response.data);

    return updatedCourse as Course;
  } catch (error) {
    throw new Error(`Failed to update the course: ${error}`);
  }
};

/**
 * @description Helper function to make a DELETE request to delete a course
 * @param courseId - The ID of the course to delete
 * @returns Deleted course object
 */
export async function deleteCourse(courseId: string): Promise<Course> {
  try {
    const response = await axios.delete(`api/chat/courses/${courseId}`);
    return convertObjectKeysToCamelCase(response.data) as Course;
  } catch (error) {
    throw new Error("Failed to delete the course: " + error);
  }
}
