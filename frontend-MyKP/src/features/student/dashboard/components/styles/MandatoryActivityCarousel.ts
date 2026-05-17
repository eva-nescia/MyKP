import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";
import MandatoryActivityCarousel from "../MandatoryActivityCarousel";

export const styles = StyleSheet.create({
  section: {
    marginHorizontal: -24,
    paddingTop: 8,
    paddingBottom: 32,
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
    fontSize: 22,
    lineHeight: 29,
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
    maxWidth: 180,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  typeText: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },

  pointBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  pointText: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,
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
});