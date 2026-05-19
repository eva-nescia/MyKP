import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 14,
    letterSpacing: -0.5,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginTop: 30,
  },
});