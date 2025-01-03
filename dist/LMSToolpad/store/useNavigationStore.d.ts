/** @format */
import { SvgIconComponent } from '@mui/icons-material';
interface NavigationItemBase {
    kind: 'header' | 'page';
    title: string;
    actionFC?: React.FC;
}
export interface ToolMetadata {
    description?: string;
    forRoles?: string[];
    isRootTool?: boolean;
}
export interface NavigationHeaderItem extends NavigationItemBase {
    kind: 'header';
}
export interface NavigationPageStoreItem extends NavigationItemBase {
    kind: 'page';
    segment: string;
    iconFC?: SvgIconComponent;
    icon?: JSX.Element;
    children?: NavigationPageStoreItem[];
    action?: JSX.Element;
    metadata?: ToolMetadata;
}
export type NavigationStoreItem = NavigationHeaderItem | NavigationPageStoreItem;
export declare const useNavigationStore: any;
export declare const filterNavigationByRole: (role: string) => NavigationStoreItem[];
export {};
