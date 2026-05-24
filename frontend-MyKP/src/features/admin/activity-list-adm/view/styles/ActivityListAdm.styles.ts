import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  title: {
    fontSize: 26,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },

  list: {
    paddingTop: 12,
    paddingBottom: 120,
    gap: 18,
  },
});