/** @format */
import { useEffect, useMemo } from "react";
import {
  useNavigationStore,
  addSectionProps,
} from "./store/useNavigationStore";
import {
  registerAppToolbarAction,
  unregisterAppToolbarAction,
} from "../../layout/Toolbars/toolbarRegistry";
import { NavigationFilter } from "./NavigationFilter";

type NavigationSectionBuilderProps = {
  sections: addSectionProps[];
};

export const NavigationSectionBuilder: React.FC<
  NavigationSectionBuilderProps
> = ({ sections }) => {
  const { addSection, recalculateNavigation } = useNavigationStore();

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

  useEffect(() => {
    registerAppToolbarAction("global", NavigationFilter);
    return () => {
      unregisterAppToolbarAction("global", NavigationFilter);
    };
  }, []);

  useEffect(() => {
    memoizedSections.forEach((section) => {
      addSection(section);
    });
    recalculateNavigation();
  }, [memoizedSections, addSection, recalculateNavigation]);

  return null;
};
