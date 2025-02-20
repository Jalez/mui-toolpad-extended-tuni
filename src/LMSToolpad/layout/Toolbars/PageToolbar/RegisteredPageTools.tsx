/** @format */

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { PageHeader, PageHeaderToolbar, useActivePage } from "@toolpad/core";
import useToolbarStore from "../../../store/useToolbarStore";
import {
  useToolbarStore as useToolbarRegistry,
  getPageToolbarActions,
} from "../toolbarRegistry";

/**
 * PageToolbar Component
 *
 * @version 3.0.0
 *
 * A dynamic toolbar component that renders actions based on the current route.
 * Automatically updates when actions are registered or unregistered.
 *
 * Features:
 * - Route-based action rendering
 * - Dynamic action registration/unregistration
 * - Automatic re-rendering on changes
 * - Support for custom toolbar overrides
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
 * ```
 */
const RegisteredPageTools = () => {
  const location = useLocation();
  const { currentToolbar } = useToolbarStore();
  // Subscribe to version changes to trigger re-renders
  const version = useToolbarRegistry((state) => state.version);

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
        {actions.map((Action, index) => (
          <Action key={`${version}-${index}`} />
        ))}
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
