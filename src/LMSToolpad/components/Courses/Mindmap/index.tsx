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

  // Match these with the ResizablePanel constraints
  const itemReelHeight = 200;
  const itemReelWidth = 300; // Set to minWidth to prevent going smaller

  useLayoutEffect(() => {
    // Save current dimensions respecting panel constraints
    const savedWidth = Math.max(300, Math.min(1200, itemReelWidth));
    setDimensions({
      width: savedWidth,
      height: itemReelHeight,
    });
  }, [itemReelWidth, itemReelHeight, setDimensions]);
  return <Mindmap />;
};

export default Mindmap;
