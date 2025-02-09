/** @format */

const ORDER_KEY_PREFIX = 'movable-panel-order-';

export function loadPanelOrder(id: string, defaultOrder: number[]): number[] {
  try {
    const stored = localStorage.getItem(ORDER_KEY_PREFIX + id);
    return stored ? JSON.parse(stored) : defaultOrder;
  } catch {
    return defaultOrder;
  }
}

export function savePanelOrder(id: string, order: number[]) {
  try {
    localStorage.setItem(ORDER_KEY_PREFIX + id, JSON.stringify(order));
  } catch (error) {
    console.warn('Failed to save panel order:', error);
  }
}
