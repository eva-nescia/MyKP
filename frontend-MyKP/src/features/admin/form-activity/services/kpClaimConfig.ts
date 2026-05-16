import { CATEGORY_MAP } from "@/constants/categoryMap";

const fallbackConfig = {
  title: "Unknown Category",
  method: "-",
  description: "-",
  checklist: [],
  note: undefined,
};

export function getClaimConfig(category: string) {
  return CATEGORY_MAP.get(category) ?? fallbackConfig;
}