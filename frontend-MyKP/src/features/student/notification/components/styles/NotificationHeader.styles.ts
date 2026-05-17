import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 28,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderColor: "rgba(15, 23, 42, 0.04)",
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  textContainer: {
    flex: 1,
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