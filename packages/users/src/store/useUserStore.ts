/** @format */

import { createWithEqualityFn } from "zustand/traditional";
import {
  getCurrentUser,
  getUsers,
  logoutUser,
  updateUser,
} from "../network/users";
import { fetchState, PlatformRole } from "mui-toolpad-extended-tuni";
import studentImage from "/static/images/student.png";
import teacherImage from "/static/images/teacher.png";
import guestImage from "/static/images/guest.png";
import adminImage from "/static/images/admin.png";

// Re-export UserData type from main package
export type { UserData, PlatformRole, userId, navigationTypes, gender } from "mui-toolpad-extended-tuni";

const defaultTestUsers = [
  {
    id: "1",
    name: "Teacher User",
    email: "teacher@edu.com",
    image: {
      large: teacherImage,
      medium: teacherImage,
      thumbnail: teacherImage,
    },
    privacySettings: {
      allowAnalytics: false,
      allowPersonalization: false,
      allowCommunications: false,
      allowThirdPartySharing: false,
    },
    gdprConsent: {
      accepted: true,
      acceptedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    dataRetention: {
      deleteAccountAfterInactivity: 365,
      deleteDataAfterAccountDeletion: 30,
    },
    preferences: {
      navigationType: "direct" as navigationTypes,
      visibleCourseLists: {
        isStudent: true,
        isStudentOld: true,
        isTeacher: true,
        isTeacherOld: true,
        available: true,
      },
      lastVisitedCourses: [],
      visibleNavigation: ["Courses"],
    },
    platformRoles: ["creator", "moderator"] as PlatformRole[],
  },
  {
    id: "2",
    name: "Student User",
    email: "student@edu.com",
    image: {
      large: studentImage,
      medium: studentImage,
      thumbnail: studentImage,
    },
    privacySettings: {
      allowAnalytics: false,
      allowPersonalization: false,
      allowCommunications: false,
      allowThirdPartySharing: false,
    },
    gdprConsent: {
      accepted: true,
      acceptedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    dataRetention: {
      deleteAccountAfterInactivity: 365,
      deleteDataAfterAccountDeletion: 30,
    },
    preferences: {
      navigationType: "direct" as navigationTypes,
      visibleCourseLists: {
        isStudent: true,
        isStudentOld: true,
        isTeacher: true,
        isTeacherOld: true,
        available: true,
      },
      lastVisitedCourses: [],
      visibleNavigation: ["Courses"],
    },
    platformRoles: ["user"] as PlatformRole[],
  },
  {
    id: "3",
    name: "Guest User",
    email: "",
    image: {
      large: guestImage,
      medium: guestImage,
      thumbnail: guestImage,
    },
    privacySettings: {
      allowAnalytics: false,
      allowPersonalization: false,
      allowCommunications: false,
      allowThirdPartySharing: false,
    },
    gdprConsent: {
      accepted: true,
      acceptedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    dataRetention: {
      deleteAccountAfterInactivity: 365,
      deleteDataAfterAccountDeletion: 30,
    },
    preferences: {
      navigationType: "direct" as navigationTypes,
      visibleCourseLists: {
        isStudent: true,
        isStudentOld: true,
        isTeacher: true,
        isTeacherOld: true,
        available: true,
      },
      lastVisitedCourses: [],
      visibleNavigation: ["Courses"],
    },
    platformRoles: ["user"] as PlatformRole[],
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@edu.com",
    image: {
      large: adminImage,
      medium: adminImage,
      thumbnail: adminImage,
    },
    privacySettings: {
      allowAnalytics: false,
      allowPersonalization: false,
      allowCommunications: false,
      allowThirdPartySharing: false,
    },
    gdprConsent: {
      accepted: true,
      acceptedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    dataRetention: {
      deleteAccountAfterInactivity: 365,
      deleteDataAfterAccountDeletion: 30,
    },
    preferences: {
      navigationType: "direct" as navigationTypes,
      visibleCourseLists: {
        isStudent: true,
        isStudentOld: true,
        isTeacher: true,
        isTeacherOld: true,
        available: true,
      },
      lastVisitedCourses: [],
      visibleNavigation: ["Courses"],
    },
    platformRoles: ["creator", "moderator"] as PlatformRole[],
  },
];

export interface UserState {
  fetchState: fetchState;
  user: UserData | null;
  userToUpdate: UserData | null;
  testUsers: UserData[];
  users: UserData[];
  courseUsers?: UserData[];
  setUserToUpdate: (user: UserData | null) => void;
  setUser: (user: UserData) => void;
  setTestUsers: (users: UserData[]) => void;
  getUser: () => void;
  clearUser: () => void;
  getUsers: () => void;
  fetchCourseUsers: (courseId: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: UserData) => Promise<UserData>;
}

export const useUserStore = createWithEqualityFn<UserState>((set) => ({
  fetchState: "idle",
  user: null,
  userToUpdate: null,
  testUsers: defaultTestUsers,
  users: [],
  courseUsers: [],
  setUserToUpdate: (user) => set({ userToUpdate: user }),
  setTestUsers: (users) => set({ testUsers: users }),
  setUser: (user) => set({ user }),
  getUser: async () => {
    try {
      set({ fetchState: "loading" });
      set({ testUsers: defaultTestUsers });
      const user = await getCurrentUser();

      if (user) {
        set({
          user: { ...user },
          fetchState: "idle",
          testUsers: defaultTestUsers.filter((u) => u.id !== user.id),
        });
      }
    } catch (error) {
      console.error("Error getting user", error);
      set({ fetchState: "error" });
    }
  },
  getUsers: async () => {
    try {
      set({ fetchState: "loading" });
      const users = await getUsers();
      if (users) {
        set({ users, fetchState: "idle" });
      } else {
        set({ fetchState: "error" });
      }
    } catch (error) {
      set({ fetchState: "error" });
    }
  },
  fetchCourseUsers: async (courseId) => {
    try {
      set({ fetchState: "loading" });
      const users = await getUsers(courseId);
      set({ courseUsers: users, fetchState: "idle" });
    } catch {
      set({ fetchState: "error" });
    }
  },
  clearUser: () => set({ user: null }),
  logout: async () => {
    try {
      await logoutUser();
      set({ user: null });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateUser: async (userData) => {
    try {
      set({ fetchState: "loading" });
      const updatedUser = await updateUser(userData);

      // Update both user and userToUpdate states
      set((state) => {
        const newState = {
          fetchState: "idle" as fetchState,
          userToUpdate: updatedUser,
          // If this is the current user, update that too
          user: state.user?.id === updatedUser.id ? updatedUser : state.user,
        };
        return newState;
      });

      return Promise.resolve(updatedUser);
    } catch (error) {
      console.error("Failed to update user:", error);
      set({ fetchState: "error" });
      return Promise.reject(error);
    }
  },
}));
