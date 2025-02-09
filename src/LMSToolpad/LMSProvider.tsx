/** @format */

import { ReactNode, useEffect, useState, useMemo } from "react";
import { DashboardLayout, Router, Session } from "@toolpad/core";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { useNavigationStore } from "./components/Navigation/store/useNavigationStore";
import { useUserStore } from "./store/useUserStore";
import useCustomRouter from "./hooks/useCustomRouter";
import { addIcons } from "./components/tools/addIcons";
import { addActions } from "./components/tools/addActions";
import Notifications from "./components/Notifications/Notifications";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { Logo } from "./layout/Toolbars/AppToolbar/Logo";
import { ToolbarAccount } from "./layout/Toolbars/AppToolbar/Account";
import { PageToolbar } from "./layout/Toolbars/PageToolbar/PageToolbar";
import SidebarFooter from "./layout/sidebar/Footer";
import AuthenticationManager from "./components/AuthenticationManager";
import CourseManager from "./components/Courses/CourseManager";

import Dialogs from "./components/Dialogs/Dialogs";
import { useThemeStore } from "./store/useThemeStore";
import { createTheme, Theme } from "@mui/material";
import RegisteredAppTools from "./layout/Toolbars/AppToolbar/RegisteredAppTools";
import PageContent from "./layout/Content/PageContent";
import { UserManager } from "./components/UserManager";

export interface EduMLProviderProps {
  children?: ReactNode;
}

/**
 * LMSProvider Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Complete architectural restructuring for better separation of concerns
 * - Removed direct course management (now handled by CourseManager)
 * - Simplified authentication handling (now handled by AuthenticationManager)
 * - Improved theme management with consistent application
 * - Enhanced layout structure with PageContent and PageToolbar components
 * - Removed direct message handling (now managed by respective components)
 *
 * Main application provider that sets up:
 * - Authentication context
 * - Theme provider
 * - Navigation structure
 * - Basic app layout
 * - Router integration
 *
 * @example
 * ```tsx
 * <BrowserRouter>
 *   <LMSProvider>
 *     <YourApp />
 *   </LMSProvider>
 * </BrowserRouter>
 * ```
 */
const LMSProvider = ({ children }: EduMLProviderProps) => {
  const { user, getUser, logout } = useUserStore();
  const { navigation } = useNavigationStore();
  const router = useCustomRouter();
  const { theme } = useThemeStore();
  const [lmsTheme, setLmsTheme] = useState<Theme>(createTheme(theme as any));

  // Update theme when it changes
  useEffect(() => {
    setLmsTheme(createTheme(theme as any));
  }, [theme]);

  // Create session data for Toolpad
  const userSessionData = user?.id
    ? {
        id: user.id,
        name: user.name,
        image:
          user.image?.thumbnail ||
          user.image?.medium ||
          user.image?.large ||
          "",
        email: user.email,
      }
    : undefined;

  const session: Session = {
    user: userSessionData,
  };

  // Add authentication handlers
  const authentication = useMemo(
    () => ({
      signIn: async () => {
        await getUser();
      },
      signOut: async () => {
        await logout();
      },
    }),
    [getUser, logout]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <SnackbarProvider maxSnack={6} autoHideDuration={10000}>
        <AppProvider
          branding={{
            logo: <Logo />,
            title: "",
          }}
          navigation={addActions(addIcons(navigation))}
          theme={lmsTheme}
          router={router as Router}
          session={session}
          authentication={authentication}
        >
          <AuthenticationManager />
          <UserManager />
          <CourseManager />
          <DashboardLayout
            data-testid="dashboard-layout"
            border={false}
            sx={{
              "& .MuiListItemIcon-root": {
                paddingRight: "20px" + "!important",
              },
              bgcolor: "background.paper",
              "& .MuiDrawer-paper": {
                border: 0,
              },
              "& .MuiAppBar-root": {
                borderBottom: 0,
              },
              "& .MuiContainer-root": {
                display: "flex",
                flexDirection: "column",
                padding: 0,
                margin: 0,
                width: "100%",
                maxWidth: "100%",
              },
              "& .MuiContainer-maxWidthLg": {
                padding: 0,
                margin: 0,
                width: "100%",
                paddingLeft: 1,
              },
            }}
            defaultSidebarCollapsed={true}
            maxWidth={true}
            slots={{
              toolbarAccount: ToolbarAccount,
              toolbarActions: RegisteredAppTools,
              sidebarFooter: SidebarFooter,
            }}
          >
            <PageToolbar />
            <PageContent>{children}</PageContent>
            <Dialogs />
            <Notifications />
          </DashboardLayout>
        </AppProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
};

export default LMSProvider;
