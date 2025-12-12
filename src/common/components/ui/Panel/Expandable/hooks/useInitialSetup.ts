import { useEffect, useState } from "react";
import { Position, PanelRef } from "../../types";

export const useInitialSetup = (
  expandedPanelId: string | null,
  id: string,
  panelRef: PanelRef,
  setExtendedStyle: (style: React.CSSProperties) => void
) => {
  const [readyForExpansion, setReadyForExpansion] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  // Exact effect from original code
  useEffect(() => {
    const currentTop = panelRef.current?.offsetTop || 0;
    const currentLeft = panelRef.current?.offsetLeft || 0;

    if (expandedPanelId) {
      requestAnimationFrame(() => {
        setInitialPosition({
          top: currentTop,
          left: currentLeft,
        });

        if (expandedPanelId === id) setReadyForExpansion(true);
        else setExtendedStyle({ height: 0 });
      });
    }
  }, [expandedPanelId, id, panelRef, setExtendedStyle]);

  return {
    readyForExpansion,
    setReadyForExpansion,
    initialPosition,
  };
};
