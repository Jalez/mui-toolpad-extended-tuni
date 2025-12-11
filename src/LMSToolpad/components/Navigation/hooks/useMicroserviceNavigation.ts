/** @format */
import { useEffect } from "react";
import { useNavigationStore } from "../store/useNavigationStore";
import { useNavigationFilterStore } from "../store/useNavigationFilterStore";
import {
  getAllMicroservices,
  useMicroserviceRegistryStore,
} from "../NavigationRegistry";

/**
 * Hook that maintains persistent navigation entries for microservices.
 */
export const useMicroserviceNavigation = () => {
  const { addSection, recalculateNavigation, setVisibleSections } = useNavigationStore();
  const { setFilterOptions, initializeFilters } = useNavigationFilterStore();
  const { lastUpdate } = useMicroserviceRegistryStore();

  useEffect(() => {
    // Get all registered microservices
    const microservices = getAllMicroservices();
    const sections: Record<
      string,
      Array<{
        segment: string;
        title: string;
        Icon?: any;
        description?: string;
      }>
    > = {};

    // Group microservices by category
    microservices.forEach((microservice, id) => {
      const category = microservice.category || "Microservices";
      if (!sections[category]) {
        sections[category] = [];
      }

      sections[category].push({
        segment: id,
        title: microservice.name,
        Icon: microservice.iconComponent,
        description: microservice.description,
      });

      // Set visibility if specified in metadata
      if (microservice.metadata?.keepVisible) {
        setFilterOptions((prev) => ({
          ...prev,
          [category]: true,
        }));
      }
    });

    // Register each section
    Object.entries(sections).forEach(([category, pages]) => {
      addSection({
        underHeader: category,
        pages,
      });
    });

    // Initialize filters for all sections and recalculate navigation
    initializeFilters();
    // Sync visibleSections with filterOptions after initialization
    const updatedFilters = useNavigationFilterStore.getState().filterOptions;
    setVisibleSections(updatedFilters);
    recalculateNavigation();
  }, [lastUpdate, setVisibleSections]); // Re-run when microservices are registered/unregistered

  return null;
};
