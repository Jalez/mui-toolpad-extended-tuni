/** @format */

import { create } from 'zustand';

export type NotificationRaw = {
  type: string;
  message: string;
  singular?: boolean; // Add this field
  singularId?: string; // Add this field
};

export type Notification = {
  type: string;
  message: string;
  id: string;
  singular?: boolean;
  singularId?: string;
};

type NotificationStore = {
  notifications: Notification[] | [];
  addNotificationData: (notificationData: NotificationRaw) => void;
  removeNotificationData: (notificationId: number) => void;
  clearNotificationsByType: (type: string) => void;
};

// Helper function to check if a notification should be shown
const shouldShowNotification = (singularId?: string): boolean => {
  if (!singularId) return true;
  const key = `notification_shown_${singularId}`;
  if (localStorage.getItem(key)) {
    return false;
  }
  localStorage.setItem(key, 'true');
  return true;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotificationData: (notificationData: NotificationRaw) => {
    // Check if we should show this notification
    if (
      notificationData.singular &&
      !shouldShowNotification(notificationData.singularId)
    ) {
      return;
    }

    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notificationData, id: `${Date.now() * Math.random()}` },
      ],
    }));
  },
  removeNotificationData: (notificationId: number) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== `${notificationId}`
      ),
    }));
  },
  clearNotificationsByType: (type: string) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.type !== type
      ),
    }));
  },
}));
