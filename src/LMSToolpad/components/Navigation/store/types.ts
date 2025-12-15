/** @format */

import { SvgIconComponent } from "@mui/icons-material";
import React from "react";

// Base interface for common properties
export interface NavigationItemBase {
  kind: "header" | "page" | "divider";
  title?: string;
  actionFC?: React.FC;
}

export interface ToolMetadata {
  description?: string;
  forRoles?: string[];
  isRootTool?: boolean;
  underHeader?: string;
  microservices?: string[];
}

export interface NavigationHeaderItem extends NavigationItemBase {
  kind: "header";
  title: string;
}

export interface NavigationDividerItem extends NavigationItemBase {
  kind: "divider";
}

export interface NavigationPageStoreItem extends NavigationItemBase {
  kind: "page";
  segment: string;
  iconFC?: SvgIconComponent;
  icon?: React.ReactElement;
  children?: NavigationPageStoreItem[];
  view?: React.ComponentType;
  action?: React.ReactElement;
  showTitle?: boolean;
  metadata?: ToolMetadata;
}

export type NavigationStoreItem =
  | NavigationHeaderItem
  | NavigationPageStoreItem
  | NavigationDividerItem;

/**
 * Updated addSectionProps type.
 * Now you provide a header (underHeader) and an array of page configs.
 */
export type addSectionProps = {
  underHeader: string;
  keepVisible?: boolean;
  pages: Array<{
    segment: string;
    title: string;
    Icon?: SvgIconComponent;
    description?: string;
    instances?: string[];
    microservices?: string[];
    actionFC?: React.FC;
  }>;
};

/**
 * New interface for a navigation section.
 * Each section is keyed by its header (or unique id) and contains:
 *  - header: the header item (NavigationHeaderItem)
 *  - pages: a dictionary of pages keyed by their segment
 *  - pageOrder: an array of page keys (segments) to preserve ordering
 */
export interface NavigationSection {
  header: NavigationHeaderItem;
  pages: Record<string, NavigationPageStoreItem>;
  pageOrder: string[];
}

export type ViewStore = {
  // Final flat navigation array (for rendering)
  navigation: NavigationStoreItem[];
  // Segmented store: sections keyed by header string
  sections: Record<string, NavigationSection>;
  // Array maintaining the order of sections
  sectionOrder: string[];
  /**
   * App-level microservice navigation items only.
   * These are typically registered via NavigationRegistry for app-level routes.
   */
  allMicroserviceNavigation: NavigationPageStoreItem[];
  addSection: (props: addSectionProps) => void;
  removeHeader: (header: string) => void;
  addMicroserviceNavigation: (
    microserviceNavigation: NavigationPageStoreItem
  ) => void;
  addStandaloneNavigation: (navigation: NavigationPageStoreItem) => void;
  updateMicroserviceNavigationForSections: () => void;
  recalculateNavigation: () => void;
  // New: visibleSections state to track which sections are shown
  visibleSections: Record<string, boolean>;
  // New: setter for visibleSections
  setVisibleSections: (options: Record<string, boolean>) => void;
  // New: collapsedSections state to track which sections are collapsed (show only icon)
  collapsedSections: Record<string, boolean>;
  // New: setter for collapsedSections
  setCollapsedSections: (options: Record<string, boolean>) => void;
  // New: toggle section collapse state
  toggleSectionCollapse: (sectionKey: string) => void;
  /**
   * Externally registered microservice navigation items.
   * These are provided by external components (like CourseMicroservice) via setExternalMicroservices.
   * The store is microservice-agnostic - it doesn't know or care about specific microservice types.
   */
  externalMicroservices: NavigationPageStoreItem[];
  // Setter for external microservices (called by external components like CourseMicroservice)
  setExternalMicroservices: (microservices: NavigationPageStoreItem[]) => void;
};
