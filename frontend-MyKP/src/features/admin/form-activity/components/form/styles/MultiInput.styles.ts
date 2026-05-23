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
    minHeight: 42,

    paddingHorizontal: 14,

    borderRadius: 999,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    marginRight: 10,
    marginBottom: 10,

    justifyContent: "center",
    alignItems: "center",
  },

  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  chipText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: FONT_WEIGHT.regular,
  },

  chipTextActive: {
    color: "#fff",
    fontWeight: FONT_WEIGHT.regular,
  },
});