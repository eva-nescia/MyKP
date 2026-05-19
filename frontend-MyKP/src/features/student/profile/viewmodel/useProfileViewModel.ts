import { useEffect, useState } from "react";
import { router } from "expo-router";

import { getProfile } from "../services/profileService";
import { logout as revokeServerToken } from "@/features/auth/services/authService";
import { clearSession, getCurrentUser } from "@/features/auth/services/session";
import { KPCategory, KPSummary, ProfileUser } from "../model/types";

export default function useProfileViewModel() {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [categories, setCategories] = useState<KPCategory[]>([]);
  const [summary, setSummary] = useState<KPSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      setError("Not logged in.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await getProfile(session.id);
        if (cancelled) return;
        setUser(data.user);
        setCategories(data.kp_categories);
        setSummary(data.kp_summary);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? "Failed to load profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const openCategory = (
    id: number,
    title: string,
    current: number,
    target: number
  ) => {
    router.push({
      pathname:
        "/participation-history/history",

      params: {
        id: String(id),
        title,
        current: String(current),
        target: String(target),
      },
    });
  };

  const logout = async () => {
    setLogoutVisible(false);
    // Revoke server-side token first (best-effort), then wipe local session.
    await revokeServerToken();
    await clearSession();
    router.replace("/login");
  };

  return {
    user,
    categories,
    summary,
    loading,
    error,

    logoutVisible,
    setLogoutVisible,

    openCategory,
    logout,
  };
}
