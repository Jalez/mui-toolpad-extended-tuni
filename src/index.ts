/** @format */

export { default as EduMLProvider } from './EduMLToolpad/EduMLProvider';

export type { EduMLProviderProps } from './EduMLToolpad/EduMLProvider';

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
export * from './EduMLToolpad/interfaces';

/**
 * **STORES**
 */
export * from './EduMLToolpad/store/useCourseStore';

export { default as useCourseStore } from './EduMLToolpad/store/useCourseStore';

export { default as useDialogStore } from './EduMLToolpad/store/useDialogStore';

export * from './EduMLToolpad/store/useUserStore';

export * from './EduMLToolpad/store/useNavigationStore';

export * from './EduMLToolpad/store/useNotificationsStore';

/**
 * **COMPONENTS**
 */

export { default as Home } from './EduMLToolpad/components/Home';

export { default as CourseTools } from './EduMLToolpad/components/Courses/CourseTools';

export { default as LoadingScreen } from './EduMLToolpad/components/LoadingScreen';

export { default as ToolSelector } from './EduMLToolpad/components/ToolSelector';
export type { ToolSelectorItem } from './EduMLToolpad/components/ToolSelector';

export { default as DialogOpener } from './EduMLToolpad/components/Dialogs/DialogOpener';

export { default as FormDialog } from './EduMLToolpad/components/Dialogs/FormDialog';

export { default as IconWithBadge } from './EduMLToolpad/components/IconWithBadge';

export { default as ExtendedDialog } from './EduMLToolpad/components/EduMLDialog';

/**
 * **TOOLS**
 */

export { default as ErrorBoundary } from './EduMLToolpad/tools/ErrorBoundary';

export { default as NullStateWarning } from './EduMLToolpad/tools/NullStateWarning';

export {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from './EduMLToolpad/utils/caseConverter';

/**
 * **NETWORK**
 */

export { default as axios } from './EduMLToolpad/network/axiosConfig';

/**
 * **CONSTANTS**
 */

export { baseUrl } from './EduMLToolpad/constants';

export * from './EduMLToolpad/interfaces';
