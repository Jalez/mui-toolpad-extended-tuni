/** @format */

import { create } from 'zustand';
import { getCurrentUser, getUsers, logoutUser } from '../network/users';
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
}

const defaultTestUsers = [
  {
    id: '1',
    name: 'Teacher User',
    email: 'teacher@edu.com',
    role: 'teacher' as role,
    image: teacherImage,
    color: '#3f51b5',
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@edu.com',
    role: 'student' as role,
    image: studentImage,
    color: '#f50057',
  },
  {
    id: '3',
    name: 'Guest User',
    email: '',
    role: 'guest' as role,
    image: guestImage,
    color: '#f50057',
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@edu.com',
    role: 'admin' as role,
    image: adminImage,
    color: '#black',
  },
];

export interface UserState {
  fetchState: fetchState;
  user: UserData | null;
  testUsers: UserData[];
  users: UserData[];
  courseUsers?: UserData[];
  setUser: (user: UserData) => void;
  setTestUsers: (users: UserData[]) => void;
  getUser: (courseId?: string) => void;
  changeRole: (role: 'student' | 'teacher') => void;
  clearUser: () => void;
  getUsers: () => void;
  fetchCourseUsers: (courseId: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  fetchState: 'idle',
  user: null,
  testUsers: defaultTestUsers,
  users: [],
  courseUsers: [],
  setTestUsers: (users) => set({ testUsers: users }),
  setUser: (user) => set({ user }),
  getUser: async (courseId) => {
    try {
      set({ fetchState: 'loading' });
      set({ testUsers: defaultTestUsers });
      const user = await getCurrentUser(courseId);

      user.image = user.role === 'student' ? studentImage : teacherImage;
      if (user) {
        let image;
        if (user.role === 'student') {
          image = studentImage;
        } else if (user.role === 'teacher') {
          image = teacherImage;
        } else {
          image = guestImage;
        }
        set({
          user: { ...user, image },
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
}));
