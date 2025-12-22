/** @format */

/**
 * Core shared package for MUI Toolpad Extended TUNI
 * 
 * This package contains shared dependencies used by all microservices:
 * - Events (EventBus, UserBus)
 * - Navigation (NavigationRegistry, stores, hooks)
 * - Common UI components
 * - Dialogs and Notifications
 * - Utilities
 */

// Events
export * from './Events';
export { userBus } from './Events/UserBus'; // Instance - configured in users package

// Navigation
export {
  registerMicroservice,
  unregisterMicroservice,
  registerRouteProvider,
  unregisterRouteProvider,
  getMicroservice,
  getAllMicroservices,
  getMicroserviceIds,
  isMicroserviceRegistered,
  useMicroserviceRegistryStore,
} from './Navigation/NavigationRegistry';
export type {
  MicroserviceEntry,
  RouteProvider,
} from './Navigation/NavigationRegistry';

export { useMicroserviceRoutes } from './Navigation/hooks/useMicroserviceRoutes';
export { useMicroserviceNavigation } from './Navigation/hooks/useMicroserviceNavigation';
export { useNavigationSectionManager } from './Navigation/hooks/useNavigationSectionManager';
export { useSyncNavigationFilters } from './Navigation/hooks/useSyncNavigationFilters';

export {
  useNavigationStore,
  filterNavigationByRole,
} from './Navigation/store/useNavigationStore';
export type {
  NavigationStoreItem,
  NavigationPageStoreItem,
  NavigationHeaderItem,
  NavigationDividerItem,
  NavigationSection,
  ViewStore,
  ToolMetadata,
  addSectionProps,
} from './Navigation/store/types';

export { useNavigationFilterStore } from './Navigation/store/useNavigationFilterStore';
export type { NavigationFilterState } from './Navigation/store/useNavigationFilterStore';

export { NavigationSectionBuilder } from './Navigation/NavigationBuilder';
export { NavigationFilter } from './Navigation/NavigationFilter';
export { calculateNavigationFromSections } from './Navigation/store/navigationCalculator';
export { updateMicroserviceNavigationForSections } from './Navigation/store/sectionManager';
export { getAllMicroservices as getAllRegisteredMicroservices } from './Navigation/store/microserviceUtils';

// Common Components
export * from './common/components';
export { default as DraggableItem } from './common/components/ui/Panel/Movable/DraggableItem';

// Common Hooks
export { useRetry } from './common/hooks/useRetry';

// Dialogs
export { default as DialogOpener } from './Dialogs/DialogOpener';
export { default as FormDialog } from './Dialogs/FormDialog';
export { default as ExtendedDialog } from './Dialogs/ExtendedDialog';
export { default as Dialogs } from './Dialogs/Dialogs';
export { openDialog, closeDialog, registerDialog } from './Dialogs/dialogRegistry';

// Notifications
export { default as Notifications } from './Notifications/Notifications';
export { useNotificationStore } from './Notifications/store/useNotificationsStore';

// Utils
export {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from './utils/caseConverter';
export { parseDate } from './utils/parseDate';
export { slugify } from './utils/slugify';
export { apiPrefix, getApiPrefix } from './utils/apiPrefix';
export { getCookie, setCookie, deleteCookie, getColorSchemePreference, setColorSchemePreference, getEffectiveColorScheme } from './utils/cookieUtils';
export type { ColorSchemePreference } from './utils/cookieUtils';

// Interfaces
export type { fetchState } from './interfaces';

// Constants
export { BREAKPOINT_INFO } from './constants';
export type { BreakpointColor } from './constants';

