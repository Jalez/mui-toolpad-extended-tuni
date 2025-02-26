/** @format */

import React from "react";
import { Box, useTheme } from "@mui/material";

import {
  PanelProps,
  PanelProvider,
  usePanelContext,
} from "./Context/PanelContextProvider";

import { ExpandableContextProvider } from "../Expandable/context/ExpandableContextProvider";
import Scrollable from "../Scrollable/Scrollable";
import Expandable from "../Expandable/Expandable";
import Resizable from "../Resizable/Resizable";
import { ToolsContainerWrapper } from "./tools/ToolsContainer";

import { usePanelStore } from "./store/usePanelStore";
import {
  ResizableContextProvider,
  useResizableContext,
} from "../Resizable/Context/ResizableContextProvider";

const PanelContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { resizeMode } = usePanelStore();
  const {
    id,
    tools,
    expandable,
    dimensions,
    extendedStyle,
    panelRef,
    resizable,
    scrollable,
  } = usePanelContext();
  return (
    <Box
      data-panel-id={id}
      ref={panelRef}
      sx={{
        position: "relative",
        boxSizing: "border-box",
        maxWidth: "100%",
        // Zero height only for collapsed panels, not for all non-expanded panels
        height: dimensions.height,
        width: dimensions.width + 25,
        backgroundColor: theme.palette.background.default,
        borderRadius: 1,
        outline: resizeMode
          ? `0.1em dashed ${theme.palette.primary.main}`
          : "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        // transition: "all 0.3s ease-in-out",
        willChange: "width, height, margin, position, top, left",
        ...extendedStyle,
      }}
    >
      {tools && (
        <ToolsContainerWrapper key="tools" position="bottom-right">
          {tools}
        </ToolsContainerWrapper>
      )}
      {resizable && <Resizable key="resizable" />}
      {expandable && <Expandable key="expandable" />}
      {scrollable ? (
        <Scrollable key="scrollable">{children}</Scrollable>
      ) : (
        React.Children.map(children, (child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                key: child.key || `panel-child-${index}`,
              })
            : child
        )
      )}
    </Box>
  );
};

export const Panel = (props: PanelProps) => {
  return (
    <PanelProvider {...props}>
      <ResizableContextProvider>
        <ExpandableContextProvider>
          <PanelContainer>{props.children}</PanelContainer>
        </ExpandableContextProvider>
      </ResizableContextProvider>
    </PanelProvider>
  );
};

export default Panel;
