/** @format */

import { ComponentType } from 'react';

const toolbarRegistry = new Map<string, ComponentType>();

export function registerToolbar(path: string, Component: ComponentType) {
  toolbarRegistry.set(path, Component);
}

export function getToolbar(path: string) {
  return toolbarRegistry.get(path);
}
