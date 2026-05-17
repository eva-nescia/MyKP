import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    minHeight: 550,
    paddingHorizontal: 24,
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
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,

    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",

    textAlign: "center",
    lineHeight: 24,

    maxWidth: 300,
  },
});