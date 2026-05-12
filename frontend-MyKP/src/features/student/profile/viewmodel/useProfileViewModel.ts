import { useState } from "react";
import { router } from "expo-router";

import { getKPCategories } from "../services/kpCategoriesService";

export default function useProfileViewModel() {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const categories = getKPCategories();

  const openCategory = (id: number, title: string) => {
    router.push({
      pathname: "/participation-history/history",
      params: {
        id: String(id),
        title,
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