/** @format */
import { Course, CourseRaw } from '../store/useCourseStore';
/**
 * @description Helper function to make a GET request to retrieve the current course
 * @returns Promise<Course> - The current course object
 */
export declare function getCurrentCourse(): Promise<Course>;
/**
 *
 * @description Helper function to make a GET request to retrieve courses
 * @returns Promise<Course[]> - The list of courses
 */
export declare function getCourses(): Promise<Course[]>;
/**
 * @description Helper function to make a GET request to retrieve a course by ID
 * @param courseId - The ID of the course to retrieve
 * @returns Promise<Course> - The course object
 */
export declare function getCourseById(courseId: string): Promise<Course>;
/**
 * @description Helper function to make a GET request to retrieve a course by URL
 * @param url - The URL of the course to retrieve
 * @returns Promise<Course> - The course object
 */
export declare function getCourseByUrl(url: string): Promise<Course>;
/**
 * @description Helper function to make a POST request to add a new course
 * **Should only be used by teachers or admins!**
 * @param courseData - The course data to add
 * @returns Added course object
 */
export declare function addCourse(courseData: CourseRaw): Promise<Course>;
/**
 * @description Helper function to make a PUT request to update a course
 * @param courseData - The course data to update
 * @returns Updated course object
 */
export declare function updateCourse(courseData: Course): Promise<Course>;
/**
 * @description Helper function to make a DELETE request to delete a course
 * @param courseId - The ID of the course to delete
 * @returns Deleted course object
 */
export declare function deleteCourse(courseId: string): Promise<Course>;
