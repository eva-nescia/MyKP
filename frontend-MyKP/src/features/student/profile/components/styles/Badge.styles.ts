import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  badge: {
    height: 30,

    paddingHorizontal: 12,

    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.medium,
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  primaryText: {
    color: COLORS.white,
  },

  outline: {
    backgroundColor: "transparent",

    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  outlineText: {
    color: "#475569",
  },

  success: {
    backgroundColor: "#DCFCE7",
  },

  successText: {
    color: "#166534",
  },

  warning: {
    backgroundColor: "#FEF3C7",
  },

  warningText: {
    color: "#92400E",
  },
});