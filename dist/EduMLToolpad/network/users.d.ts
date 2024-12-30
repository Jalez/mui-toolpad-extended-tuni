/** @format */
import { UserData } from '../store/useUserStore';
export declare const getCurrentUser: (courseId?: string) => Promise<UserData>;
export declare const getUsers: (courseId?: string) => Promise<UserData[]>;
export declare const logoutUser: () => Promise<void>;
