/** @format */

import React from "react";
import LMSProvider from "./LMSProvider";

export interface EduMLProviderProps {
  children: React.ReactNode;
}

/**
 * Main provider component that wraps the entire application
 * with necessary context providers and theme configuration.
 */
const EduMLProvider: React.FC<EduMLProviderProps> = ({ children }) => {
  return <LMSProvider>{children}</LMSProvider>;
};

export default EduMLProvider;
