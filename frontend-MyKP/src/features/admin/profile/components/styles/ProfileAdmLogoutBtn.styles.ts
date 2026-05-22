import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  button: {
    marginTop: "auto",
    marginBottom: 34,

    height: 58,

    borderRadius: 999,

    backgroundColor: COLORS.secondary,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 2,
  },

  text: {
    marginLeft: 10,

    color: COLORS.white,

    fontSize: 16,
    fontWeight: FONT_WEIGHT.bold,
  },
});