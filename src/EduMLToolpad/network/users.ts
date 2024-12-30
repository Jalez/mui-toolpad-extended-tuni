/** @format */

import axios from '../network/axiosConfig';
import { UserData } from '../store/useUserStore';

export const getCurrentUser = async (courseId?: string): Promise<UserData> => {
  try {
    const response = await axios.get(
      `api/users/current/${courseId ? `?course_id=${courseId}` : ''}`
    );
    return response.data;
  } catch (error) {
    console.error('Error getting current user', error);
    throw error;
  }
};

// Remove getUserRoleForCourse function

export const getUsers = async (courseId?: string): Promise<UserData[]> => {
  try {
    const response = await axios.get(
      `api/users/${courseId ? `?course_id=${courseId}` : ''}`
    );
    console.log('response', response);

    return response.data;
  } catch (error) {
    console.error('Error getting users', error);
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
