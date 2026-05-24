import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    zIndex: 100,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 24,
    paddingTop: 62,
    paddingBottom: 16,

    backgroundColor: COLORS.white,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  backButton: {
    width: 46,
    height: 46,

    borderRadius: 999,

    backgroundColor: "#F8FAFC",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,

    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.05)",
  },

  title: {
    fontSize: 30,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: -0.4,
  },
});
