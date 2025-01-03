/** @format */

/**
 * @deprecated Use LMSProvider instead of EduMLProvider. Will be removed in version 2.0.0
 */
export { default as EduMLProvider } from './LMSToolpad/EduMLProvider';

export { default as LMSProvider } from './LMSToolpad/LMSProvider';

export type { EduMLProviderProps } from './LMSToolpad/EduMLProvider';

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
} from 'react-router-dom';
export * from './LMSToolpad/interfaces';

/**
 * **STORES**
 */
export * from './LMSToolpad/store/useCourseStore';

export { default as useCourseStore } from './LMSToolpad/store/useCourseStore';

export { default as useDialogStore } from './LMSToolpad/store/useDialogStore';

export * from './LMSToolpad/store/useUserStore';

export * from './LMSToolpad/store/useNavigationStore';

export * from './LMSToolpad/store/useNotificationsStore';

/**
 * **COMPONENTS**
 */

export { default as Home } from './LMSToolpad/components/Home';

export { default as CourseTools } from './LMSToolpad/components/Courses/CourseTools';

export { default as LoadingScreen } from './LMSToolpad/components/LoadingScreen';

export { default as ToolSelector } from './LMSToolpad/components/ToolSelector';
export type { ToolSelectorItem } from './LMSToolpad/components/ToolSelector';

export { default as DialogOpener } from './LMSToolpad/components/Dialogs/DialogOpener';

export { default as FormDialog } from './LMSToolpad/components/Dialogs/FormDialog';

export { default as IconWithBadge } from './LMSToolpad/components/IconWithBadge';

export { default as ExtendedDialog } from './LMSToolpad/components/EduMLDialog';

/**
 * **TOOLS**
 */

export { default as ErrorBoundary } from './LMSToolpad/tools/ErrorBoundary';

export { default as NullStateWarning } from './LMSToolpad/tools/NullStateWarning';

export {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from './LMSToolpad/utils/caseConverter';

export { default as MicroserviceRoutes } from './LMSToolpad/components/MicroserviceRoutes';
export type { MicroserviceConfig } from './LMSToolpad/components/MicroserviceRoutes';

/**
 * **NETWORK**
 */

export { default as axios } from './LMSToolpad/network/axiosConfig';

/**
 * **CONSTANTS**
 */

export { baseUrl } from './LMSToolpad/constants';

export * from './LMSToolpad/interfaces';
