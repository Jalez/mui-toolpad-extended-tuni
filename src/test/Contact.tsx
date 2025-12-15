/** @format */
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { useEffect } from "react";
import {
  registerMicroservice,
  unregisterMicroservice,
} from "../LMSToolpad/components/Navigation/NavigationRegistry";

/**
 * Contact App-Level Microservice
 *
 * This is an app-level microservice that provides contact information.
 * Registers itself with the NavigationRegistry for routing and navigation.
 */
const Contact = () => {
  useEffect(() => {    
    // Register the microservice with route and navigation
    registerMicroservice(
      "contact",
      ContactView,
      {
        name: "Contact",
        description: "Contact information and support",
        iconComponent: ContactPageIcon,
        category: "Other",
        metadata: {
          showInNavigation: true,
          route: {
            path: "contact",
          },
        },
      }
    );

    return () => {
      unregisterMicroservice("contact");
    };
  }, []);

  return <></>;
};

/**
 * Contact view component
 */
const ContactView = () => {
  return (
    <div>
      <h1>Contact</h1>
      <p>Contact information and support</p>
    </div>
  );
};

export default Contact;
