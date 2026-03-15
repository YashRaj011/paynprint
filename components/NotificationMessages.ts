const NotificationMessages = {
  FILE_UPLOAD:
    "File upload failed. Please check your connection and try again.",
  KIOSK_VALIDATION:
    "Unable to connect to this kiosk. It may be offline or unavailable.",
  KIOSK_FETCH:
    "Couldn't load the kiosk list. Please refresh the page and try again.",
  PAYMENT_INIT:
    "Unable to start the payment process. Please try again in a moment.",
  PAYMENT_STATUS_UPDATE:
    "Your payment went through but we couldn't update the status. Please contact support.",
  EMAIL_SEND:
    "We couldn't send your confirmation email. You can still use your print code.",
  PRINT_JOB_CREATE: "Failed to initialize your print job. Please try again.",
  REVIEW_FETCH: "Failed to load review for document. Please try again.",
  PRINT_SETTING_FETCH: "Failed to load your print settings. Please try again.",
  USER_FETCH: "Failed to fetch user. Please try again later."
};

export function getErrorMessage(
  backendError: string | undefined,
  fallback: string,
): string {
  return backendError || fallback;
}

export default NotificationMessages;
