/** @format */
import { useEffect, useMemo, useRef } from "react";
import { addSectionProps } from "./store/types";
import { useNavigationStore } from "./store/useNavigationStore";
import {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
} from "../../layout/Toolbars/toolbarRegistry";
import { NavigationFilter } from "./NavigationFilter";
import { isEqual } from "lodash"; // Add lodash dependency for deep equality check

type NavigationSectionBuilderProps = {
  sections: addSectionProps[];
};

export const NavigationSectionBuilder: React.FC<
  NavigationSectionBuilderProps
> = ({ sections }) => {
  const { addSection, recalculateNavigation } = useNavigationStore();
  const prevSectionsRef = useRef<addSectionProps[]>([]);

  // Improved memoization that only considers necessary properties
  const memoizedSections = useMemo(
    () =>
      sections.map((section) => ({
        underHeader: section.underHeader,
        pages: section.pages.map((page) => ({
          segment: page.segment,
          title: page.title,
          Icon: page.Icon,
          instances: page.instances,
          description: page.description,
          microservices: page.microservices,
          actionFC: page.actionFC,
        })),
      })),
    [sections]
  );

  // Register filter in app toolbar
  useEffect(() => {
    registerAppToolbarAction("global", NavigationFilter);
    return () => {
      unregisterAppToolbarAction("global", NavigationFilter);
    };
  }, []);

  // Update navigation only when sections change
  useEffect(() => {
    // Skip if the sections are the same as before to prevent infinite loops
    if (isEqual(prevSectionsRef.current, memoizedSections)) {
      return;
    }

    // Update sections and recalculate navigation
    memoizedSections.forEach((section) => {
      addSection(section);
    });

    recalculateNavigation();

    // Save current sections for next comparison
    prevSectionsRef.current = memoizedSections;
  }, [memoizedSections, addSection, recalculateNavigation]);

  return null;
};
