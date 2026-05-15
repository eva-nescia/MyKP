import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: 10,

    color: COLORS.text,
  },

  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,

    borderRadius: 999,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    marginRight: 10,
    marginBottom: 10,
  },

  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipText: {
    color: COLORS.text,
    fontSize: 13,
  },

  chipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});