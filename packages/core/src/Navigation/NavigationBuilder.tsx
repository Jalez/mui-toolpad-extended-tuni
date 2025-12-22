/** @format */
import { useEffect, useMemo, useRef } from "react";
import { addSectionProps } from "./store/types";
import { useNavigationStore } from "./store/useNavigationStore";
// Toolbar registry functions should be provided by the consuming application
// These are placeholders that can be overridden
let registerAppToolbarActionImpl: ((id: string, component: React.ComponentType) => void) | null = null;
let unregisterAppToolbarActionImpl: ((id: string, component: React.ComponentType) => void) | null = null;

export function setToolbarRegistryFunctions(
  register: (id: string, component: React.ComponentType) => void,
  unregister: (id: string, component: React.ComponentType) => void
) {
  registerAppToolbarActionImpl = register;
  unregisterAppToolbarActionImpl = unregister;
}

function registerAppToolbarAction(id: string, component: React.ComponentType) {
  if (registerAppToolbarActionImpl) {
    registerAppToolbarActionImpl(id, component);
  }
}

function unregisterAppToolbarAction(id: string, component: React.ComponentType) {
  if (unregisterAppToolbarActionImpl) {
    unregisterAppToolbarActionImpl(id, component);
  }
}
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
