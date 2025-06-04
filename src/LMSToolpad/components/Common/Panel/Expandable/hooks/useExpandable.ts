/** @format */

import { useState, useCallback } from "react";

interface UseExpandableOptions {
  initialExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

interface UseExpandableReturn {
  isExpanded: boolean;
  toggle: () => void;
  expand: () => void;
  collapse: () => void;
}

/**
 * Hook for managing expandable panel state
 */
export const useExpandable = ({
  initialExpanded = false,
  onExpand,
  onCollapse,
}: UseExpandableOptions = {}): UseExpandableReturn => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const expand = useCallback(() => {
    setIsExpanded(true);
    onExpand?.();
  }, [onExpand]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    onCollapse?.();
  }, [onCollapse]);

  const toggle = useCallback(() => {
    if (isExpanded) {
      collapse();
    } else {
      expand();
    }
  }, [isExpanded, expand, collapse]);

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
  };
};
