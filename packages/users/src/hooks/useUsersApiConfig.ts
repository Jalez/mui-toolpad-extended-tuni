/** @format */

import { useServiceApiConfig } from '@mui-toolpad-extended-tuni/core';
import type { UsersApiEndpoints } from '@mui-toolpad-extended-tuni/core';

/**
 * Hook to access users API configuration.
 * Returns the users endpoint configuration merged with defaults.
 * 
 * @returns Users API endpoints configuration, or undefined if not registered
 * @throws Error if used outside of ApiConfigProvider
 * 
 * @example
 * ```tsx
 * const usersConfig = useUsersApiConfig();
 * const endpoint = usersConfig?.getCurrent; // "api/users/current/" or custom value
 * ```
 */
export const useUsersApiConfig = (): UsersApiEndpoints | undefined => {
  return useServiceApiConfig('users') as UsersApiEndpoints | undefined;
};
