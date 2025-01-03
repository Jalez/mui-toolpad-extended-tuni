/** @format */
export type NotificationRaw = {
    type: string;
    message: string;
    singular?: boolean;
    singularId?: string;
};
export type Notification = {
    type: string;
    message: string;
    id: string;
    singular?: boolean;
    singularId?: string;
};
export declare const useNotificationStore: any;
