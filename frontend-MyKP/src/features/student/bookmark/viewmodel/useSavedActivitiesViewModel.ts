import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";

import {
  SavedActivity,
  fetchBookmarks,
} from "../services/bookmarkService";

export const useSavedActivitiesViewModel = () => {
  const [data, setData] = useState<SavedActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Only the initial useState(true) flags loading; on subsequent focus-driven
  // refetches we leave `loading` alone so the existing list stays on screen
  // instead of flashing the global spinner every time the tab regains focus.
  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetchBookmarks();
      setData(res);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load saved activities");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Re-fetch whenever the user navigates back to this tab, so that bookmarks
  // saved/removed from the detail screen are reflected here.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return { data, loading, error, reload: load };
};
