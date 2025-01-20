/** @format */

import { create } from 'zustand';
import {
  getCurrentUser,
  getUsers,
  logoutUser,
  updateUser,
} from '../network/users';
import { fetchState } from '../interfaces';
import studentImage from '/static/images/student.png';
import teacherImage from '/static/images/teacher.png';
import guestImage from '/static/images/guest.png';
import adminImage from '/static/images/admin.png';

export type userId = string;
export type role = 'student' | 'teacher' | 'guest' | 'admin';

export interface UserData {
  id: userId;
  name: string;
  email: string;
  role: role;
  image?: string;
  color?: string;
  enrollmentStatus?: {
    status: 'enrolled' | 'pending' | 'rejected';
    date: string; // When the enrollment status was last updated
  };
  enrollDate?: string; // When the user was actually enrolled in the course
  requestDate?: string; // When the user initially requested enrollment
  privacySettings: {
    allowAnalytics: boolean;
    allowPersonalization: boolean;
    allowCommunications: boolean;
    allowThirdPartySharing: boolean;
  };
  gdprConsent: {
    accepted: boolean;
    acceptedDate?: string;
    lastUpdated: string;
  };
  dataRetention: {
    deleteAccountAfterInactivity?: number; // in days
    deleteDataAfterAccountDeletion?: number; // in days
  };
}

const defaultTestUsers = [
  {
    id: '1',
    name: 'Teacher User',
    email: 'teacher@edu.com',
    role: 'teacher' as role,
    image: teacherImage,
    color: '#3f51b5',
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
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@edu.com',
    role: 'student' as role,
    image: studentImage,
    color: '#f50057',
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
  },
  {
    id: '3',
    name: 'Guest User',
    email: '',
    role: 'guest' as role,
    image: guestImage,
    color: '#f50057',
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
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@edu.com',
    role: 'admin' as role,
    image: adminImage,
    color: '#black',
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
  getUser: (courseId?: string) => void;
  changeRole: (role: 'student' | 'teacher') => void;
  clearUser: () => void;
  getUsers: () => void;
  fetchCourseUsers: (courseId: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: UserData) => Promise<UserData>;
}

export const useUserStore = create<UserState>((set) => ({
  fetchState: 'idle',
  user: null,
  userToUpdate: null,
  testUsers: defaultTestUsers,
  users: [],
  courseUsers: [],
  setUserToUpdate: (user) => set({ userToUpdate: user }),
  setTestUsers: (users) => set({ testUsers: users }),
  setUser: (user) => set({ user }),
  getUser: async (courseId) => {
    try {
      set({ fetchState: 'loading' });
      set({ testUsers: defaultTestUsers });
      const user = await getCurrentUser(courseId);

      switch (user.role) {
        case 'student':
          user.image = studentImage;
          break;
        case 'teacher':
          user.image = teacherImage;
          break;
        case 'guest':
          user.image = guestImage;
          break;
        case 'admin':
          user.image = adminImage;
          break;
      }
      if (user) {
        console.log('User', user);
        set({
          user: { ...user },
          fetchState: 'idle',
          testUsers: defaultTestUsers.filter((u) => u.role !== user.role),
        });
      }
    } catch (error) {
      console.log('Error getting user', error);
      set({ fetchState: 'error' });
    }
  },
  getUsers: async () => {
    try {
      set({ fetchState: 'loading' });
      const users = await getUsers();
      users.forEach((user) => {
        user.image = user.role === 'student' ? studentImage : teacherImage;
      });
      if (users) {
        set({ users, fetchState: 'idle' });
      } else {
        set({ fetchState: 'error' });
      }
    } catch (error) {
      set({ fetchState: 'error' });
    }
  },
  fetchCourseUsers: async (courseId) => {
    try {
      set({ fetchState: 'loading' });
      const users = await getUsers(courseId);
      set({ courseUsers: users, fetchState: 'idle' });
    } catch {
      set({ fetchState: 'error' });
    }
  },
  changeRole: (role) =>
    set((state) => {
      if (state.user) {
        let image;
        if (role === 'student') {
          image = studentImage;
        } else if (role === 'teacher') {
          image = teacherImage;
        } else {
          image = guestImage;
        }
        return { user: { ...state.user, role, image } };
      }
      return state;
    }),
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
      set({ fetchState: 'loading' });
      const updatedUser = await updateUser(userData);

      // Update both user and userToUpdate states
      set((state) => ({
        fetchState: 'idle',
        userToUpdate: updatedUser,
        // If this is the current user, update that too
        user: state.user?.id === updatedUser.id ? updatedUser : state.user,
      }));

      return Promise.resolve(updatedUser);
    } catch (error) {
      set({ fetchState: 'error' });
      return Promise.reject(error);
    }
  },
}));
