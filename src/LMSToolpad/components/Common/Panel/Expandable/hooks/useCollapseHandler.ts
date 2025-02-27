import { useEffect } from "react";
import { Position, PanelRef } from "../../types";

export const useCollapseHandler = (
  isExpanded: boolean,
  expandedPanelId: string | null,
  id: string,
  panelRef: PanelRef,
  initialPosition: Position,
  setExtendedStyle: (style: React.CSSProperties) => void,
  setExtendedContainerStyle: (style: React.CSSProperties) => void,
  setIsExpanded: (expanded: boolean) => void
) => {
  useEffect(() => {
    if (isExpanded && expandedPanelId === null && panelRef.current) {
      // Start collapse animation
      requestAnimationFrame(() => {
        // First reset container to full size
        setExtendedContainerStyle({ position: "relative" });

        // Then animate content back to original position
        setExtendedStyle({
          position: "absolute",
          transition: "all 0.3s ease-in-out",
        });

        // After animation completes
        const timeoutId = setTimeout(() => {
          setExtendedStyle({}); // Remove all extended styles
          setIsExpanded(false);
        }, 300);

        return () => clearTimeout(timeoutId);
      });
    } else if (!isExpanded && expandedPanelId === null) {
      // Reset styles immediately if not expanded
      setExtendedStyle({});
      setExtendedContainerStyle({ position: "relative" });
    }
  }, [
    expandedPanelId,
    id,
    isExpanded,
    setExtendedStyle,
    setExtendedContainerStyle,
    setIsExpanded,
  ]);
};
