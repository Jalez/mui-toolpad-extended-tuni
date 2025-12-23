/** @format */

export { default as ToolpadProvider, useLogoContext } from "./ToolpadProvider";
export type { ToolpadProviderProps, LogoConfig } from "./ToolpadProvider";

// Re-export API configuration utilities from core (for advanced usage)
export {
  useServiceApiConfig,
  useApiConfigContext,
  registerApiEndpoints,
  getApiConfig,
} from "@mui-toolpad-extended-tuni/core";
export type {
  StandardApiEndpoints,
  CoursesApiEndpoints,
  UsersApiEndpoints,
  CalendarApiEndpoints,
} from "@mui-toolpad-extended-tuni/core";

// Re-export router dependencies that consumers might need
export {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";
export * from "./interfaces";

/**
 * **STORES**
 */
export { default as useDialogStore } from "./store/useDialogStore";

// Re-export from @mui-toolpad-extended-tuni/core
export {
  // Events
  userBus,
  UserBus,
  useCurrentUser,
  useUserPreferences,
  useUserActions,
  EventBus,
  eventBus,
} from "@mui-toolpad-extended-tuni/core";
export type {
  UserData,
  UserEvent,
  UserEventType,
  UserPreferences,
  PlatformRole,
  UserBusStoreConfig,
  Event,
  EventSource,
} from "@mui-toolpad-extended-tuni/core";
export type { Event as EventType } from "@mui-toolpad-extended-tuni/core";

// Navigation - from core
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
  useMicroserviceRoutes,
  useMicroserviceNavigation,
  useNavigationSectionManager,
  useSyncNavigationFilters,
  useNavigationStore,
  filterNavigationByRole,
  useNavigationFilterStore,
  NavigationSectionBuilder,
  NavigationFilter,
  calculateNavigationFromSections,
  updateMicroserviceNavigationForSections,
  getAllRegisteredMicroservices,
} from "@mui-toolpad-extended-tuni/core";
export type {
  MicroserviceEntry,
  RouteProvider,
  NavigationStoreItem,
  NavigationPageStoreItem,
  NavigationHeaderItem,
  NavigationDividerItem,
  NavigationSection,
  ViewStore,
  ToolMetadata,
  NavigationFilterState,
  addSectionProps,
} from "@mui-toolpad-extended-tuni/core";

// Toolbar registry - for registering app and page toolbar actions
export {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
  registerPageToolbarAction,
  unregisterPageToolbarAction,
  useToolbarRegistryStore,
} from "./layout/Toolbars/toolbarRegistry";

// Notifications - from core
export { Notifications, useNotificationStore } from "@mui-toolpad-extended-tuni/core";

/**
 * **COMPONENTS**
 */

export { default as Home } from "./components/Routes/Home/Home";

// Microservices component - core infrastructure
export { default as Microservices } from "./components/Microservices/Microservices";

// Common components - from core
export * from "@mui-toolpad-extended-tuni/core";

// Dialogs - from core
export { DialogOpener, FormDialog, ExtendedDialog, Dialogs, openDialog, closeDialog, registerDialog } from "@mui-toolpad-extended-tuni/core";

export { default as IconWithBadge } from "./components/IconWithBadge";
export { default as ThemeToggle } from "./components/ThemeToggle/ThemeToggle";

// Forms components - core functionality
export { default as EditableText } from "./Forms/Components/Editables/EditableText";
export { default as EditableSwitch } from "./Forms/Components/Editables/EditableSwitch";
export { default as EditableNumber } from "./Forms/Components/Editables/EditableNumber";
export { default as EditableImage } from "./Forms/Components/Editables/EditableImage";
export { default as EditableSelect } from "./Forms/Components/Editables/EditableSelect";
export { default as EditableAutocomplete } from "./Forms/Components/Editables/EditableAutoComplete";
export { default as EditableColor } from "./Forms/Components/Editables/EditableColor";

/**
 * **TOOLS**
 */

export { default as ErrorBoundary } from "./tools/ErrorBoundary";

export { default as NullStateWarning } from "./tools/NullStateWarning";

// Utils - from core
export {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
  parseDate,
  slugify,
  getApiPrefix,
  apiPrefix,
  getCookie,
  setCookie,
  deleteCookie,
} from "@mui-toolpad-extended-tuni/core";

export type { MicroserviceConfig } from "./components/Microservices/types";

export { buildMicroServiceNavigation } from "./components/Microservices/MicroserviceNavigationBuilder";
export type { BuildMicroServiceNavigationProps } from "./components/Microservices/MicroserviceNavigationBuilder";
export { default as MicroserviceSubsections } from "./components/Microservices/MicroserviceSubsections";

/**
 * **NETWORK**
 */

export { default as axios } from "./network/axiosConfig";

/**
 * **CONSTANTS**
 */

export { baseUrl } from "./constants";

export * from "./interfaces";

// Common hooks - from core
export { useRetry } from "@mui-toolpad-extended-tuni/core";

// Interfaces - from core
export type { fetchState } from "@mui-toolpad-extended-tuni/core";
