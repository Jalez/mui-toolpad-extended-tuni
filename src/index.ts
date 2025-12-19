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

// UserBus and hooks - core functionality
export {
  userBus,
  UserBus,
  useCurrentUser,
  useUserPreferences,
  useUserActions,
} from "./LMSToolpad/components/Events";
export type {
  UserData,
  UserEvent,
  UserEventType,
  UserPreferences,
  PlatformRole,
  UserBusStoreConfig,
  navigationTypes,
  gender,
  userId,
} from "./LMSToolpad/components/Events";

// Navigation - core functionality
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
} from "./LMSToolpad/components/Navigation/NavigationRegistry";
export type {
  MicroserviceEntry,
  RouteProvider,
} from "./LMSToolpad/components/Navigation/NavigationRegistry";

export { useMicroserviceRoutes } from "./LMSToolpad/components/Navigation/hooks/useMicroserviceRoutes";
export { useMicroserviceNavigation } from "./LMSToolpad/components/Navigation/hooks/useMicroserviceNavigation";
export { useNavigationSectionManager } from "./LMSToolpad/components/Navigation/hooks/useNavigationSectionManager";
export { useSyncNavigationFilters } from "./LMSToolpad/components/Navigation/hooks/useSyncNavigationFilters";

// Toolbar registry - for registering app and page toolbar actions
export {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
  registerPageToolbarAction,
  unregisterPageToolbarAction,
  useToolbarRegistryStore,
} from "./LMSToolpad/layout/Toolbars/toolbarRegistry";

export {
  useNavigationStore,
  filterNavigationByRole,
} from "./LMSToolpad/components/Navigation/store/useNavigationStore";
export type {
  NavigationStoreItem,
  NavigationPageStoreItem,
  NavigationHeaderItem,
  NavigationDividerItem,
  NavigationSection,
  ViewStore,
  ToolMetadata,
  addSectionProps,
} from "./LMSToolpad/components/Navigation/store/types";

export { useNavigationFilterStore } from "./LMSToolpad/components/Navigation/store/useNavigationFilterStore";
export type { NavigationFilterState } from "./LMSToolpad/components/Navigation/store/useNavigationFilterStore";

export { NavigationSectionBuilder } from "./LMSToolpad/components/Navigation/NavigationBuilder";
export { NavigationFilter } from "./LMSToolpad/components/Navigation/NavigationFilter";

// Notifications - core functionality
export { default as Notifications } from "./LMSToolpad/components/Notifications/Notifications";
export { useNotificationStore } from "./LMSToolpad/components/Notifications/store/useNotificationsStore";

/**
 * **COMPONENTS**
 */

export { default as Home } from "./LMSToolpad/components/Routes/Home/Home";

// Microservices component - core infrastructure
export { default as Microservices } from "./LMSToolpad/components/Microservices/Microservices";

// Common components - core functionality
export * from "./common/components";
export { default as Scroller } from "./common/components/ui/Scroller/Scroller";
export { SpeedDialButton } from "./common/components/ui/SpeedDialButton/SpeedDialButton";
export { useGridItemContext } from "./common/components/layout/GridLayout/GridItemContext";
export { createGridItem } from "./common/components/layout/GridLayout/layoutUtils";

// Dialogs - core functionality
export { default as DialogOpener } from "./LMSToolpad/components/Dialogs/DialogOpener";
export { default as FormDialog } from "./LMSToolpad/components/Dialogs/FormDialog";
export { default as ExtendedDialog } from "./LMSToolpad/components/Dialogs/ExtendedDialog";
export { default as Dialogs } from "./LMSToolpad/components/Dialogs/Dialogs";
export { registerDialog, getDialog } from "./LMSToolpad/components/Dialogs/dialogRegistry";

export { default as IconWithBadge } from "./LMSToolpad/components/IconWithBadge";

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

// Utils - core functionality
export {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from "./LMSToolpad/utils/caseConverter";
export { parseDate } from "./LMSToolpad/utils/parseDate";
export { slugify } from "./LMSToolpad/utils/slugify";
export { getApiPrefix } from "./LMSToolpad/utils/apiPrefix";
export { getCookie, setCookie, deleteCookie } from "./LMSToolpad/utils/cookieUtils";

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

// EventBus - core functionality
export { EventBus, eventBus } from "./LMSToolpad/components/Events/EventBus";
export type { Event, EventSource } from "./LMSToolpad/components/Events/types";
export type { Event as EventType } from "./LMSToolpad/components/Events/types";

// Common hooks
export { useRetry } from "./common/hooks/useRetry";
