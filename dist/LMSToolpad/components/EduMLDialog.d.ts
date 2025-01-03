/** @format */
import { ReactNode } from 'react';
type EduMLDialogProps = {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
};
declare const EduMLDialog: ({ children, open, onClose, ...dialogProps }: EduMLDialogProps) => import("react/jsx-runtime").JSX.Element;
export default EduMLDialog;
