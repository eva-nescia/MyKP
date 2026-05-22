import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 420,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 24,
    paddingTop: 45
  },

  iconContainer: {
    width: 110,
    height: 110,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,

    marginBottom: 10,

    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 24,

    color: "#64748B",

    textAlign: "center",
    maxWidth: 300,
  },
});