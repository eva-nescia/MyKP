import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF7ED",

    borderRadius: 16,

    padding: 18,

    borderWidth: 1,
    borderColor: "#FED7AA",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",

    color: COLORS.primary,

    marginBottom: 10,
  },

  item: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
  },

  methodBadge: {
    alignSelf: "flex-start",

    backgroundColor: "#FFEDD5",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,

    marginBottom: 12,
  },

  methodText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 12,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.text,

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
});