/** @format */

import { userBus } from 'mui-toolpad-extended-tuni';
import { configureUserBus } from './configureUserBus';

// Configure UserBus synchronously before exporting - this ensures it's configured before any component uses it
configureUserBus();

export { default as UserMicroservice } from './UserMicroservice';
export { useUserStore } from './store/useUserStore';
export { userBus }; // Re-export configured instance
export { configureUserBus }; // Export for explicit configuration if needed (idempotent)
export type { UserData, PlatformRole, userId, navigationTypes, gender } from './store/useUserStore';

// Export mocks for testing/development
export { userHandlers } from './mocks/endpoints';
