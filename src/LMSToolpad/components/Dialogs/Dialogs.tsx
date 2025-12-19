/** @format */

import useDialogStore from '../../store/useDialogStore';
import PlatformSettings from '../../Forms/PlatformSettings/PlatformSettings';
import { getDialog, registerDialog } from './dialogRegistry';

// Register PlatformSettings dialog (part of main package)
// CourseSettings and UserSettings are registered by their respective packages when imported
registerDialog('PlatformSettings', PlatformSettings);
const Dialogs = () => {
  const { openDialog } = useDialogStore();
  if (!openDialog) return null;
  const DialogComponent = getDialog(openDialog);
  if (!DialogComponent) return null;

  return <DialogComponent />;
};

export default Dialogs;
