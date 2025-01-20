/** @format */

import useDialogStore from '../../store/useDialogStore';
import CourseSettings from '../../Forms/CourseSettings/CourseSettings';
import PlatformSettings from '../../Forms/PlatformSettings/PlatformSettings';
import { getDialog, registerDialog } from './dialogRegistry';
import UserSettings from '../../Forms/UserSettings/UserSettings';

// Register the dialogs once, outside any components
registerDialog('CourseSettings', CourseSettings);
registerDialog('PlatformSettings', PlatformSettings);
registerDialog('UserSettings', UserSettings);
const Dialogs = () => {
  const { openDialog } = useDialogStore();
  if (!openDialog) return null;
  console.log('Dialogs -> openDialog', openDialog);

  const DialogComponent = getDialog(openDialog);
  if (!DialogComponent) return null;

  return <DialogComponent />;
};

export default Dialogs;
