import { useLocalSearchParams } from "expo-router";

import { getKPCategories } from "../services/kpCategoriesService";

export default function useKPDetailViewModel() {
  const { id, title } = useLocalSearchParams();

  const history = getKPCategories().find((category) => category.id === Number(id));

  return {
    title,
    history,
  };
}