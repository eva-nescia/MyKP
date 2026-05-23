import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7ED",

    borderRadius: 20,

    padding: 18,

    borderWidth: 1,
    borderColor: "#FED7AA",
  },

  title: {
    fontSize: 17,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    marginBottom: 10,
  },

  methodBadge: {
    alignSelf: "flex-start",

    backgroundColor: COLORS.primary,

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,

    marginBottom: 12,
  },

  methodText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.semiBold,
    fontSize: 12,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,

    color: "#475569",

    marginBottom: 16,
  },

  listContainer: {
    gap: 12,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 10,
  },

  itemText: {
    flex: 1,

    fontSize: 14,
    lineHeight: 22,

    color: COLORS.text,
  },

  note: {
    marginTop: 16,

    fontSize: 13,
    lineHeight: 20,

    color: "#92400E",
  },

  emptyCard: {
    backgroundColor: COLORS.white,

    borderRadius: 20,

    padding: 22,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    alignItems: "center",
  },

  emptyIcon: {
    width: 58,
    height: 58,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    marginBottom: 6,

    textAlign: "center",
  },

  emptyDescription: {
    fontSize: 14,
    lineHeight: 22,

    color: "#64748B",

    textAlign: "center",
  },
});