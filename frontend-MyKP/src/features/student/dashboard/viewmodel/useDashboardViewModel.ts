import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import { fetchDashboard } from "../services/dashboardService";
import { DashboardData } from "../model/types";
import { useAuth } from "../../../../core/contexts/AuthContext";
import { useLoadingStore } from "@/store/useLoadingStore";

export const useDashboardViewModel = () => {
  const { token } = useAuth();

  const { loginSuccess } = useLocalSearchParams();

  const showLoading = useLoadingStore((state) => state.showLoading);
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);

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

  useEffect(() => {
    loadDashboard();
  }, [token]);

  useEffect(() => {
    if (loginSuccess === "true") {
      setShowLoginSuccess(true);
    }
  }, [loginSuccess]);

  return {
    data,
    error,

    showLoginSuccess,
    setShowLoginSuccess,
  };
};