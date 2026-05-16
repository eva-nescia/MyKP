import { CATEGORY_MAP } from "@/constants/categoryMap";

const fallbackConfig = {
  title: "Unknown Category",
  method: "-",
  description: "-",
  checklist: [],
  note: undefined,
};

export function getClaimConfig(categoryLabel: string) {
  return CATEGORY_MAP.get(categoryLabel) ?? fallbackConfig;
}