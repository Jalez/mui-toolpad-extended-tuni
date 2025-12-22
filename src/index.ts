/** @format */

export { default as ToolpadProvider } from "./LMSToolpad/ToolpadProvider";

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
export * from "./LMSToolpad/interfaces";

/**
 * **STORES**
 */
export { default as useDialogStore } from "./LMSToolpad/store/useDialogStore";

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
} from "@mui-toolpad-extended-tuni/core";

// Toolbar registry - for registering app and page toolbar actions
export {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
  registerPageToolbarAction,
  unregisterPageToolbarAction,
  useToolbarRegistryStore,
} from "./LMSToolpad/layout/Toolbars/toolbarRegistry";

// Notifications - from core
export { Notifications, useNotificationStore } from "@mui-toolpad-extended-tuni/core";

/**
 * **COMPONENTS**
 */

export { default as Home } from "./LMSToolpad/components/Routes/Home/Home";

// Microservices component - core infrastructure
export { default as Microservices } from "./LMSToolpad/components/Microservices/Microservices";

// Common components - from core
export * from "@mui-toolpad-extended-tuni/core";

// Dialogs - from core
export { DialogOpener, FormDialog, ExtendedDialog, Dialogs, openDialog, closeDialog, registerDialog } from "@mui-toolpad-extended-tuni/core";

export { default as IconWithBadge } from "./LMSToolpad/components/IconWithBadge";
export { default as ThemeToggle } from "./LMSToolpad/components/ThemeToggle/ThemeToggle";

// Forms components - core functionality
export { default as EditableText } from "./LMSToolpad/Forms/Components/Editables/EditableText";
export { default as EditableSwitch } from "./LMSToolpad/Forms/Components/Editables/EditableSwitch";
export { default as EditableNumber } from "./LMSToolpad/Forms/Components/Editables/EditableNumber";
export { default as EditableImage } from "./LMSToolpad/Forms/Components/Editables/EditableImage";
export { default as EditableSelect } from "./LMSToolpad/Forms/Components/Editables/EditableSelect";
export { default as EditableAutocomplete } from "./LMSToolpad/Forms/Components/Editables/EditableAutoComplete";
export { default as EditableColor } from "./LMSToolpad/Forms/Components/Editables/EditableColor";

/**
 * **TOOLS**
 */

export { default as ErrorBoundary } from "./LMSToolpad/tools/ErrorBoundary";

export { default as NullStateWarning } from "./LMSToolpad/tools/NullStateWarning";

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

export type { MicroserviceConfig } from "./LMSToolpad/components/Microservices/types";

export { buildMicroServiceNavigation } from "./LMSToolpad/components/Microservices/MicroserviceNavigationBuilder";
export type { BuildMicroServiceNavigationProps } from "./LMSToolpad/components/Microservices/MicroserviceNavigationBuilder";
export { default as MicroserviceSubsections } from "./LMSToolpad/components/Microservices/MicroserviceSubsections";

/**
 * **NETWORK**
 */

export { default as axios } from "./LMSToolpad/network/axiosConfig";

/**
 * **CONSTANTS**
 */

export { baseUrl } from "./LMSToolpad/constants";

export * from "./LMSToolpad/interfaces";

// Common hooks - from core
export { useRetry } from "@mui-toolpad-extended-tuni/core";

// Interfaces - from core
export type { fetchState } from "@mui-toolpad-extended-tuni/core";
