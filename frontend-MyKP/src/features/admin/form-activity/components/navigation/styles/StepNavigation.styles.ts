import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-between",

    padding: 20,
    paddingBottom: 65,

    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderColor: "#F3F4F6",
  },

  backBtn: {
    flex: 1,

    height: 52,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D1D5DB",

    marginRight: 10,

    backgroundColor: COLORS.white,
  },

  nextBtn: {
    flex: 1,

    height: 52,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.secondary,
  },

  backText: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  nextText: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.white,
  },

  fullWidth: {
    flex: 1,
    marginRight: 0,
  },
});