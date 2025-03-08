/** @format */
import { useCallback, useRef, useState } from "react";
import type { Viewport, Node } from "reactflow";
import { useReactFlow } from "reactflow";
import { useMindmapStore } from "../store";

// Debounce utility function
function debounce<F extends (...args: any[]) => any>(fn: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  } as F;
}

interface ViewportManagerResult {
  handleViewportChange: (viewport: Viewport) => void;
  handleWheel: (event: React.WheelEvent) => void;
  centerOnNode: (node: Node) => void;
  initializeViewport: (nodes: Node[]) => void;
  initialRender: boolean;
  viewport: Viewport;
}

export function useViewportManager(
  flowWrapperRef: React.RefObject<HTMLDivElement | null>
): ViewportManagerResult {
  const { viewport, setViewport, selectedNodeId } = useMindmapStore();
  const reactFlowInstance = useReactFlow();
  const [initialRender, setInitialRender] = useState(true);
  const initialViewportSet = useRef(false);

  // Handle viewport change with debounce to avoid too many updates
  const handleViewportChange = useCallback(
    debounce((viewport: Viewport) => {
      if (!initialRender) {
        setViewport(viewport);
      }
    }, 200),
    [setViewport, initialRender]
  );

  // Better wheel handling for zoom
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      // Check if ctrl/cmd key is pressed for zoom behavior
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();

        // Get the current viewport
        const { zoom, x, y } = reactFlowInstance.getViewport();

        // Calculate the position where the mouse is pointing in the viewport
        const rect = event.currentTarget.getBoundingClientRect();
        const clientX = event.clientX - rect.left;
        const clientY = event.clientY - rect.top;

        // Calculate the point in the canvas where the mouse is
        const pointInCanvas = {
          x: (clientX - x) / zoom,
          y: (clientY - y) / zoom,
        };

        // Calculate new zoom level
        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(4, Math.max(0.1, zoom * zoomFactor));

        // Calculate new position to keep the point under the mouse
        const newX = clientX - pointInCanvas.x * newZoom;
        const newY = clientY - pointInCanvas.y * newZoom;

        const newViewport: Viewport = { x: newX, y: newY, zoom: newZoom };

        // Set the new viewport
        reactFlowInstance.setViewport(newViewport, { duration: 0 });

        // Update the viewport in store for persistence
        setViewport(newViewport);
      } else {
        // Regular scrolling behavior - pan vertically
        const { zoom, x, y } = reactFlowInstance.getViewport();
        const newViewport: Viewport = { x, y: y - event.deltaY, zoom };
        reactFlowInstance.setViewport(newViewport, { duration: 0 });
        setViewport(newViewport);
      }
    },
    [reactFlowInstance, setViewport]
  );

  // Center viewport on a specific node
  const centerOnNode = useCallback(
    (node: Node) => {
      if (!flowWrapperRef.current) return;

      const flowWrapperWidth = flowWrapperRef.current.offsetWidth || 0;
      const flowWrapperHeight = flowWrapperRef.current.offsetHeight || 0;

      // Position node at 1/3 of screen height for better visibility
      const verticalOffset = flowWrapperHeight * 0.33;

      // Set viewport directly for smoother transition
      const currentZoom = reactFlowInstance.getZoom();
      const newViewport: Viewport = {
        x: -(node.position.x * currentZoom) + flowWrapperWidth / 2,
        y: -(node.position.y * currentZoom) + verticalOffset,
        zoom: currentZoom,
      };

      // Use a single smooth transition
      reactFlowInstance.setViewport(newViewport, { duration: 600 });
      setViewport(newViewport);
    },
    [reactFlowInstance, flowWrapperRef, setViewport]
  );

  // Setup initial viewport on component mount
  const initializeViewport = useCallback(
    (nodes: Node[]) => {
      if (
        initialRender &&
        !initialViewportSet.current &&
        flowWrapperRef.current
      ) {
        if (selectedNodeId) {
          const selectedNode = nodes.find((node) => node.id === selectedNodeId);
          if (selectedNode) {
            const flowWrapperWidth = flowWrapperRef.current.offsetWidth || 0;
            const flowWrapperHeight = flowWrapperRef.current.offsetHeight || 0;

            // Adjust vertical positioning to ensure node is fully visible
            // Position the node at about 1/3 of the viewport height from the top
            const verticalOffset = flowWrapperHeight * 0.33;

            // Calculate zoom based on container size for better initial view
            const zoom = Math.min(1.5, Math.max(0.8, flowWrapperHeight / 700));

            // Calculate viewport position to center the node
            const newViewport: Viewport = {
              x: -(selectedNode.position.x * zoom) + flowWrapperWidth / 2,
              y: -(selectedNode.position.y * zoom) + verticalOffset,
              zoom: zoom,
            };

            reactFlowInstance.setViewport(newViewport, { duration: 0 });
            setViewport(newViewport);
          }
        } else {
          // If no selected node, just set the stored viewport
          reactFlowInstance.setViewport(viewport, { duration: 0 });
        }
        initialViewportSet.current = true;
        setInitialRender(false);
      }
    },
    [
      initialRender,
      viewport,
      selectedNodeId,
      reactFlowInstance,
      setViewport,
      flowWrapperRef,
    ]
  );

  return {
    handleViewportChange,
    handleWheel,
    centerOnNode,
    initializeViewport,
    initialRender,
    viewport,
  };
}
