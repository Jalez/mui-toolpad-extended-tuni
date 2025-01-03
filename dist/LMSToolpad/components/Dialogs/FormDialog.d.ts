/** @format */
interface FormDialogProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    children: React.ReactNode;
    submitText?: string;
    disableSubmit?: boolean;
}
declare const FormDialog: React.FC<FormDialogProps>;
export default FormDialog;
