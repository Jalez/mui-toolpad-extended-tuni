/** @format */
import React, { useMemo, useEffect } from "react";
import PsychologyIcon from '@mui/icons-material/Psychology';
import { NavigationSectionBuilder } from "../../../Navigation/NavigationBuilder";
import Mindmap from "./index";
import { NavigationPageStoreItem, useNavigationStore } from "../../../Navigation/store/useNavigationStore";

export const MindmapNavigationBuilder: React.FC = () => {

  const { addStandaloneNavigation } = useNavigationStore();
useEffect(() => {
  addStandaloneNavigation(mindMapNavigation);
}, []);
const mindMapNavigation: NavigationPageStoreItem = {
  kind: "page",
  segment: "mindmap",
  title: "Mindmap",
  iconFC: PsychologyIcon,
  view: Mindmap,
  metadata: {
    description: "Mindmap to visualize your learning journey",
    forRoles: ["teacher", "student"],
    isRootTool: true,
  },
}
  const sections = useMemo(() => [{
    pages: [{
      segment: "mindmap",
      title: "Mindmap",
      Icon: PsychologyIcon,
      description: "Mindmap to visualize your learning journey",
      microservices: [],
    }],
    underHeader: "Tools"
  }], []); // Empty dependency array since sections never change

  return <NavigationSectionBuilder sections={sections} />;
};


