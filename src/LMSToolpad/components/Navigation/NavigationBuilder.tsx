/** @format */
import { useEffect } from "react";
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

  useEffect(() => {
    registerAppToolbarAction("global", NavigationFilter);
    return () => {
      unregisterAppToolbarAction("global", NavigationFilter);
    };
  }, []);

  useEffect(() => {
    // For each provided section, add it to the navigation store.
    sections.forEach((section) => {
      addSection(section);
    });
    // After all sections are added, recalculate the flat navigation array.
    recalculateNavigation();
  }, [sections, addSection, recalculateNavigation]);

  return null;
};
