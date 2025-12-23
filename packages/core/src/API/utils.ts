/** @format */

import type { StandardApiEndpoints, CoursesApiEndpoints, UsersApiEndpoints, CalendarApiEndpoints } from './types';

/**
 * Builds a complete URL from a base URL and endpoint path.
 * Handles both absolute URLs and relative paths.
 * Supports query parameters in endpoint strings.
 * 
 * @param baseUrl - Base URL (e.g., "https://api.example.com" or "/")
 * @param endpoint - Endpoint path (e.g., "api/courses/" or "api/courses/?encoded_url=:encodedUrl")
 * @param params - Optional parameters to replace placeholders (e.g., { id: "123", encodedUrl: "base64string" })
 * @returns Complete URL string
 * 
 * @example
 * buildUrl("/", "api/courses/:id", { id: "123" }) // "/api/courses/123"
 * buildUrl("/", "api/courses/?encoded_url=:encodedUrl", { encodedUrl: "abc123" }) // "/api/courses/?encoded_url=abc123"
 * buildUrl("https://api.example.com", "courses/:id", { id: "123" }) // "https://api.example.com/courses/123"
 */
export function buildUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string | number>
): string {
  if (!endpoint) {
    return baseUrl;
  }

  // If endpoint is already a full URL, use it directly
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    let url = endpoint;
    // Replace placeholders (including in query strings)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, encodeURIComponent(String(value)));
      });
    }
    return url;
  }

  // Handle relative paths
  let url = endpoint;
  
  // Replace placeholders with actual values (including in query strings)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      // URL encode values, especially for query parameters
      const encodedValue = encodeURIComponent(String(value));
      url = url.replace(`:${key}`, encodedValue);
    });
  }

  // Combine base URL and endpoint
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const path = url.startsWith('/') ? url : `/${url}`;
  
  return `${base}${path}`;
}

/**
 * Gets default endpoint values for a microservice.
 * These match the current hardcoded values for backward compatibility.
 * 
 * @param service - The microservice name
 * @returns Default endpoint configuration
 */
export function getDefaultEndpoints(
  service: 'courses' | 'users' | 'calendar'
): StandardApiEndpoints | CoursesApiEndpoints | UsersApiEndpoints | CalendarApiEndpoints {
  switch (service) {
    case 'courses':
      return {
        get: 'api/courses/',
        getById: 'api/courses/:id',
        getByUrl: 'api/courses/?encoded_url=:encodedUrl',
        post: 'api/courses/',
        put: 'api/courses/:id/',
        delete: 'api/chat/courses/:id',
      } as CoursesApiEndpoints;
    
    case 'users':
      return {
        getCurrent: 'api/users/current/',
        get: 'api/users/',
        post: 'api/users/',
        put: 'api/users/:id/',
        delete: 'api/users/:id/',
        logout: '/auth/lti_logout/',
      } as UsersApiEndpoints;
    
    case 'calendar':
      return {
        get: 'api/calendar/',
        getById: 'api/calendar/:id',
        post: 'api/calendar/',
        put: 'api/calendar/:id/',
        delete: 'api/calendar/:id/',
      } as CalendarApiEndpoints;
    
    default:
      return {};
  }
}

/**
 * Merges user-provided endpoints with defaults.
 * User endpoints take precedence over defaults.
 * 
 * @param defaults - Default endpoint configuration
 * @param userEndpoints - User-provided endpoint configuration (optional)
 * @returns Merged endpoint configuration
 */
export function mergeEndpoints<T extends StandardApiEndpoints>(
  defaults: T,
  userEndpoints?: Partial<T>
): T {
  if (!userEndpoints) {
    return defaults;
  }
  
  return {
    ...defaults,
    ...userEndpoints,
  } as T;
}
