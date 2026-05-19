import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import { fetchDashboard } from "../services/dashboardService";
import { DashboardData } from "../model/types";
import { useAuth } from "../../../../core/contexts/AuthContext";
import { useLoadingStore } from "@/store/useLoadingStore";
import { fetchUnreadCount } from "@/features/student/notification/services/notificationService";

export const useDashboardViewModel = () => {
  const { token } = useAuth();

  const { loginSuccess } = useLocalSearchParams();

  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadDashboard = async () => {
    if (!token) {
      setError("User is not authenticated");
      return;
    }

    try {
      showLoading();
      setError(null);

      const result = await fetchDashboard(token);

      setData(result);
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to load dashboard. Check backend connection."
      );
    } finally {
      hideLoading();
    }
  };

  const refreshUnreadCount = useCallback(async () => {
    if (!token) return;
    const count = await fetchUnreadCount();
    setUnreadCount(count);
  }, [token]);

  useEffect(() => {
    loadDashboard();
  }, [token]);

  // Refresh badge each time the dashboard comes back into focus — e.g.
  // after returning from the notification screen, the unread count should
  // drop to 0 because index() auto-marks everything as read.
  useFocusEffect(
    useCallback(() => {
      refreshUnreadCount();
    }, [refreshUnreadCount]),
  );

  useEffect(() => {
    if (loginSuccess === "true") {
      setShowLoginSuccess(true);
    }
  }, [loginSuccess]);

  return {
    data,
    error,
    unreadCount,

    showLoginSuccess,
    setShowLoginSuccess,
  };
};