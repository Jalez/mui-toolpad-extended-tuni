/**
 * Hook that provides a simplified interface for managing navigation sections.
 * Abstracts away the complexity of the navigation store and filter store interaction.
 *
 * @returns {Object} Section management functions
 * @property {Function} addDynamicSection - Adds or updates a section in navigation
 */

import { useCallback } from "react";
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
  const { addSection, recalculateNavigation } = useNavigationStore();
  const { setFilterOptions } = useNavigationFilterStore();

  const addDynamicSection = useCallback(
    (section: DynamicSection) => {
      if (section.keepVisible) {
        setFilterOptions((prev) => ({
          ...prev,
          [section.header]: true,
        }));
      }

      addSection({
        underHeader: section.header,
        pages: section.pages || [],
      });

      recalculateNavigation();
    },
    [addSection, setFilterOptions, recalculateNavigation]
  );

  return { addDynamicSection };
};
