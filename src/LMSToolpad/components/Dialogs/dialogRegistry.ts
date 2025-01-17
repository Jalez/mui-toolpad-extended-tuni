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
