/** @format */
import { useEffect } from "react";
import { usePanelContext } from "../Main/Context/PanelContextProvider";
import InternalScrolling from "./InternalScrolling";
import { useScrollContext } from "./context/ScrollerContextProvider";

interface ScrollableProps {
  children: React.ReactNode;
}

const Scrollable = ({ children }: ScrollableProps) => {
  const { panelRef, dimensions } = usePanelContext();
  const { setItemCounts } = useScrollContext();

  // Update item counts
  useEffect(() => {
    if (!panelRef.current) return;

    const actualWidth = panelRef.current.offsetWidth;
    const horizontalItemsVisible = Math.max(
      1,
      Math.floor(actualWidth / dimensions.width)
    );
    const verticalItemsVisible = Math.floor(
      dimensions.height / dimensions.height
    );

    setItemCounts({
      horizontal: horizontalItemsVisible,
      vertical: verticalItemsVisible,
    });
  }, [dimensions, panelRef, setItemCounts]);

  return (
    <InternalScrolling dimensions={dimensions}>{children}</InternalScrolling>
  );
};

export default Scrollable;
