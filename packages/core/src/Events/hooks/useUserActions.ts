/** @format */

import { useCallback } from "react";
import { userBus } from "../UserBus";
import type { UserData } from "../userTypes";

/**
 * Hook that provides user actions through UserBus
 * All actions trigger UserBus events when called
 * 
 * @returns { updateUser, setUserToUpdate, fetchCourseUsers, getUser, logout, getCourseUsers }
 */
export const useUserActions = () => {
  const updateUser = useCallback(async (userData: UserData): Promise<UserData> => {
    return await userBus.updateUser(userData);
  }, []);

  const setUserToUpdate = useCallback((user: UserData | null): void => {
    userBus.setUserToUpdate(user);
  }, []);

  const fetchCourseUsers = useCallback(async (courseId: string): Promise<void> => {
    return await userBus.fetchCourseUsers(courseId);
  }, []);

  const getUser = useCallback(async (): Promise<void> => {
    return await userBus.getUser();
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    return await userBus.logout();
  }, []);

  const getCourseUsers = useCallback((): UserData[] | undefined => {
    return userBus.getCourseUsers();
  }, []);

  return {
    updateUser,
    setUserToUpdate,
    fetchCourseUsers,
    getUser,
    logout,
    getCourseUsers,
  };
};
