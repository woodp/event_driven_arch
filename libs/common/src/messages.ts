export const CREATE_NOTIFICATION_PATTERN = "create_notification";

export interface CreateNotificationPayload {
  id: string;
  message: string;
  type: string;
}

export const NOTIFICATION_SUCCESS_PATTERN = "create_notification_success";

export const NOTIFICATION_FAILURE_PATTERN = "create_notification_failure";