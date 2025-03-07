/** @format */
import { useEffect } from "react";
import { useNavigationStore } from "../store/useNavigationStore";
import { useNavigationFilterStore } from "../store/useNavigationFilterStore";
import {
  getAllWidgets,
  useWidgetRegistryStore,
} from "../../Common/GridLayout/WidgetRegistry";

/**
 * Hook that maintains persistent navigation entries for widgets.
 */
export const useWidgetNavigation = () => {
  const { addSection, recalculateNavigation } = useNavigationStore();
  const { setFilterOptions, initializeFilters } = useNavigationFilterStore();
  const { lastUpdate } = useWidgetRegistryStore();

  useEffect(() => {
    // Get all registered widgets
    const widgets = getAllWidgets();
    const sections: Record<
      string,
      Array<{
        segment: string;
        title: string;
        Icon?: any;
        description?: string;
      }>
    > = {};

    // Group widgets by category
    widgets.forEach((widget, id) => {
      const category = widget.category || "Widgets";
      if (!sections[category]) {
        sections[category] = [];
      }

      sections[category].push({
        segment: id,
        title: widget.name,
        Icon: widget.iconComponent,
        description: widget.description,
      });

      // Set visibility if specified in metadata
      if (widget.metadata?.keepVisible) {
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
    recalculateNavigation();
  }, [lastUpdate]); // Re-run when widgets are registered/unregistered

  return null;
};
