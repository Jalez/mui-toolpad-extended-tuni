/** @format */

import axios from './axiosConfig';
import { UserData } from '../store/useUserStore';
import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from '../utils/caseConverter';

export const getCurrentUser = async (courseId?: string): Promise<UserData> => {
  try {
    const response = await axios.get(
      `api/users/current/${courseId ? `?course_id=${courseId}` : ''}`
    );
    // console.log('response', response.data);
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    console.error('Error getting current user', error);
    throw error;
  }
};

export const getUsers = async (courseId?: string): Promise<UserData[]> => {
  try {
    const response = await axios.get(
      `api/users/${courseId ? `?course_id=${courseId}` : ''}`
    );

    return response.data.map((user: UserData) =>
      convertObjectKeysToCamelCase(user)
    );
  } catch (error) {
    console.error('Error getting users', error);
    throw error;
  }
};

export const createUser = async (
  userData: Partial<UserData>
): Promise<UserData> => {
  try {
    const snakeCaseData = convertObjectKeysToUnderscore(userData);
    const response = await axios.post('api/users/', snakeCaseData);
    return convertObjectKeysToCamelCase(response.data);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userData: UserData): Promise<UserData> => {
  try {
    const snakeCaseData = convertObjectKeysToUnderscore(userData);
    const response = await axios.put(
      `api/users/${userData.id}/`,
      snakeCaseData
    );

    if (!response.data) {
      throw new Error('No data received from server');
    }

    const updatedUser = convertObjectKeysToCamelCase(response.data);

    // Ensure the image is preserved if it's a data URL
    if (userData.image?.large?.startsWith('data:image')) {
      updatedUser.image = userData.image;
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await axios.delete(`api/users/${userId}/`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post('/auth/lti_logout/');
  } catch (error) {
    console.error('Error logging out user', error);
    throw error;
  }
};
