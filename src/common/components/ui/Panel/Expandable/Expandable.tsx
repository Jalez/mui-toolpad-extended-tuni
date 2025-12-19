/** @format */

import { IconButton } from "@mui/material";
import { useEffect } from "react";

import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { usePanelStore } from "../../../layout/GridLayout/store/usePanelStore";
import { usePanelContext } from "../Main/Context/PanelContextProvider";
import { useExpandablePanelStore } from "./store/useExpandablePanelStore";
import { useExpandableContext } from "./context/ExpandableContextProvider";
import { useInitialSetup } from "./hooks/useInitialSetup";
import { useExpansionAnimation } from "./hooks/useExpansionAnimation";
import { useCollapseHandler } from "./hooks/useCollapseHandler";
import { useResizeHandler } from "./hooks/useResizeHandler";
import { useMovableContext } from "../Movable/context/MovableContextProvider";

const Expandable = () => {
  const { expandedPanelId } = useExpandablePanelStore();

  const { parentRef } = useMovableContext();
  const { setExtendedStyle, setExtendedContainerStyle, panelRef, addTool, id } =
    usePanelContext();
  const { isExpanded, setIsExpanded } = useExpandableContext();

  // Use the initialSetup hook
  const { readyForExpansion, setReadyForExpansion } =
    useInitialSetup(expandedPanelId, id, panelRef, setExtendedStyle);

  // Use the expansionAnimation hook
  useExpansionAnimation(
    readyForExpansion,
    panelRef,
    parentRef,
    setExtendedStyle,
    setExtendedContainerStyle,
    setIsExpanded,
    setReadyForExpansion
  );
  // Use the collapseHandler hook
  useCollapseHandler(
    isExpanded,
    expandedPanelId,
    id,
    panelRef,
    setExtendedStyle,
    setExtendedContainerStyle,
    setIsExpanded
  );

  // Use the resizeHandler hook
  useResizeHandler(isExpanded);

  // Add tool only once on mount
  useEffect(() => {
    const toolInstance = <ExpandTool />;
    addTool(toolInstance);
  }, []); // Empty dependency array ensures this runs once

  return null;
};

export const ExpandTool = () => {
  const { id } = usePanelContext();
  const { isExpanded } = useExpandableContext();
  const { resizeMode } = usePanelStore();
  const { setExpandedPanelId } = useExpandablePanelStore();

  const handleToggleExpand = () => {
    if (!isExpanded) {
      setExpandedPanelId(id);
    } else {
      setExpandedPanelId(null);
    }
  };

  return (
    <IconButton disabled={resizeMode} onClick={handleToggleExpand} size="small">
      {isExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
    </IconButton>
  );
};

export default Expandable;
