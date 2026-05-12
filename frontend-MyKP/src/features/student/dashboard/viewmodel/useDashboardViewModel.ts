import { useEffect, useState } from "react";
import { fetchDashboard } from "../services/dashboardService";
import { DashboardData } from "../model/types";
import { useAuth } from "../../../../core/contexts/AuthContext";

export const useDashboardViewModel = () => {
  const { token } = useAuth();
  
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    if (!token) {
      setError("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await fetchDashboard(token);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [token]);

  return {
    data,
    loading,
    error,
  };
};