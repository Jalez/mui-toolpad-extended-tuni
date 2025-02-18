/** @format */
import { ReactFlowProvider } from "reactflow";
import { MindmapContent } from "./MindmapContent";
import { useSetSnapDimensions } from "../../../Common/Panel/Resizable/Context/ResizeContext";
import { useLayoutEffect } from "react";

function Mindmap() {


  return (
    <ReactFlowProvider>
      <MindmapContent />
    </ReactFlowProvider>
  );
}

export const ResizeContextMindmap = () => {
  const setSnapDimensions = useSetSnapDimensions();

  // Match these with the ResizablePanel constraints
  const itemReelHeight = 200;
  const itemReelWidth = 300; // Set to minWidth to prevent going smaller

  useLayoutEffect(() => {
    // Save current dimensions respecting panel constraints
    const savedWidth = Math.max(300, Math.min(1200, itemReelWidth));
    setSnapDimensions({
      width: savedWidth,
      height: itemReelHeight,
    });
  }, [itemReelWidth, itemReelHeight, setSnapDimensions]);
  return <Mindmap/>;
}

export default Mindmap;
