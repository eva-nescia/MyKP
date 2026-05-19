import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";
import MandatoryActivityCarousel from "../MandatoryActivityCarousel";

export const styles = StyleSheet.create({
  section: {
    marginHorizontal: -24,
    paddingTop: 15,
    paddingBottom: 45,
    marginBottom: 24,
  },

  posterWrapper: {
    alignItems: "center",
  },

  poster: {
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#E5E7EB",
  },

  info: {
    paddingHorizontal: 28,
    marginTop: 14,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    // lineHeight: 29,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 10,
  },

  date: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.medium,
    color: "#64748B",
    marginBottom: 12,
  },

  badgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  typeText: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.regular,
    color: "#475569",
  },

  pointBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  pointText: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.white,
  },
  emptyCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
});