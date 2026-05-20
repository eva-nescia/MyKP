import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  progressCard: {
    backgroundColor: COLORS.white,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 20,

    padding: 16,

    marginBottom: 28,

    elevation: 1,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 8,
  },

  point: {
    fontSize: 24,
    lineHeight: 30,

    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,
  },

  percentage: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.primary,
  },

  progressBarBackground: {
    height: 10,

    backgroundColor: "#E2E8F0",

    borderRadius: 999,

    overflow: "hidden",

    marginBottom: 10,
  },

  progressBarFill: {
    height: "100%",

    backgroundColor: COLORS.primary,

    borderRadius: 999,
  },

  progressFooter: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.medium,
    textAlign: "right",
    color: "#64748B",
  },
});