/** @format */
import { SxProps, Theme } from '@mui/material/styles';
type IconWithBadgeProps = {
    Icon: React.FC;
    size: number;
    title: string;
    sx?: SxProps<Theme>;
};
declare const IconWithBadge: ({ Icon, size, title, sx }: IconWithBadgeProps) => import("react/jsx-runtime").JSX.Element;
export default IconWithBadge;
