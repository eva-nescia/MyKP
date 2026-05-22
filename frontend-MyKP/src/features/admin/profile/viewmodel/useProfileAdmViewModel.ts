import { useState } from "react";
import { router } from "expo-router";

import { useAuth } from "src/core/contexts/AuthContext";

import { clearSession } from "src/features/auth/services/session";
import { logout as revokeServerToken } from "src/features/auth/services/authService";

import { getAdminProfile } from "../services/profileAdmService";

export default function useProfileAdmViewModel() {
  const [showLogout, setShowLogout] =
    useState(false);

  const { signOut } = useAuth();

  const profile = getAdminProfile();

  const handleLogout = async () => {
    try {
      setShowLogout(false);

      await revokeServerToken();
      await clearSession();

      signOut();

      router.replace("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return {
    profile,

    showLogout,
    setShowLogout,

    handleLogout,
  };
}