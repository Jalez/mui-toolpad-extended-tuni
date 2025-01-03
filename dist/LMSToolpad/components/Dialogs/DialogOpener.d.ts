/** @format */
import { dialogType } from '../../store/useDialogStore';
type DialogOpenerProps = {
    title: string;
    dialogId: dialogType;
    callOnOpen?: (event: React.MouseEvent<HTMLButtonElement | HTMLElement>) => void;
    showTitle?: boolean;
};
declare const DialogOpener: ({ title, dialogId, callOnOpen, showTitle, }: DialogOpenerProps) => import("react/jsx-runtime").JSX.Element;
export default DialogOpener;
