import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    paddingHorizontal: 20,
    paddingTop: 56,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,

    marginBottom: 10,
  },

  header: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },

  count: {
    fontSize: 16,
    color: "#64748B",

    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,

    marginBottom: 14,
    marginTop: 8,
  },
});