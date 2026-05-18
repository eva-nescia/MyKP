import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";

import {
  NotificationGroups,
  fetchNotifications,
} from "../services/notificationService";

const empty: NotificationGroups = {
  today: [],
  yesterday: [],
  thisWeek: [],
  older: [],
};

export default function useNotificationViewModel() {
  const [notifications, setNotifications] = useState<NotificationGroups>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const groups = await fetchNotifications();
      setNotifications(groups);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load notifications");
      setNotifications(empty);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Refetch on focus so newly bookmarked events or new activities show up
  // without forcing a full reload.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return { notifications, loading, error, reload: load };
}
