import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,

    height: 50,

    backgroundColor: COLORS.success,
    justifyContent: "center",
    paddingHorizontal: 20,
    zIndex: 999,
  },

  success: {
    backgroundColor: COLORS.success,
  },

  error: {
    backgroundColor: COLORS.error,
  },

  info: {
    backgroundColor: COLORS.primary,
  },

  text: {
    color: COLORS.white,
    alignContent: "center",
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});