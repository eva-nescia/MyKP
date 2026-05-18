import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 999,

    marginRight: 6,
    marginBottom: 6,

    maxWidth: 114,
  },

  text: {
    fontSize: 11,
    fontWeight: FONT_WEIGHT.regular,
  },

  // variants
  default: {
    backgroundColor: COLORS.white,
  },

  defaultText: {
    color: "#374151",
  },

  primary: {
    backgroundColor: COLORS.primary,
  },

  primaryText: {
    color: COLORS.white,
  },

  outline: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#F8FAFC",
  },

  outlineText: {
    color: "#475569",
  },
});