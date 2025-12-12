/** @format */

export { default as LMSProvider } from "./LMSToolpad/LMSProvider";

//as of v3, No longer exists
// export type { EduMLProviderProps } from './LMSToolpad/EduMLProvider';

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
export * from "./LMSToolpad/components/Courses/store/useCourseStore";

export { default as useCourseStore } from "./LMSToolpad/components/Courses/store/useCourseStore";

export { default as useDialogStore } from "./LMSToolpad/store/useDialogStore";

export * from "./LMSToolpad/store/useUserStore";

export * from "./LMSToolpad/components/Navigation/store/useNavigationStore";

export * from "./LMSToolpad/components/Courses/store/useCourseNavigationStore";

export * from "./LMSToolpad/components/Notifications/store/useNotificationsStore";

/**
 * **COMPONENTS**
 */

export { default as Home } from "./LMSToolpad/components/Routes/Home/Home";

export { default as CourseTools } from "./LMSToolpad/components/Courses/CourseTools";

export { default as CourseMicroservice } from "./LMSToolpad/components/Courses/CourseMicroservice";
export { useCourseMicroserviceRegistration } from "./LMSToolpad/components/Courses/CourseMicroservice";

export { default as LoadingScreen } from "./common/components/ui/LoadingScreen/LoadingScreen";

export { default as ToolSelector } from "./LMSToolpad/components/Tool/ToolSelector";
export type { ToolSelectorItem } from "./LMSToolpad/components/Tool/ToolSelector";

export { default as DialogOpener } from "./LMSToolpad/components/Dialogs/DialogOpener";

export { default as FormDialog } from "./LMSToolpad/components/Dialogs/FormDialog";

export { default as IconWithBadge } from "./LMSToolpad/components/IconWithBadge";

export { default as ExtendedDialog } from "./LMSToolpad/components/Dialogs/ExtendedDialog";

export { default as CenteredHeading } from "./common/components/ui/CenteredHeading/CenteredHeading";

/**
 * **TOOLS**
 */

export { default as ErrorBoundary } from "./LMSToolpad/tools/ErrorBoundary";

export { default as NullStateWarning } from "./LMSToolpad/tools/NullStateWarning";

export {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from "./LMSToolpad/utils/caseConverter";

export { default as MicroserviceRoutes } from "./LMSToolpad/components/Microservices/MicroserviceRoutes";
export type { MicroserviceConfig } from "./LMSToolpad/components/Microservices/MicroserviceRoutes";

export { buildMicroServiceNavigation } from "./LMSToolpad/components/Microservices/MicroserviceNavigationBuilder";
export type { BuildMicroServiceNavigationProps } from "./LMSToolpad/components/Microservices/MicroserviceNavigationBuilder";

/**
 * **NETWORK**
 */

export { default as axios } from "./LMSToolpad/network/axiosConfig";

/**
 * **CONSTANTS**
 */

export { baseUrl } from "./LMSToolpad/constants";

export * from "./LMSToolpad/interfaces";
