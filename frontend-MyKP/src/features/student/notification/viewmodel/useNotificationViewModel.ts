import { getNotifications } from "../services/notificationService";

export default function useNotificationViewModel() {
  const notifications =
    getNotifications();

  return {
    notifications,
  };
}