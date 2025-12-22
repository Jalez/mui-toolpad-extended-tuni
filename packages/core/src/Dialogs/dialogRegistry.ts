/** @format */

const dialogRegistry = new Map<string, React.ComponentType>();

export function registerDialog(
  dialogId: string,
  Component: React.ComponentType
) {
  dialogRegistry.set(dialogId, Component);
}

export function getDialog(dialogId: string) {
  return dialogRegistry.get(dialogId);
}

export function openDialog(_dialogId: string) {
  // This is a placeholder - actual implementation should be provided by the consuming application
  // using a dialog store
  console.warn('openDialog called but no dialog store is configured. Please use a dialog store from the main package.');
}

export function closeDialog() {
  // This is a placeholder - actual implementation should be provided by the consuming application
  // using a dialog store
  console.warn('closeDialog called but no dialog store is configured. Please use a dialog store from the main package.');
}
