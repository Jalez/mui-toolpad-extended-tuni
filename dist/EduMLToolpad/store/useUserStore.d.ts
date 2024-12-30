/** @format */
import { fetchState } from '../interfaces';
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
export declare const useUserStore: any;
