/** @format */

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { PageHeader, PageHeaderToolbar, useActivePage } from "@toolpad/core";
import useToolbarStore from "../../../store/useToolbarStore";
import {
  useToolbarRegistryStore,
  getPageToolbarActions,
  ToolbarEntry,
} from "../toolbarRegistry";

/**
 * PageToolbar Component
 *
 * @version 3.1.0
 *
 * A dynamic toolbar component that renders actions based on the current route.
 * Automatically updates when actions are registered or unregistered.
 *
 * Features:
 * - Route-based action rendering
 * - Dynamic action registration/unregistration
 * - Automatic re-rendering on changes
 * - Support for custom toolbar overrides
 * - Support for passing props to toolbar components
 *
 * @example
 * ```tsx
 * // In your app layout
 * <AppLayout>
 *   <PageToolbar />
 *   {children}
 * </AppLayout>
 *
 * // Register actions in your components
 * useEffect(() => {
 *   registerToolbarAction('/my-route', MyAction);
 *   return () => unregisterToolbarAction('/my-route', MyAction);
 * }, []);
 *
 * // Register with props
 * registerPageToolbarAction('/my-route', MyAction, { data: 'some-data' });
 * ```
 */
const RegisteredPageTools = () => {
  const location = useLocation();
  const { currentToolbar } = useToolbarStore();
  // Subscribe to version changes to trigger re-renders
  const { version } = useToolbarRegistryStore();

  const actions = currentToolbar
    ? getPageToolbarActions(currentToolbar)
    : getPageToolbarActions(location.pathname);

  if (!actions.length) return null;

  return (
    <PageHeaderToolbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
          gap: 1,
          width: "100%",
          paddingRight: 2,
          //when scrolled, leave them at the top
          position: "sticky",
          bgcolor: "transparent",
        }}
      >
        {actions.map((entry: ToolbarEntry, index) => {
          const { Component, props } = entry;
          // Render with props if available, otherwise render without props
          return <Component key={`${version}-${index}`} {...(props || {})} />;
        })}
      </Box>
    </PageHeaderToolbar>
  );
};

export const HeaderWithPageRegistryToolbar = () => {
  const activePage = useActivePage();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  let breadcrumbs = activePage?.breadcrumbs || [];
  if (isSmallScreen) {
    breadcrumbs = activePage?.breadcrumbs?.slice(-2) || [];
  }

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title=""
      slots={{ toolbar: RegisteredPageTools }}
    />
  );
};

export default RegisteredPageTools;
