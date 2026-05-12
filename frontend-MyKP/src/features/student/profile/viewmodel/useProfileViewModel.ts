import { useState } from "react";
import { router } from "expo-router";

import { getKPCategories } from "../services/kpCategoriesService";

export default function useProfileViewModel() {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const categories = getKPCategories();

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

  const logout = () => {
    setLogoutVisible(false);

    router.replace("/login");
  };

  return {
    categories,

    logoutVisible,
    setLogoutVisible,

    openCategory,
    logout,
  };
}