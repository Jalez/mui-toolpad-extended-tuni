/** @format */
import { useEffect } from "react";
import { usePanelContext } from "../Main/Context/PanelContextProvider";
import InternalScrolling from "./InternalScrolling";
import { useScrollContext } from "./context/ScrollerContextProvider";
import { useExpandableContext } from "../Expandable/context/ExpandableContextProvider";

interface ScrollableProps {
  children: React.ReactNode;
}

const Scrollable = ({ children }: ScrollableProps) => {
  const { panelContentRef, dimensions, panelRef } = usePanelContext();
  const { setItemCounts } = useScrollContext();
  const { isExpanded } = useExpandableContext();

  // useEffect(() => {
  //   if (!isExpanded || !panelContentRef.current) return;
  //   const parent = panelContentRef.current.offsetParent as HTMLElement;
  //   if (!parent) return;

  //   // const updateExpandedStyle = () => {
  //   //   console.log("CALLED");
  //   // };
  //   const updateItemCounts = () => {
  //     const actualWidth = panelContentRef.current.offsetWidth;
  //     const horizontalItemsVisible = Math.max(
  //       1,
  //       Math.floor(actualWidth / dimensions.width)
  //     );
  //     const verticalItemsVisible = Math.floor(
  //       dimensions.height / dimensions.height
  //     );

  //     setItemCounts({
  //       horizontal: horizontalItemsVisible,
  //       vertical: verticalItemsVisible,
  //     });
  //   };

  //   let resizeTimer: ReturnType<typeof setTimeout>;
  //   const debouncedUpdate = () => {
  //     clearTimeout(resizeTimer);
  //     resizeTimer = setTimeout(updateItemCounts, 250);
  //   };

  //   window.addEventListener("resize", debouncedUpdate);
  //   return () => {
  //     window.removeEventListener("resize", debouncedUpdate);
  //     clearTimeout(resizeTimer);
  //   };
  // }, [isExpanded, panelRef]);

  // Update item counts
  useEffect(() => {
    if (!panelRef.current || !panelContentRef.current) return;

    const updateItemCounts = (pR: React.RefObject<HTMLDivElement>) => {
      const actualWidth = pR.current.offsetWidth;
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
    };

    updateItemCounts(panelContentRef as React.RefObject<HTMLDivElement>);
  }, [dimensions, panelRef, setItemCounts]);

  return (
    <InternalScrolling dimensions={dimensions}>{children}</InternalScrolling>
  );
};

export default Scrollable;
