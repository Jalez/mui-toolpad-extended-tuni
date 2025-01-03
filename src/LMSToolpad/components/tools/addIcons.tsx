import { NavigationStoreItem, NavigationPageStoreItem } from "../../store/useNavigationStore";
import IconWrapper from "./utils/IconFCWrapper";

export const addIcons = (navItems: NavigationStoreItem[]): NavigationStoreItem[] => {
  return navItems.map((item) => {
    if (item.kind === "page") {
      const icon = item.iconFC ? <IconWrapper IconFC={item.iconFC} /> : undefined;
      // Filter children to ensure they are only NavigationPageStoreItem
      const children = item.children
        ? addIcons(item.children).filter((child): child is NavigationPageStoreItem => 
            child.kind === "page"
          )
        : undefined;
      return { ...item, icon, children };
    }
    return item;
  });
};
