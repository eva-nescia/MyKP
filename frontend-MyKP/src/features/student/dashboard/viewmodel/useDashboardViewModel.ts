import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboardService";
import { DashboardData } from "../model/types";

export const useDashboardViewModel = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const result = await fetchDashboard();
      setData(result);
    } catch (err) {
      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    // state
    data,
    loading,
    error,

    // actions (important for future)
    refresh: loadDashboard,
  };
};