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

  // Memoize sections to prevent unnecessary re-renders
  const memoizedSections = useMemo(() => sections, [JSON.stringify(sections)]);

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
