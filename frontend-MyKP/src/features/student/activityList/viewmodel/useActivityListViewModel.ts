import { useEffect, useState } from "react";
import { fetchActivities } from "src/features/student/activityList/services/activityListService";
import { Activity } from "../model/types";

export const useActivityListViewModel = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [filtered, setFiltered] = useState<Activity[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [search, selectedCategory, data]);

  const load = async () => {
    setLoading(true);
    const res = await fetchActivities();
    setData(res);
    setFiltered(res);
    setLoading(false);
  };

  const applyFilter = () => {
    let result = data;

    // search
    if (search) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter(
        (item) => item.type === selectedCategory
      );
    }

    setFiltered(result);
  };

  return {
    data: filtered,
    loading,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
  };
};