/** @format */

import { useEffect } from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
  useToolbarStore as useToolbarRegistry,
} from "../toolbarRegistry";
import { getAppToolbarActions } from "../toolbarRegistry";
import { CollapsibleMenu } from "./CollapsibleMenu";
// import { ThemeSwitcher } from "@toolpad/core";

// A simple AppToolbar rendering actions registered under a fixed "global" key,
// or you can use location.pathname for route-specific app actions.
const RegisteredAppTools = () => {
  const location = useLocation();
  const version = useToolbarRegistry((state) => state.version);

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
      {/* <ThemeSwitcher /> */}

      {actions.map((Action, index) => (
        <Action key={`${version}-${index}`} />
      ))}
    </Box>
  );
};

export default RegisteredAppTools;
