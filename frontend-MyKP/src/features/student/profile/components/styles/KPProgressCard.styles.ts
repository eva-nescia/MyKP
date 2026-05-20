import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    elevation: 1,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },

  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
  },

  completedBadge: {
    backgroundColor: "#DCFCE7",
  },

  statusText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.semiBold,
    color: "#92400E",
  },

  completedText: {
    color: "#166534",
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  point: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,
    color: "#64748B",
  },

  percentage: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.primary,
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
});