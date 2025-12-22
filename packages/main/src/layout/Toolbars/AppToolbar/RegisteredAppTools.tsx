/** @format */

import { useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
  useToolbarRegistryStore,
  ToolbarEntry,
  getAppToolbarActions,
} from "../toolbarRegistry";
import { CollapsibleMenu } from "./CollapsibleMenu";

/**
 * A component that renders app toolbar actions registered under a fixed "global" key
 * or using location.pathname for route-specific app actions.
 *
 * @version 1.1.0
 * @updates
 * - Added support for passing props to toolbar components
 */
const RegisteredAppTools = () => {
  const location = useLocation();
  const { version } = useToolbarRegistryStore();

  useEffect(() => {
    registerAppToolbarAction("global", CollapsibleMenu);
    return () => {
      unregisterAppToolbarAction("global", CollapsibleMenu);
    };
  }, []);

  // Here we choose a fixed key "global" for app toolbar actions or use location.pathname
  const actions =
    getAppToolbarActions("global") || getAppToolbarActions(location.pathname);

  if (!actions.length) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 1,
        width: "100%",
        p: 1,
      }}
    >
      {actions.map((entry: ToolbarEntry, index) => {
        const { Component, props } = entry;
        // Render with props if available, otherwise render without props
        return <Component key={`${version}-${index}`} {...(props || {})} />;
      })}
    </Box>
  );
};

export default RegisteredAppTools;
