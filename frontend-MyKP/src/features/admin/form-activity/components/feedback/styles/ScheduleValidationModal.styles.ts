import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(15, 23, 42, 0.45)",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 24,
  },

  modal: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 24,

    paddingHorizontal: 24,
    paddingVertical: 28,

    alignItems: "center",

    elevation: 8,
  },

  iconContainer: {
    width: 72,
    height: 72,

    borderRadius: 999,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    marginBottom: 10,

    textAlign: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,

    color: "#64748B",

    textAlign: "center",

    marginBottom: 26,
  },

  button: {
    width: "100%",

    height: 54,

    borderRadius: 16,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.white,
  },
});