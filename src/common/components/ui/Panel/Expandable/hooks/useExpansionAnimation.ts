import { useEffect, useState } from "react";
import { PanelRef } from "../../types";

export const useExpansionAnimation = (
  readyForExpansion: boolean,
  panelRef: PanelRef,
  parentRef: PanelRef,
  setExtendedStyle: (style: React.CSSProperties) => void,
  setExtendedContainerStyle: (style: React.CSSProperties) => void,
  setIsExpanded: (expanded: boolean) => void,
  setReadyForExpansion: (ready: boolean) => void
) => {
  const [animateExpansion, setAnimateExpansion] = useState(false);

  // Prepare for animation
  useEffect(() => {
    if (readyForExpansion && panelRef.current && parentRef.current) {
      const timeoutId = setTimeout(() => {
        setAnimateExpansion(true);
        setReadyForExpansion(false);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [readyForExpansion, panelRef, parentRef, setReadyForExpansion]);

  // Handle animation
  useEffect(() => {
    if (animateExpansion && panelRef.current && parentRef.current) {
      requestAnimationFrame(() => {
        // Remove positioning from container
        setExtendedContainerStyle({ height: "0%" });
        setExtendedStyle({
          top: 0,
          left: 0,
          zIndex: 1000,
        });
        setIsExpanded(true);
        setAnimateExpansion(false);
      });
    }
  }, [
    animateExpansion,
    setExtendedStyle,
    setIsExpanded,
    panelRef,
    parentRef,
    setExtendedContainerStyle,
  ]);

  return { animateExpansion, setAnimateExpansion };
};
