/** @format */

import { axios } from '@mui-toolpad-extended-tuni/main';
import type { UserData } from '@mui-toolpad-extended-tuni/main';
import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
  getApiConfig,
  buildUrl,
} from '@mui-toolpad-extended-tuni/core';
import type { UsersApiEndpoints } from '@mui-toolpad-extended-tuni/core';

/**
 * Helper function to get users API configuration.
 * Returns the users endpoints from the global API config.
 */
function getUsersApiConfig(): UsersApiEndpoints | undefined {
  const apiConfig = getApiConfig();
  if (!apiConfig) {
    return undefined;
  }
  return apiConfig.endpoints.get('users') as UsersApiEndpoints | undefined;
}

export const getCurrentUser = async (): Promise<UserData> => {
  try {
    const apiConfig = getApiConfig();
    const usersConfig = getUsersApiConfig();
    const endpoint = usersConfig?.getCurrent || 'api/users/current/';
    const url = buildUrl(apiConfig?.baseUrl || '/', endpoint);
    const response = await axios.get(url);
    return convertObjectKeysToCamelCase(response.data) as UserData;
  } catch (error) {
    console.error("Error getting current user", error);
    throw error;
  }
};

export const getUsers = async (courseId?: string): Promise<UserData[]> => {
  try {
    const apiConfig = getApiConfig();
    const usersConfig = getUsersApiConfig();
    const endpoint = usersConfig?.get || 'api/users/';
    let url = buildUrl(apiConfig?.baseUrl || '/', endpoint);
    if (courseId) {
      url += `?course_id=${courseId}`;
    }
    const response = await axios.get(url);

    //Ensure resposne.data is an array
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid response data");
    }
    return response.data.map(
      (user: any) => convertObjectKeysToCamelCase(user) as UserData
    ) as UserData[];
  } catch (error) {
    console.error("Error getting users", error);
    throw error;
  }
};

export const createUser = async (
  userData: Partial<UserData>
): Promise<UserData> => {
  try {
    const apiConfig = getApiConfig();
    const usersConfig = getUsersApiConfig();
    const endpoint = usersConfig?.post || 'api/users/';
    const url = buildUrl(apiConfig?.baseUrl || '/', endpoint);
    const snakeCaseData = convertObjectKeysToUnderscore(userData);
    const response = await axios.post(url, snakeCaseData);
    return convertObjectKeysToCamelCase(response.data) as UserData;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (userData: UserData): Promise<UserData> => {
  try {
    if (!userData?.id) {
      throw new Error("Cannot update user: user.id is undefined");
    }
    const apiConfig = getApiConfig();
    const usersConfig = getUsersApiConfig();
    const endpoint = usersConfig?.put || 'api/users/:id/';
    const url = buildUrl(apiConfig?.baseUrl || '/', endpoint, { id: userData.id });
    const snakeCaseData = convertObjectKeysToUnderscore(userData);
    const response = await axios.put(url, snakeCaseData);

    if (!response.data) {
      throw new Error("No data received from server");
    }

    const updatedUser = convertObjectKeysToCamelCase(response.data) as UserData;

    // Ensure the image is preserved if it's a data URL
    if (userData.image?.large?.startsWith("data:image")) {
      updatedUser.image = { ...userData.image, ...updatedUser.image };
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    const apiConfig = getApiConfig();
    const usersConfig = getUsersApiConfig();
    const endpoint = usersConfig?.delete || 'api/users/:id/';
    const url = buildUrl(apiConfig?.baseUrl || '/', endpoint, { id: userId });
    await axios.delete(url);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const apiConfig = getApiConfig();
    const usersConfig = getUsersApiConfig();
    const endpoint = usersConfig?.logout || '/auth/lti_logout/';
    const url = buildUrl(apiConfig?.baseUrl || '/', endpoint);
    await axios.post(url);
  } catch (error) {
    console.error("Error logging out user", error);
    throw error;
  }
};
