/** @format */

import { userBus, registerDialog } from '@mui-toolpad-extended-tuni/main';
import { configureUserBus } from './configureUserBus';
import UserSettings from './Forms/UserSettings/UserSettings';

// Configure UserBus synchronously before exporting - this ensures it's configured before any component uses it
configureUserBus();

// Register UserSettings dialog when package is imported
registerDialog('UserSettings', UserSettings);

export { default as UserMicroservice } from './UserMicroservice';
export { useUserStore } from './store/useUserStore';
export { userBus }; // Re-export configured instance
export { configureUserBus }; // Export for explicit configuration if needed (idempotent)
export type { UserData, PlatformRole, userId, navigationTypes, gender } from './store/useUserStore';

// Export UserSettings component for dialogs
export { default as UserSettings } from './Forms/UserSettings/UserSettings';

// Export UserSwitcher component for dev tools
export { default as UserSwitcher } from './UserSwitcher';
