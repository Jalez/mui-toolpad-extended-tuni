/** @format */
import React, { useEffect, useState } from "react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import Mindmap from "./index";
import { NavigationSectionBuilder } from "../../Navigation/NavigationBuilder";
import { useNavigationStore } from "../../Navigation/store/useNavigationStore";
import { addSectionProps } from "../../Navigation/store/useNavigationStore";

/**
 * @deprecated Use Grid-based navigation instead. This component is kept for backward compatibility.
 *
 * MindmapNavigationBuilder adds the Mindmap tool to navigation.
 * Will be replaced by the Grid-based navigation approach where widget presence
 * in the Grid layout determines navigation visibility.
 */
export const MindmapNavigationBuilder: React.FC = () => {
  // Use state to prevent re-renders during navigation checks
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const { sections } = useNavigationStore();

  // Check if a grid-based mindmap widget is already in navigation
  // only once after component mounts
  useEffect(() => {
    // Check for Mindmap in any section
    const hasMindmapInWidgets = Object.values(sections).some((section) =>
      Object.keys(section.pages).includes("mindmap")
    );

    if (hasMindmapInWidgets) {
      setShouldRender(false);
    }
  }, []); // Empty deps array ensures this runs only once on mount

  if (!shouldRender) {
    return null;
  }

  // Define navigation configuration
  // const navigationSections: addSectionProps[] = [
  //   {
  //     pages: [
  //       {
  //         segment: "mindmap",
  //         title: "Mindmap",
  //         Icon: PsychologyIcon,
  //         description: "Mindmap to visualize your learning journey",
  //         microservices: [],
  //       },
  //     ],
  //     underHeader: "Tools",
  //   },
  // ];

  // return <NavigationSectionBuilder sections={navigationSections} />;
};
