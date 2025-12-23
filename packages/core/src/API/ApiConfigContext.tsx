/** @format */

import React, { createContext, useContext, useMemo, ReactNode, useEffect, useState, useCallback } from 'react';
import type { StandardApiEndpoints } from './types';
import { getDefaultEndpoints, mergeEndpoints } from './utils';

/**
 * Module-level API configuration store.
 * This allows non-React code (like network functions) to access the current API configuration.
 */
let currentApiConfig: ApiConfigContextValue | null = null;
let registrationCallback: ((serviceKey: string, endpoints: StandardApiEndpoints) => void) | null = null;

/**
 * Get the current API configuration from module-level store.
 * This can be called from non-React contexts (e.g., network functions).
 * 
 * @returns Current API configuration or null if not initialized
 */
export const getApiConfig = (): ApiConfigContextValue | null => {
  return currentApiConfig;
};

/**
 * API Configuration Context Value
 * Provides generic endpoint configuration registry for all microservices.
 */
export interface ApiConfigContextValue {
  /** Map of service key to endpoint configuration */
  endpoints: Map<string, StandardApiEndpoints>;
  /** Base URL for API requests (from axios config) */
  baseUrl: string;
}

const ApiConfigContext = createContext<ApiConfigContextValue | undefined>(undefined);

/**
 * Props for ApiConfigProvider component
 */
export interface ApiConfigProviderProps {
  /** Base URL for API requests (defaults to "/") */
  baseUrl?: string;
  /** Child components */
  children: ReactNode;
}

/**
 * ApiConfigProvider Component
 * 
 * Provides API endpoint configuration registry to all child components.
 * Microservices register their endpoints via registerApiEndpoints().
 * 
 * @example
 * ```tsx
 * <ApiConfigProvider baseUrl="/">
 *   <YourApp />
 * </ApiConfigProvider>
 * ```
 */
export const ApiConfigProvider: React.FC<ApiConfigProviderProps> = ({
  baseUrl = '/',
  children,
}) => {
  const [endpoints, setEndpoints] = useState<Map<string, StandardApiEndpoints>>(new Map());

  const contextValue = useMemo<ApiConfigContextValue>(() => {
    return {
      endpoints,
      baseUrl,
    };
  }, [endpoints, baseUrl]);

  // Update module-level store when context value changes
  useEffect(() => {
    currentApiConfig = contextValue;
  }, [contextValue]);

  // Register endpoint function - exposed via callback
  const registerEndpoints = useCallback((serviceKey: string, userEndpoints: StandardApiEndpoints) => {
    setEndpoints((prev) => {
      const defaults = getDefaultEndpoints(serviceKey as any);
      const merged = mergeEndpoints(defaults, userEndpoints);
      const newMap = new Map(prev);
      newMap.set(serviceKey, merged);
      return newMap;
    });
  }, []);

  // Store registration callback for module-level access
  useEffect(() => {
    registrationCallback = registerEndpoints;
    return () => {
      registrationCallback = null;
    };
  }, [registerEndpoints]);

  return (
    <ApiConfigContext.Provider value={contextValue}>
      {children}
    </ApiConfigContext.Provider>
  );
};

/**
 * Register API endpoints for a microservice.
 * This function can be called from any component or module-level code.
 * 
 * @param serviceKey - Unique identifier for the microservice (e.g., 'courses', 'users')
 * @param endpoints - Endpoint configuration for the microservice (user-provided, will be merged with defaults)
 * 
 * @example
 * ```tsx
 * registerApiEndpoints('courses', {
 *   get: "https://api.example.com/courses",
 *   post: "https://api.example.com/courses"
 * });
 * ```
 */
export const registerApiEndpoints = (
  serviceKey: string,
  endpoints: StandardApiEndpoints
): void => {
  if (registrationCallback) {
    registrationCallback(serviceKey, endpoints);
  } else if (currentApiConfig) {
    // Fallback: directly update the map if context exists but callback not set yet
    const defaults = getDefaultEndpoints(serviceKey as any);
    const merged = mergeEndpoints(defaults, endpoints);
    currentApiConfig.endpoints.set(serviceKey, merged);
  } else {
    console.warn(`ApiConfig not initialized. Cannot register endpoints for '${serviceKey}'. Make sure ApiConfigProvider is rendered.`);
  }
};

/**
 * Hook to access API configuration for a specific service.
 * 
 * @param serviceKey - The service key (e.g., 'courses', 'users', 'calendar')
 * @returns Endpoint configuration for the specified service, or undefined if not registered
 * @throws Error if used outside of ApiConfigProvider
 * 
 * @example
 * ```tsx
 * const coursesConfig = useServiceApiConfig('courses');
 * const endpoint = coursesConfig?.get; // "api/courses/" or user-provided value
 * ```
 */
export const useServiceApiConfig = (serviceKey: string): StandardApiEndpoints | undefined => {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error('useServiceApiConfig must be used within an ApiConfigProvider');
  }
  return context.endpoints.get(serviceKey);
};

/**
 * Hook to access the full API configuration context.
 * Generally prefer useServiceApiConfig() for accessing specific service configs.
 * 
 * @returns Full API configuration context value
 * @throws Error if used outside of ApiConfigProvider
 * 
 * @example
 * ```tsx
 * const { endpoints, baseUrl } = useApiConfigContext();
 * const coursesConfig = endpoints.get('courses');
 * ```
 */
export const useApiConfigContext = (): ApiConfigContextValue => {
  const context = useContext(ApiConfigContext);
  if (context === undefined) {
    throw new Error('useApiConfigContext must be used within an ApiConfigProvider');
  }
  return context;
};
