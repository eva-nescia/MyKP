import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import {
  ParticipationHistoryItem,
  fetchParticipationHistory,
} from "@/features/student/profile/services/participationService";

export default function useParticipationHistoryViewModel() {
  const { title, current, target } = useLocalSearchParams();

  const categoryTitle = title?.toString() ?? "";
  const currentValue = Number(current) || 0;
  const targetValue = Number(target) || 0;
  const percentage = targetValue > 0
    ? Math.min((currentValue / targetValue) * 100, 100)
    : 0;

  const [history, setHistory] = useState<ParticipationHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!categoryTitle) {
      setHistory([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchParticipationHistory(categoryTitle);
      setHistory(rows);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load participation history.");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [categoryTitle]);

  useEffect(() => {
    load();
  }, [load]);

  // Refresh whenever the user comes back to this screen — e.g. after
  // registering for a new event somewhere else in the app.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return {
    title: categoryTitle || "Selected Category",
    history,
    loading,
    error,
    current: currentValue,
    target: targetValue,
    percentage,
  };
}
