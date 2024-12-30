/** @format */

import { create } from 'zustand';
import { getCurrentUser, getUsers, logoutUser } from '../network/users';
import { fetchState } from '../interfaces';
import studentImage from '/static/images/student.png';
import teacherImage from '/static/images/teacher.png';
import guestImage from '/static/images/guest.png';

export type userId = string;
export type role = 'student' | 'teacher' | 'guest';

export interface UserData {
  id: userId;
  name: string;
  email: string;
  role: role;
  image?: string;
  color?: string;
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
];

export interface UserState {
  fetchState: fetchState;
  user: UserData | null;
  testUsers: UserData[];
  users: UserData[];
  setUser: (user: UserData) => void;
  setTestUsers: (users: UserData[]) => void;
  getUser: (courseId?: string) => void;
  changeRole: (role: 'student' | 'teacher') => void;
  clearUser: () => void;
  getUsers: () => void;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  fetchState: 'idle',
  user: null,
  testUsers: defaultTestUsers,
  users: [],
  setTestUsers: (users) => set({ testUsers: users }),
  setUser: (user) => set({ user }),
  getUser: async (courseId) => {
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
  },
  getUsers: async () => {
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
