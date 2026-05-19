import { useMemo, useState, useEffect } from "react";

import { getAdminActivities } from "src/features/admin/activityList/services/activityListAdmService";

export function useActivityListAdminViewModel() {
  const [search, setSearch] =
    useState("");

  const [selectedYear, setSelectedYear] =
    useState("All");

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      try {
        const result = await getAdminActivities();
        setActivities(result);
      } catch (error) {
        console.error("Error loading activities:", error);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

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
    }, [search, selectedYear, activities]);

  return {
    data,
    loading,

    search,
    setSearch,

    selectedYear,
    setSelectedYear,
  };
}