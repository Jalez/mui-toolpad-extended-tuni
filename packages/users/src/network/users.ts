/** @format */

import { axios } from "mui-toolpad-extended-tuni";
import type { UserData } from "mui-toolpad-extended-tuni";
import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from "mui-toolpad-extended-tuni";

export const getCurrentUser = async (): Promise<UserData> => {
  try {
    const response = await axios.get(`api/users/current/`);
    return convertObjectKeysToCamelCase(response.data) as UserData;
  } catch (error) {
    console.error("Error getting current user", error);
    throw error;
  }
};

export const getUsers = async (courseId?: string): Promise<UserData[]> => {
  try {
    const response = await axios.get(
      `api/users/${courseId ? `?course_id=${courseId}` : ""}`
    );

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
    const snakeCaseData = convertObjectKeysToUnderscore(userData);
    const response = await axios.post("api/users/", snakeCaseData);
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
    const snakeCaseData = convertObjectKeysToUnderscore(userData);
    const response = await axios.put(
      `api/users/${userData.id}/`,
      snakeCaseData
    );

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
    await axios.delete(`api/users/${userId}/`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post("/auth/lti_logout/");
  } catch (error) {
    console.error("Error logging out user", error);
    throw error;
  }
};
