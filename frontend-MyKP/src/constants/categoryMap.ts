import { CATEGORIES } from "@/constants/categories";
import type { CategoryConfig } from "@/constants/categories";

export const CATEGORY_MAP = new Map<
  CategoryConfig["label"],
  CategoryConfig["claimConfig"]
>(
  CATEGORIES.map((category) => [
    category.label,
    category.claimConfig,
  ])
);