import { useEffect, useState, useRef } from "react";
import { fetchActivities, clearSearchCache } from "@/features/student/activity-list-stu/services/activityListService";
import { Activity } from "../model/types";
import { debounce } from "@/utils/debounce";

export const useActivityListViewModel = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [filtered, setFiltered] = useState<Activity[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  const debouncedFilterRef = useRef<ReturnType<typeof debounce> | null>(null);

  // Initialize
  useEffect(() => {
    load();
  }, []);

  // Setup debounced filter
  useEffect(() => {
    if (debouncedFilterRef.current) {
      debouncedFilterRef.current.cancel();
    }

    debouncedFilterRef.current = debounce(async () => {
      setIsFiltering(true);
      setCurrentPage(1); // Reset to page 1 on new search
      try {
        const result = await fetchActivities(
          search,
          selectedCategory ?? undefined,
          1,
          20
        );
        const activities = Array.isArray(result.activities) ? result.activities : [];
        setFiltered(activities);
        setPagination(result.pagination || {});
      } catch (error) {
        console.error('Filter error:', error);
        setFiltered([]);
        setPagination({});
      } finally {
        setIsFiltering(false);
      }
    }, 300); // 300ms debounce delay

    // Trigger the debounced search
    debouncedFilterRef.current();

    return () => {
      if (debouncedFilterRef.current) {
        debouncedFilterRef.current.cancel();
      }
    };
  }, [search, selectedCategory]);

  const load = async () => {
    setLoading(true);
    clearSearchCache(); // Clear cache on initial load
    try {
      const result = await fetchActivities(undefined, undefined, 1, 20);
      const activities = Array.isArray(result.activities) ? result.activities : [];
      setData(activities);
      setFiltered(activities);
      setPagination(result.pagination || {});
    } catch (error) {
      console.error('Load error:', error);
      setData([]);
      setFiltered([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!pagination || currentPage >= pagination.last_page) {
      return; // No more pages
    }

    setIsFiltering(true);
    try {
      const nextPage = currentPage + 1;
      const result = await fetchActivities(
        search,
        selectedCategory ?? undefined,
        nextPage,
        20
      );
      const newActivities = Array.isArray(result.activities) ? result.activities : [];
      setFiltered((prev) => [...prev, ...newActivities]);
      setPagination(result.pagination || {});
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setIsFiltering(false);
    }
  };

  const refreshSearch = async () => {
    setLoading(true);
    clearSearchCache();
    setCurrentPage(1);
    try {
      const result = await fetchActivities(search, selectedCategory ?? undefined, 1, 20);
      const activities = Array.isArray(result.activities) ? result.activities : [];
      setFiltered(activities);
      setPagination(result.pagination || {});
    } catch (error) {
      console.error('Refresh error:', error);
      setFiltered([]);
      setPagination({});
    } finally {
      setLoading(false);
    }
  };

  return {
    data: filtered,
    loading,
    isFiltering,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    pagination,
    loadMore,
    refreshSearch,
  };
};