/** @format */

import { UserBus, userBus, UserBusStoreConfig } from "mui-toolpad-extended-tuni";
import { useUserStore } from "./store/useUserStore";
import type { UserData } from "mui-toolpad-extended-tuni";

/**
 * Configure UserBus with store methods from useUserStore.
 * This should be called once when the users package is initialized.
 */
export function configureUserBus(): void {
  const storeConfig: UserBusStoreConfig = {
    getUser: async () => {
      const store = useUserStore.getState();
      await store.getUser();
    },
    updateUser: async (userData: UserData) => {
      const store = useUserStore.getState();
      return await store.updateUser(userData);
    },
    setUserToUpdate: (user: UserData | null) => {
      const store = useUserStore.getState();
      store.setUserToUpdate(user);
    },
    fetchCourseUsers: async (courseId: string) => {
      const store = useUserStore.getState();
      await store.fetchCourseUsers(courseId);
    },
    logout: async () => {
      const store = useUserStore.getState();
      await store.logout();
    },
    getState: () => {
      const store = useUserStore.getState();
      return {
        user: store.user,
        courseUsers: store.courseUsers,
      };
    },
  };

  userBus.configureStore(storeConfig);
}

// Configure UserBus immediately when this module is loaded
configureUserBus();
