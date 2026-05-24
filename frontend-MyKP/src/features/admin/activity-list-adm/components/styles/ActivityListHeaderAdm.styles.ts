import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 24,
    // marginTop: 2,
  },

  textContainer: {
    flex: 1,
    marginRight: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,

    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,

    color: "#64748B",

    marginTop: 4,
  },
});