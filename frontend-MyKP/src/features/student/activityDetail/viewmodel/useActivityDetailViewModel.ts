import { useEffect, useState } from "react";
import { Activity } from "@/models/activity";
import { fetchActivityById } from "../services/activityDetailService";

export const useActivityDetailViewModel = (id: string) => {
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchActivityById(id);
      setActivity(data);
    };

    load();
  }, [id]);

  return {
    activity,
  };
};