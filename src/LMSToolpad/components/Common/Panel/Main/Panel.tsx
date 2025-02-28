/** @format */

import React from "react";
import { Box, useTheme } from "@mui/material";

import {
  PanelProps,
  PanelProvider,
  usePanelContext,
} from "./Context/PanelContextProvider";

import { usePanelStore } from "../../GridLayout/store/usePanelStore";

import { ToolsContainerWrapper } from "./tools/ToolsContainer";
import Scrollable from "../Scrollable/Scrollable";
import Expandable from "../Expandable/Expandable";
import Resizable from "../Resizable/Resizable";

import { ExpandableContextProvider } from "../Expandable/context/ExpandableContextProvider";
import { ResizableContextProvider } from "../Resizable/Context/ResizableContextProvider";

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
    panelContentRef,
    resizable,
    scrollable,
    extendedContainerStyle,
  } = usePanelContext();

  return (
    <Box
      data-panel-id={id}
      ref={panelRef}
      data-testid="panel-container"
      sx={{
        boxSizing: "border-box",
        maxWidth: "100%",
        height: dimensions.height,
        width: dimensions.width + 25,
        outline: resizeMode
          ? `0.1em dashed ${theme.palette.primary.main}`
          : "none",
        ...extendedContainerStyle,
      }}
    >
      <Box
        data-testid="panel-content"
        ref={panelContentRef}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          borderRadius: 1,
          transition: "all 0.3s ease-in-out",

          position: "absolute",
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
