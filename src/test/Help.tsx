/** @format */
import HelpIcon from "@mui/icons-material/Help";
import { useEffect } from "react";
import {
  registerMicroservice,
  unregisterMicroservice,
} from "../LMSToolpad/components/Navigation/NavigationRegistry";

/**
 * Help App-Level Microservice
 *
 * This is an app-level microservice that provides help and documentation.
 * Registers itself with the NavigationRegistry for routing and navigation.
 */
const Help = () => {
  useEffect(() => {    
    // Register the microservice with route and navigation
    registerMicroservice(
      "help",
      HelpView,
      {
        name: "Help",
        description: "Help and documentation",
        iconComponent: HelpIcon,
        category: "Other",
        metadata: {
          showInNavigation: true,
          route: {
            path: "help",
          },
        },
      }
    );

    return () => {
      unregisterMicroservice("help");
    };
  }, []);

  return <></>;
};

/**
 * Help view component
 */
const HelpView = () => {
  return (
    <div>
      <h1>Help</h1>
      <p>Help and documentation</p>
    </div>
  );
};

export default Help;

