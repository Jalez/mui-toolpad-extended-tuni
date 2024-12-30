/** @format */

import { ReactElement } from 'react';
import { SvgIconComponent } from '@mui/icons-material';

declare module '@toolpad/core' {
  export interface NavigationStoreItem {
    icon: ReactElement;
    children?: NavigationStoreItem[];
    kind: string;
    segment: string;
    iconFC?: SvgIconComponent;
    action?: ReactElement;
    metadata?: Record<string, unknown>;
    title: string;
    actionFC?: React.FC;
  }

  export interface NavigationPageStoreItem extends NavigationStoreItem {
    kind: 'page';
  }

  export interface NavigationHeaderItem extends NavigationStoreItem {
    kind: 'header';
  }
}
