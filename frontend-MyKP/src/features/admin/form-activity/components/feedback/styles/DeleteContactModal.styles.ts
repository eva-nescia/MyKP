import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(15, 23, 42, 0.45)",

    paddingHorizontal: 24,
  },

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 24,

    padding: 24,
  },

  iconWrapper: {
    width: 64,
    height: 64,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    textAlign: "center",

    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,

    color: "#64748B",

    textAlign: "center",

    marginBottom: 24,
  },

  actions: {
    flexDirection: "row",
  },

  cancelButton: {
    flex: 1,

    height: 52,

    borderRadius: 16,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  deleteButton: {
    flex: 1,

    height: 52,

    borderRadius: 16,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,
  },

  deleteText: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.white,
  },
});