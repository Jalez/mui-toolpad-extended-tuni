/** @format */

/**
 * Configuration interface for microservices
 * 
 * Used to define microservice metadata including routing, component, and navigation building.
 */
export interface MicroserviceConfig {
  path: string;
  Component: React.ComponentType;
  fetchHooks?: Array<(courseId: string) => void>;
  buildNavigation: (courseId: string, isTeacher: boolean) => any[]; // or your own type
}