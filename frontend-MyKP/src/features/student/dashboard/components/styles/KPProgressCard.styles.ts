import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 26,

    padding: 22,
    marginBottom: 28,

    shadowColor: "#F97316",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },

    elevation: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.white,
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",

    marginBottom: 20,
  },

  value: {
    fontSize: 52,
    lineHeight: 58,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
  },

  badge: {
    backgroundColor: "rgba(15, 23, 42, 0.22)",

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 999,

    marginBottom: 8,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.white,
  },
});