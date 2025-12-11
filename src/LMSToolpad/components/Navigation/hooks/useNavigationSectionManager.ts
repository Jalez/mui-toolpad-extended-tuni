/**
 * Hook that provides a simplified interface for managing navigation sections.
 * Abstracts away the complexity of the navigation store and filter store interaction.
 *
 * @returns {Object} Section management functions
 * @property {Function} addDynamicSection - Adds or updates a section in navigation
 */

import { useCallback, useEffect } from "react";
import { useNavigationStore } from "../store/useNavigationStore";
import { useNavigationFilterStore } from "../store/useNavigationFilterStore";

interface DynamicSection {
  header: string;
  keepVisible?: boolean;
  pages?: Array<{
    segment: string;
    title: string;
    Icon?: any;
    description?: string;
    instances?: string[];
    microservices?: string[];
  }>;
}

export const useNavigationSectionManager = () => {
  const { addSection, recalculateNavigation, sectionOrder, setVisibleSections } =
    useNavigationStore();
  const { setFilterOptions, initializeFilters } = useNavigationFilterStore();

  // Initialize filters whenever sections change
  useEffect(() => {
    if (sectionOrder.length > 0) {
      initializeFilters();
      // Sync visibleSections with filterOptions after initialization
      const updatedFilters = useNavigationFilterStore.getState().filterOptions;
      setVisibleSections(updatedFilters);
      recalculateNavigation();
    }
  }, [sectionOrder, initializeFilters, recalculateNavigation, setVisibleSections]);

  const addDynamicSection = useCallback(
    (section: DynamicSection) => {
      // Add section first - this will set visibleSections if keepVisible is true
      addSection({
        underHeader: section.header,
        keepVisible: section.keepVisible,
        pages: section.pages || [],
      });

      // Also update filterOptions to keep them in sync
      if (section.keepVisible) {
        setFilterOptions((prev) => ({
          ...prev,
          [section.header]: true,
        }));
      }

      // Note: recalculateNavigation is called automatically by addSection
      // when visibleSections is updated, so we don't need to call it here
    },
    [addSection, setFilterOptions]
  );

  return { addDynamicSection };
};
