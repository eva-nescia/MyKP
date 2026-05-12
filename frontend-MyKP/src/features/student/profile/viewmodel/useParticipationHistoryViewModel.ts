import { useLocalSearchParams } from "expo-router";

import {
  getParticipationHistory,
} from "@/features/student/profile/services/historyService";

export default function useParticipationHistoryViewModel() {
  const {
    id,
    title,
    current,
    target,
  } = useLocalSearchParams();

  const categoryId = Number(id);

  const history =
    getParticipationHistory().filter(
      (item) =>
        item.categoryId === categoryId
    );

  const currentValue = Number(current);
  const targetValue = Number(target);

  const percentage = Math.min(
    (currentValue / targetValue) * 100,
    100
  );

  return {
    title:
      title?.toString() ??
      "Selected Category",

    history,

    current: currentValue,
    target: targetValue,
    percentage,
  };
}