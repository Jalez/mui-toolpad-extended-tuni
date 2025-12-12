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
import CourseRoutesProvider from "./components/Courses/CourseRoutesProvider";

import Dialogs from "./components/Dialogs/Dialogs";
import { useThemeStore } from "./store/useThemeStore";
import { createTheme, Theme, useTheme, ThemeProvider, CssBaseline } from "@mui/material";
import RegisteredAppTools from "./layout/Toolbars/AppToolbar/RegisteredAppTools";
import PageContent from "./layout/Content/PageContent";
import { UserManager } from "./components/UserManager";

import { HeaderWithPageRegistryToolbar } from "./layout/Toolbars/PageToolbar/RegisteredPageTools";
import { PageContainer } from "@toolpad/core";
import { useMicroserviceNavigation } from "./components/Navigation/hooks/useMicroserviceNavigation";
import { GridItemProvider } from "../common/components/layout/GridLayout/GridItemContext";
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
  const { getTheme, colorSchemePreference } = useThemeStore();
  const [lmsTheme, setLmsTheme] = useState<Theme>(() => {
    const theme = getTheme();
    const currentMode = theme?.defaultColorScheme || 'light';
    const colorScheme = theme?.colorSchemes?.[currentMode];

    if (!colorScheme) {
      console.error('No initial color scheme found for mode:', currentMode);
      return createTheme();
    }

    return createTheme({
      palette: {
        ...colorScheme.palette,
        mode: currentMode,
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

  // Update theme when color scheme preference changes
  useEffect(() => {
    const theme = getTheme();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LMSProvider.tsx:99',message:'Theme store changed',data:{defaultColorScheme:theme?.defaultColorScheme,darkBackgroundDefault:theme?.colorSchemes?.dark?.palette?.background?.default,lightBackgroundDefault:theme?.colorSchemes?.light?.palette?.background?.default},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    console.log('Theme changed in LMSProvider:', theme);
    const currentMode = theme?.defaultColorScheme || 'light';
    const colorScheme = theme?.colorSchemes?.[currentMode];

    if (!colorScheme) {
      console.error('No color scheme found for mode:', currentMode);
      return;
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LMSProvider.tsx:108',message:'Creating theme with colorScheme',data:{currentMode,backgroundDefault:colorScheme.palette.background.default,backgroundPaper:colorScheme.palette.background.paper},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    const newTheme = createTheme({
      palette: {
        ...colorScheme.palette,
        mode: currentMode,
      },
      typography: theme.typography,
      shape: theme.shape,
      spacing: theme.spacing,
      breakpoints: theme.breakpoints,
      components: theme.components,
      transitions: theme.transitions,
      zIndex: theme.zIndex,
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LMSProvider.tsx:121',message:'New theme created',data:{mode:newTheme.palette?.mode,backgroundDefault:newTheme.palette?.background?.default,backgroundPaper:newTheme.palette?.background?.paper},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    console.log('New MUI theme created:', newTheme.palette?.mode);
    setLmsTheme(newTheme);
  }, [colorSchemePreference, getTheme]);

  // Update body/html background and data attribute when theme changes
  useEffect(() => {
    const bgColor = lmsTheme.palette.background.default;
    const mode = lmsTheme.palette.mode || 'light';
    
    // Update data attributes to keep in sync
    document.documentElement.setAttribute('data-mui-color-scheme', mode);
    document.documentElement.setAttribute('data-color-scheme', mode);
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LMSProvider.tsx:127',message:'Before setting DOM backgrounds',data:{bgColor,mode,bodyComputed:window.getComputedStyle(document.body).backgroundColor,htmlComputed:window.getComputedStyle(document.documentElement).backgroundColor,rootComputed:document.getElementById('root')?window.getComputedStyle(document.getElementById('root')!).backgroundColor:'not found'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = bgColor;
    }
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LMSProvider.tsx:134',message:'After setting DOM backgrounds',data:{bgColor,mode,bodyComputed:window.getComputedStyle(document.body).backgroundColor,htmlComputed:window.getComputedStyle(document.documentElement).backgroundColor,rootComputed:document.getElementById('root')?window.getComputedStyle(document.getElementById('root')!).backgroundColor:'not found',bodyInline:document.body.style.backgroundColor,htmlInline:document.documentElement.style.backgroundColor},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
  }, [lmsTheme]);

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

  // Check computed styles after render
  useEffect(() => {
    const checkStyles = () => {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
      const rootBg = document.getElementById('root') ? window.getComputedStyle(document.getElementById('root')!).backgroundColor : 'not found';
      const dashboardLayout = document.querySelector('[data-testid="dashboard-layout"]');
      const dashboardBg = dashboardLayout ? window.getComputedStyle(dashboardLayout as Element).backgroundColor : 'not found';
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'LMSProvider.tsx:182',message:'Computed styles check',data:{themeBackgroundDefault:lmsTheme.palette.background.default,bodyComputed:bodyBg,htmlComputed:htmlBg,rootComputed:rootBg,dashboardLayoutComputed:dashboardBg,bodyInline:document.body.style.backgroundColor,htmlInline:document.documentElement.style.backgroundColor},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
    };
    
    // Check immediately and after a short delay
    checkStyles();
    const timeout = setTimeout(checkStyles, 100);
    return () => clearTimeout(timeout);
  }, [lmsTheme]);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <SnackbarProvider maxSnack={6} autoHideDuration={10000}>
        <GridItemProvider>
          <ThemeProvider theme={lmsTheme}>
            <CssBaseline />
  
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
            <CourseRoutesProvider />
            <CalendarManager />
            <CalendarEventAggregator />
            <DashboardLayout
            data-testid="dashboard-layout"
            // border={false}

            sx={{
              // #region agent log
              // Logging background color value
              // #endregion
              bgcolor: "background.default",
              "& .MuiDrawer-paper": {
                borderRight: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
                // Style all Typography elements in the drawer to respect theme
                "& .MuiTypography-root": {
                  color: "text.primary",
                },
                "& .MuiTypography-caption": {
                  color: "text.secondary",
                },
                // Style headers in the drawer
                "& .MuiListSubheader-root": {
                  color: "text.primary",
                  bgcolor: "transparent",
                },
                // Style ListItemButton text (non-selected)
                "& .MuiListItemButton-root:not(.Mui-selected)": {
                  "& .MuiTypography-root": {
                    color: "text.primary",
                  },
                  "& .MuiTypography-caption": {
                    color: "text.secondary",
                  },
                },
                // Selected items should have white text in dark mode, primary color in light mode
                "& .MuiListItemButton-root.Mui-selected": {
                  color: (theme) => (theme as Theme).palette.mode === 'dark' ? 'white' : (theme as Theme).palette.primary.main,
                  "& .MuiTypography-root": {
                    color: (theme) => (theme as Theme).palette.mode === 'dark' ? 'white !important' : `${(theme as Theme).palette.primary.main} !important`,
                  },
                  "& .MuiTypography-caption": {
                    color: (theme) => (theme as Theme).palette.mode === 'dark' ? 'white !important' : `${(theme as Theme).palette.primary.main} !important`,
                  },
                },
              },
              // Also style modal drawers (when drawer is opened on mobile/tablet)
              "& .MuiDrawer-root.MuiDrawer-modal .MuiDrawer-paper": {
                borderRight: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
                "& .MuiTypography-root": {
                  color: "text.primary",
                },
                "& .MuiTypography-caption": {
                  color: "text.secondary",
                },
                "& .MuiListSubheader-root": {
                  color: "text.primary",
                  bgcolor: "transparent",
                },
                "& .MuiListItemButton-root:not(.Mui-selected)": {
                  "& .MuiTypography-root": {
                    color: "text.primary",
                  },
                  "& .MuiTypography-caption": {
                    color: "text.secondary",
                  },
                },
                "& .MuiListItemButton-root.Mui-selected": {
                  color: (theme) => (theme as Theme).palette.mode === 'dark' ? 'white' : (theme as Theme).palette.primary.main,
                  "& .MuiTypography-root": {
                    color: (theme) => (theme as Theme).palette.mode === 'dark' ? 'white !important' : `${(theme as Theme).palette.primary.main} !important`,
                  },
                  "& .MuiTypography-caption": {
                    color: (theme) => (theme as Theme).palette.mode === 'dark' ? 'white !important' : `${(theme as Theme).palette.primary.main} !important`,
                  },
                },
              },
              "& .MuiAppBar-root": {
                borderColor: "divider",
                bgcolor: "background.default",
            
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
                marginLeft: 2,
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
