/** @format */

import { getDialog } from './dialogRegistry';

// Dialog store should be provided by the consuming application
// This component accepts the current dialog ID as a prop
type DialogsProps = {
  openDialog?: string | null;
};

const Dialogs = ({ openDialog }: DialogsProps) => {
  if (!openDialog) return null;
  const DialogComponent = getDialog(openDialog);
  if (!DialogComponent) return null;

  return <DialogComponent />;
};

export default Dialogs;
