import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,

    marginBottom: 14,
    marginTop: 8,
  },
});