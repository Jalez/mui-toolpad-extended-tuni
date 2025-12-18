/** @format */

// Configure UserBus before exporting
import "./configureUserBus";
import { userBus } from 'mui-toolpad-extended-tuni';

export { default as UserMicroservice } from './UserMicroservice';
export { useUserStore } from './store/useUserStore';
export { userBus }; // Re-export configured instance
export type { UserData, PlatformRole, userId, navigationTypes, gender } from './store/useUserStore';
