/** @format */

/**
 * Standard CRUD API endpoints interface.
 * All microservice endpoint configurations extend this base interface.
 */
export interface StandardApiEndpoints {
  /** GET endpoint for retrieving a list of resources */
  get?: string;
  /** GET endpoint for retrieving a single resource by ID. Use :id placeholder for the ID */
  getById?: string;
  /** POST endpoint for creating a new resource */
  post?: string;
  /** PUT endpoint for updating an existing resource. Use :id placeholder for the ID */
  put?: string;
  /** DELETE endpoint for deleting a resource. Use :id placeholder for the ID */
  delete?: string;
}

/**
 * Courses microservice API endpoints configuration.
 * Extends StandardApiEndpoints with course-specific endpoints.
 */
export interface CoursesApiEndpoints extends StandardApiEndpoints {
  /** GET endpoint for retrieving a course by URL. Use :encodedUrl placeholder for base64-encoded URL */
  getByUrl?: string;
}

/**
 * Users microservice API endpoints configuration.
 * Extends StandardApiEndpoints with user-specific endpoints.
 */
export interface UsersApiEndpoints extends StandardApiEndpoints {
  /** GET endpoint for retrieving the current authenticated user */
  getCurrent?: string;
  /** POST endpoint for user logout */
  logout?: string;
}

/**
 * Calendar microservice API endpoints configuration.
 * Extends StandardApiEndpoints with calendar-specific endpoints.
 */
export interface CalendarApiEndpoints extends StandardApiEndpoints {
  // Add calendar-specific endpoints here as needed
}

/**
 * Generic service API endpoints type alias.
 * Allows microservices to define their own endpoint interfaces.
 */
export type ServiceApiEndpoints = StandardApiEndpoints;
