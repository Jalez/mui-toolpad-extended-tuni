/** @format */
import { ReactFlowProvider } from "@xyflow/react";
import { MindmapContent } from "./MindmapContent/MindmapContent";
import { useLayoutEffect } from "react";
import { usePanelContext } from "../../Common/Panel/Main/Context/PanelContextProvider";

// Constants for panel dimensions
const PANEL_DIMENSIONS = {
  MIN_WIDTH: 400,
  MAX_WIDTH: 1200,
  DEFAULT_WIDTH: 600,
  MIN_HEIGHT: 500,
} as const;

const Mindmap = () => (
  <ReactFlowProvider>
    <MindmapContent />
  </ReactFlowProvider>
);

export const ContextMindmap = () => {
  const { setDimensions } = usePanelContext();

  useLayoutEffect(() => {
    const width = Math.max(
      PANEL_DIMENSIONS.MIN_WIDTH,
      Math.min(PANEL_DIMENSIONS.MAX_WIDTH, PANEL_DIMENSIONS.DEFAULT_WIDTH)
    );

    setDimensions({
      width,
      height: PANEL_DIMENSIONS.MIN_HEIGHT,
    });
  }, [setDimensions]);

  return <Mindmap />;
};

export default Mindmap;
