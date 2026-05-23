import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(15, 23, 42, 0.45)",

    paddingHorizontal: 24,
  },

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 24,

    padding: 24,

    alignItems: "center",
  },

  iconWrapper: {
    width: 64,
    height: 64,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    // lineHeight: 24,

    color: "#64748B",
    textAlign: "center",
  },

  listContainer: {
    width: "100%",
  },

  bulletText: {
    fontSize: 15,
    lineHeight: 26,

    color: COLORS.text,

    marginBottom: 2,
  },

  button: {
    width: "100%",
    height: 52,

    borderRadius: 16,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 22,
  },

  buttonText: {
    color: COLORS.white,

    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});