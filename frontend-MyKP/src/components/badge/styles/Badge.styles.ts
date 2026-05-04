import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
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
  },
  outlineText: {
    color: "#374151",
  },
});