import {
  NavigationStoreItem,
  NavigationPageStoreItem,
} from "../Navigation/store/useNavigationStore";
import ActionFCWrapper from "./utils/ActionFCWrapper";

/**
 * Processes a single navigation item
 */
const processNavItem = (item: NavigationStoreItem): NavigationStoreItem => {
  if (item.kind !== "page") return item;

  // Process children recursively, ensuring only page items are included
  const children = item.children
    ?.map((child) => processNavItem(child))
    .filter((child): child is NavigationPageStoreItem => child.kind === "page");

  // Create action from actionFC if present
  if (item?.actionFC) {
    return {
      ...item,
      action: <ActionFCWrapper ActionHandler={item.actionFC} props={{}} />,
      children,
    };
  }

  // If no actionFC, only process children
  return { ...item, children };
};

/**
 * Adds actions to navigation items based on their actionHandlers
 */
export const addActions = (
  navItems: NavigationStoreItem[]
): NavigationStoreItem[] => navItems.map((item) => processNavItem(item));
