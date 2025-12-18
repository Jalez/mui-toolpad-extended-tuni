import { useEffect } from "react";
import { usePanelContext } from "../../Main/Context/PanelContextProvider";

export const useResizeHandler = (isExpanded: boolean) => {
  const { setExtendedStyle, panelRef, handleDimensionsChange } =
    usePanelContext();
  useEffect(() => {
    if (!isExpanded || !panelRef.current) return;
    const parent = panelRef.current.offsetParent as HTMLElement;
    if (!parent) return;

    const updateExpandedStyle = () => {
      // Handler for resize events
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedUpdate = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateExpandedStyle, 250);
    };

    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      clearTimeout(resizeTimer);
    };
  }, [isExpanded, panelRef, setExtendedStyle, handleDimensionsChange]);
};
