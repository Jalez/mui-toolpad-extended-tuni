import { NavigationStoreItem, NavigationPageStoreItem } from "../../store/useNavigationStore";
import ActionFCWrapper from "./utils/ActionFCWrapper";

/**
 * Processes a single navigation item
 */
const processNavItem = (
  item: NavigationStoreItem,
  role: string,
): NavigationStoreItem => {
  if (item.kind !== "page") return item;

  // Process children recursively, ensuring only page items are included
  const children = item.children?.map((child) =>
    processNavItem(child, role)
  ).filter((child): child is NavigationPageStoreItem => child.kind === "page");

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
  navItems: NavigationStoreItem[],
  role: string,
): NavigationStoreItem[] => navItems.map((item) => processNavItem(item, role));
