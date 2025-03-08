/** @format */
import { ReactFlowProvider } from "reactflow";
import { MindmapContent } from "./MindmapContent";

import { useLayoutEffect } from "react";

import { usePanelContext } from "../../Common/Panel/Main/Context/PanelContextProvider";

function Mindmap() {
  return (
    <ReactFlowProvider>
      <MindmapContent />
    </ReactFlowProvider>
  );
}

export const ContextMindmap = () => {
  const { setDimensions } = usePanelContext();

  // Improved panel dimensions for better visibility
  const minHeight = 500; // Increased from 200 for better visibility
  const defaultWidth = 600; // Increased from 300 for better view

  useLayoutEffect(() => {
    // Save current dimensions respecting panel constraints
    const savedWidth = Math.max(400, Math.min(1200, defaultWidth));
    setDimensions({
      width: savedWidth,
      height: minHeight,
    });
  }, [defaultWidth, minHeight, setDimensions]);

  return <Mindmap />;
};

export default Mindmap;
