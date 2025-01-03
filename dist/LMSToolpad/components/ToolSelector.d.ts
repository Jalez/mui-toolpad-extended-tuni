import { NavigationPageStoreItem } from '../store/useNavigationStore';
export type ToolSelectorItem = {
    path: string;
    icon: JSX.Element;
    label: string;
    description: string;
    forRoles?: string[];
};
type ToolSelectorProps = {
    show: boolean;
    title: string;
    navigationItems?: ToolSelectorItem[];
    navItems?: NavigationPageStoreItem[];
    roleCheck?: boolean;
};
declare const ToolSelector: ({ show, title, navigationItems, navItems, roleCheck }: ToolSelectorProps) => import("react/jsx-runtime").JSX.Element;
export default ToolSelector;
