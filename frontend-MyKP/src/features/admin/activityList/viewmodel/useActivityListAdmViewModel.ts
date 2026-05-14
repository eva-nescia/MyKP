import { useMemo, useState } from "react";

import { getAdminActivities } from "src/features/admin/activityList/services/activityListAdmService";

export function useActivityListAdminViewModel() {
  const [search, setSearch] =
    useState("");

  const [selectedYear, setSelectedYear] =
    useState("All");

  const activities =
    getAdminActivities();

  const data = useMemo(() => {
    return activities.filter((item) => {
        const keyword =
        search.toLowerCase();

        const matchesSearch =
        item.title
            .toLowerCase()
            .includes(keyword) ||

        item.type
            .toLowerCase()
            .includes(keyword);

        const matchesYear =
        selectedYear === "All" ||
        item.year === selectedYear;

        return (
        matchesSearch &&
        matchesYear
        );
    });
    }, [search, selectedYear]);

  return {
    data,

    search,
    setSearch,

    selectedYear,
    setSelectedYear,
  };
}