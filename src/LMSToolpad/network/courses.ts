/** @format */

import { Course, CourseRaw } from '../store/useCourseStore';
import axios from './axiosConfig';
import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from '../utils/caseConverter';

/**
 * @description Helper function to make a GET request to retrieve the current course
 * @returns Promise<Course> - The current course object
 */
export async function getCurrentCourse(): Promise<Course> {
  try {
    const response = await axios.get('api/courses/current/');
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    throw new Error('Failed to retrieve current course: ' + error);
  }
}

/**
 *
 * @description Helper function to make a GET request to retrieve courses
 * @returns Promise<Course[]> - The list of courses
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const response = await axios.get('api/courses/');
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    throw new Error('Failed to retrieve courses: ' + error);
  }
}

/**
 * @description Helper function to make a GET request to retrieve a course by ID
 * @param courseId - The ID of the course to retrieve
 * @returns Promise<Course> - The course object
 */
export async function getCourseById(courseId: string): Promise<Course> {
  try {
    const response = await axios.get(`api/courses/${courseId}`);
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    throw new Error('Failed to retrieve course: ' + error);
  }
}

/**
 * @description Helper function to make a GET request to retrieve a course by URL
 * @param url - The URL of the course to retrieve
 * @returns Promise<Course> - The course object
 */
export async function getCourseByUrl(url: string): Promise<Course> {
  try {
    //use base64 encoding to encode the url
    const encodedUrl = btoa(url);
    const response = await axios.get(`api/courses/?encoded_url=${encodedUrl}`);
    // ?url=${encodeURIComponent(url)}
    //THIS IS EVIL: WE SHOULD NOT TAKE THE FIRST ELEMENT OF THE ARRAY
    return convertObjectKeysToCamelCase(response.data[0]);
  } catch (error) {
    throw new Error('Failed to retrieve course by URL: ' + error);
  }
}

/**
 * @description Helper function to make a POST request to add a new course
 * **Should only be used by teachers or admins!**
 * @param courseData - The course data to add
 * @returns Added course object
 */
export async function addCourse(courseData: CourseRaw): Promise<Course> {
  try {
    const response = await axios.post('api/courses/', courseData);
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    throw new Error('Failed to add a new course: ' + error);
  }
}

/**
 * @description Helper function to make a PUT request to update a course
 * @param courseData - The course data to update
 * @returns Updated course object
 */
export async function updateCourse(courseData: Course): Promise<Course> {
  try {
    // Convert camelCase to snake_case for backend

    const response = await axios.put(
      `api/courses/${courseData.id}/`,
      convertObjectKeysToUnderscore(courseData)
    );

    const updatedCourse = convertObjectKeysToCamelCase(response.data);

    return updatedCourse;
  } catch (error) {
    throw new Error(`Failed to update the course: ${error}`);
  }
}

/**
 * @description Helper function to make a DELETE request to delete a course
 * @param courseId - The ID of the course to delete
 * @returns Deleted course object
 */
export async function deleteCourse(courseId: string): Promise<Course> {
  try {
    const response = await axios.delete(`api/chat/courses/${courseId}`);
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    throw new Error('Failed to delete the course: ' + error);
  }
}
