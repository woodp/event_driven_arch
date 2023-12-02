export const CREATE_NOTIFICATION_PATTERN = "create_notification";

export interface CreateNotificationPayload {
  id: string;
  message: string;
  type: string;
}

export const CREATE_NOTIFICATION_SUCCESS_PATTERN = "create_notification_success";

export const CREATE_NOTIFICATION_FAILURE_PATTERN = "create_notification_failure";