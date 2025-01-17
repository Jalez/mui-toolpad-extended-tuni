/** @format */

import { ReactNode, useEffect, useState } from 'react';
import {
  AppTheme,
  DashboardLayout,
  Navigation,
  Router,
  Session,
} from '@toolpad/core';
import { AppProvider } from '@toolpad/core/react-router-dom';
import { useNavigationStore } from './store/useNavigationStore';
import { useUserStore } from './store/useUserStore';
import useCourseStore from './store/useCourseStore';
import useCustomRouter from './hooks/useCustomRouter';
import { Logo } from './components/Logo';
import { addIcons } from './components/tools/addIcons';
import { addActions } from './components/tools/addActions';
import Notifications from './components/Notifications';
import { useNotificationStore } from './store/useNotificationsStore';
import { SnackbarProvider } from 'notistack';

import { SizableContentHeader } from './layout/breadcrumbs/SizableContentHeader';
import SidebarFooter from './components/sidebar/Footer';
import { ToolbarAccount } from './components/toolbar/Account';
import { CustomActions } from './components/toolbar/Actions';
import Dialogs from './components/Dialogs/Dialogs';
import { useThemeStore } from './store/useThemeStore';
import { createTheme, Theme } from '@mui/material';

export interface EduMLProviderProps {
  children?: ReactNode;
  // Add other props here
}

/**
 * Main provider component for the LMS system.
 *
 * @version 2.1.0
 * @breaking-changes
 * - Renamed from EduMLProvider to LMSProvider
 * - Updated authentication handling for course instances
 * - Added support for course code level navigation
 * - Improved context sharing between microservices
 *
 * @example
 * ```tsx
 * <BrowserRouter>
 *   <LMSProvider>
 *     {children}
 *   </LMSProvider>
 * </BrowserRouter>
 * ```
 */
const LMSProvider = ({ children }: EduMLProviderProps) => {
  // const createdTheme = createTheme(ThemeTemplate);
  const [loggingIn, setLoggingIn] = useState(false);
  const { user, getUser, logout } = useUserStore();
  const { currentCourse, getCourses, setCurrentCourseUrl, getCourseByUrl } =
    useCourseStore();
  const { navigation } = useNavigationStore();
  const router = useCustomRouter();
  const [currentNavigation, setCurrentNavigation] = useState<Navigation | null>(
    null
  );
  const [parentUrl, setParentUrl] = useState<string | null>(null);
  const { addNotificationData } = useNotificationStore();
  const { theme } = useThemeStore();
  const [lmsTheme, setLmsTheme] = useState<Theme>(createTheme(theme));

  // Fetch the user on mount and whenever loggingIn or currentCourse.id changes
  useEffect(() => {
    getUser(currentCourse?.id);
  }, [loggingIn, currentCourse?.id, getUser]);

  useEffect(() => {
    setLmsTheme(createTheme(theme));
  }, [theme]);

  // If user is known, fetch courses
  useEffect(() => {
    // if (user?.id) {
    getCourses();
    // }
  }, [getCourses]);

  // Update navigation once we have user and navigation data
  useEffect(() => {
    if (navigation && currentCourse?.id) {
      setCurrentNavigation(addActions(addIcons(navigation), user?.role || ''));
    }
  }, [navigation, user, currentCourse]);

  useEffect(() => {
    const messageHandler = async (event: MessageEvent) => {
      const { url } = event.data;
      if (url) {
        setParentUrl(url);
        setCurrentCourseUrl(url);

        if (!user?.id) {
          try {
            await getCourseByUrl(url);
          } catch (error) {
            console.error('Failed to fetch course by URL:', error);
          }
        }
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [user, getCourseByUrl, setCurrentCourseUrl]);

  // After user returns from authentication and we have a user logged in, restore their location
  useEffect(() => {
    if (user?.id) {
      const returnLocation = localStorage.getItem('returnLocation');
      if (returnLocation) {
        localStorage.removeItem('returnLocation');
        window.location.href = returnLocation;
      }
    }
  }, [user, router]);

  const handleLogin = () => {
    const current = window?.top || window;
    setLoggingIn(true);
    // Store current location before leaving
    localStorage.setItem('returnLocation', parentUrl || window.location.href);

    // Check if the current course has an LTI login URL
    const loginUrl = currentCourse?.ltiLoginUrl;

    if (loginUrl) {
      current.location.href = loginUrl;
    } else {
      if (!currentCourse?.id) {
        addNotificationData({
          type: 'error',
          message:
            'Failed to login. Please select a course first so that the login URL can be retrieved.',
        });
      } else {
        // Inform the user that the login URL is not available
        addNotificationData({
          type: 'error',
          message: 'Login is not available. Please contact the course staff.',
        });
      }
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
      addNotificationData({
        type: 'error',
        message: 'Failed to logout. Please try again.',
      });
    }
  };

  const session: Session = {
    user: (user?.id && user) || undefined,
  };

  return (
    <SnackbarProvider maxSnack={6} autoHideDuration={10000}>
      <AppProvider
        branding={{
          logo: <Logo />,
          title: '',
        }}
        navigation={(currentCourse && currentNavigation) || []}
        theme={lmsTheme}
        router={router as Router}
        session={session}
        authentication={{
          signIn: handleLogin,
          signOut: handleLogout,
        }}>
        <DashboardLayout
          maxWidth={true}
          slots={{
            toolbarAccount: ToolbarAccount,
            toolbarActions: CustomActions,
            sidebarFooter: SidebarFooter,
          }}>
          <SizableContentHeader />

          {children}
          <Dialogs />
          <Notifications />
        </DashboardLayout>
      </AppProvider>
    </SnackbarProvider>
  );
};

export default LMSProvider;
