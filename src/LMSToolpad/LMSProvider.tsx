/** @format */

import { ReactNode, useEffect, useState, useMemo } from "react";
import { AppProvider, DashboardLayout, Router, Session } from "@toolpad/core";
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
import SidebarFooter from "./layout/sidebar/Footer";
import AuthenticationManager from "./components/AuthenticationManager";
import CourseManager from "./components/Courses/CourseManager";

import Dialogs from "./components/Dialogs/Dialogs";
import { useThemeStore } from "./store/useThemeStore";
import { createTheme, Theme, useTheme, ThemeProvider } from "@mui/material";
import RegisteredAppTools from "./layout/Toolbars/AppToolbar/RegisteredAppTools";
import PageContent from "./layout/Content/PageContent";
import { UserManager } from "./components/UserManager";

import { HeaderWithPageRegistryToolbar } from "./layout/Toolbars/PageToolbar/RegisteredPageTools";
import { PageContainer } from "@toolpad/core";
import { useMicroserviceNavigation } from "./components/Navigation/hooks/useMicroserviceNavigation";
import { GridItemProvider } from "./components/Common/GridLayout/GridItemContext";
import { CalendarManager, CalendarEventAggregator } from "./components/Calendar";

export interface LMSProviderProps {
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
const LMSProvider: React.FC<LMSProviderProps> = ({ children }) => {
  const { user, getUser, logout } = useUserStore();
  const { navigation } = useNavigationStore();
  const router = useCustomRouter();
  const themeUsed = useTheme();
  const { theme } = useThemeStore();
  const [lmsTheme, setLmsTheme] = useState<Theme>(() => {
    const currentMode = theme?.defaultColorScheme || 'light';
    const colorScheme = theme?.colorSchemes?.[currentMode];

    if (!colorScheme) {
      console.error('No initial color scheme found for mode:', currentMode);
      return createTheme();
    }

    return createTheme({
      palette: {
        mode: currentMode,
        ...colorScheme.palette,
      },
      typography: theme.typography,
      shape: theme.shape,
      spacing: theme.spacing,
      breakpoints: theme.breakpoints,
      components: theme.components,
      transitions: theme.transitions,
      zIndex: theme.zIndex,
    });
  });

  // Update theme when it changes
  useEffect(() => {
    console.log('Theme changed in LMSProvider:', theme);
    const currentMode = theme?.defaultColorScheme || 'light';
    const colorScheme = theme?.colorSchemes?.[currentMode];

    if (!colorScheme) {
      console.error('No color scheme found for mode:', currentMode);
      return;
    }

    const newTheme = createTheme({
      palette: {
        mode: currentMode,
        ...colorScheme.palette,
      },
      typography: theme.typography,
      shape: theme.shape,
      spacing: theme.spacing,
      breakpoints: theme.breakpoints,
      components: theme.components,
      transitions: theme.transitions,
      zIndex: theme.zIndex,
    });
    console.log('New MUI theme created:', newTheme.palette?.mode);
    setLmsTheme(newTheme);
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

  useMicroserviceNavigation(); // Add persistent microservice navigation

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <SnackbarProvider maxSnack={6} autoHideDuration={10000}>
        <GridItemProvider>
          <ThemeProvider theme={lmsTheme}>
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
            <CalendarManager />
            <CalendarEventAggregator />
            <DashboardLayout
            data-testid="dashboard-layout"
            // border={false}

            sx={{
          
              bgcolor: "background.paper",
              "& .MuiDrawer-paper": {
                border: 0, // No border on the drawer
              },
              "& .MuiAppBar-root": {
                borderBottom: 0, // No border on the app bar
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
                // paddingLeft: 1,
              },
              "& nav.MuiBox-root": {
                margin: 0,
                overflowY: "auto",
                overflowX: "hidden",
                scrollbarWidth: "thin",
                scrollbarColor: "transparent transparent",
                //Make scrollbars opacity 0
                "&:hover": {
                  //Give the scrollbars theme color on hover, not transparent
                  scrollbarColor:
                    themeUsed.palette.divider +
                    " " +
                    themeUsed.palette.background.paper,
                },
              },
            }}
            defaultSidebarCollapsed={true}
            // maxWidth={true}
            slots={{
              toolbarAccount: ToolbarAccount,
              toolbarActions: RegisteredAppTools,
              sidebarFooter: SidebarFooter,
            }}
          >
            <PageContainer slots={{ header: HeaderWithPageRegistryToolbar }}>
              <PageContent>{children}</PageContent>
            </PageContainer>
            <Dialogs />
            <Notifications />
            </DashboardLayout>
            </AppProvider>
          </ThemeProvider>
        </GridItemProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
};

export default LMSProvider;
