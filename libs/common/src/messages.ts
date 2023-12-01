export const CREATE_NOTIFICATION_PATTERN = "create_notification";

export interface CreateNotificationPayload {
  customer: string;
  amount: number;
  retryCount?: number;
}

export const CREATE_NOTIFICATION_SUCCESS_PATTERN = "create_notification_success";

export interface CreateNotificationSuccessPayload {
  customer: string;
}

export const CREATE_NOTIFICATION_FAILURE_PATTERN = "create_notification_failure";

export interface CreateNotificationFailurePayload {
  customer: string;
}