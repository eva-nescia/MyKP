import { useEffect, useState } from "react";
import { fetchActivities } from "@/features/student/activity-list-stu/services/activityListService";
import { Activity } from "../model/types";

export const useActivityListViewModel = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [filtered, setFiltered] = useState<Activity[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [search, selectedCategory]);

  const load = async () => {
    setLoading(true);
    const res = await fetchActivities();
    setData(res);
    setFiltered(res);
    setLoading(false);
  };

  const applyFilter = async () => {
    setIsFiltering(true);
    const result = await fetchActivities(search, selectedCategory ?? undefined);
    setFiltered(result);
    setIsFiltering(false);
  };

  return {
    data: filtered,
    loading,
    isFiltering,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
  };
};