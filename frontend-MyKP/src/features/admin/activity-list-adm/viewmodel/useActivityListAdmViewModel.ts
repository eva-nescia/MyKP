import { useMemo, useState, useEffect } from "react";

import { deleteAdminActivity, getAdminActivities } from "@/features/admin/activity-list-adm/services/activityListAdmService";

export function useActivityListAdminViewModel() {
  const [search, setSearch] =
    useState("");

  const [selectedYear, setSelectedYear] =
    useState("All");

  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
  
  const deleteActivity = async (id: string) => {
    console.log("DEBUG: Starting delete for activity:", id);
    
    try {
      const success = await deleteAdminActivity(id);

      if (success) {
        console.log("DEBUG: Delete succeeded, removing from list");
        setActivities((prev) =>
          prev.filter((item) => item.id !== id)
        );
        setDeleteError(null);
      } else {
        console.error("DEBUG: Delete returned false");
        setDeleteError("Failed to delete activity. Please try again.");
      }
    } catch (error) {
      console.error("DEBUG: Delete error:", error);
      setDeleteError(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the activity"
      );
    }
  };

  return {
    data,
    loading,

    search,
    setSearch,

    selectedYear,
    setSelectedYear,

    deleteActivity,
    deleteError,
    setDeleteError,
  };
}