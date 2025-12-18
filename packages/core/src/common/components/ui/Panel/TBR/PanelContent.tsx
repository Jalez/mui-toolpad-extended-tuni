/** @format */

import { IconButton } from "@mui/material";
import { ToolsContainerWrapper } from "../Main/tools/ToolsContainer";
import InternalScrolling from "../Scrollable/InternalScrolling";
import BlurOverlay from "../Main/tools/BlurOverlay";
import ResizeIndicator from "./ResizeIndicator";
import ResizeHandlers from "./ResizeHandlers";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

interface PanelContentProps {
  children:
    | React.ReactNode
    | ((dimensions: { width: number; height: number }) => React.ReactNode);
  dimensions: { width: number; height: number };
  isDragging: { vertical: boolean; horizontal: boolean };
  isExpanded: boolean;
  expandable?: boolean;
  tools?: React.ReactNode;
  resizeMode?: boolean;
  handleMouseDown: (
    direction: "vertical" | "horizontal" | "corner"
  ) => (e: React.MouseEvent | React.TouchEvent) => void;
  handleTouchStart: (
    direction: "vertical" | "horizontal" | "corner"
  ) => (e: React.MouseEvent | React.TouchEvent) => void;
  toggleExpand: () => void;
}

const PanelContent = ({
  children,
  dimensions,
  isDragging,
  isExpanded,
  expandable,
  tools,
  resizeMode,
  handleMouseDown,
  toggleExpand,
}: PanelContentProps) => (
  <>
    {(tools || expandable) && (
      <ToolsContainerWrapper position="bottom-right">
        <>
          {tools}
          {expandable && (
            <IconButton onClick={toggleExpand} size="small">
              {isExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
            </IconButton>
          )}
        </>
      </ToolsContainerWrapper>
    )}

    <InternalScrolling dimensions={dimensions} isExpanded={isExpanded}>
      {typeof children === "function" ? children(dimensions) : children}
    </InternalScrolling>

    {(isDragging.vertical || isDragging.horizontal) && (
      <BlurOverlay>
        <ResizeIndicator isResizing={isDragging.vertical || isDragging.horizontal} />
      </BlurOverlay>
    )}

    {resizeMode && (
      <ResizeHandlers
        isResizing={isDragging.vertical || isDragging.horizontal}
        onResizeStart={(direction) => {
          // Handle both mouse and touch events
          const handler = handleMouseDown(direction as "vertical" | "horizontal" | "corner");
          return handler;
        }}
      />
    )}
  </>
);

export default PanelContent;
