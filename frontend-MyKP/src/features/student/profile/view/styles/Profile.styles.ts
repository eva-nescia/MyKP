import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 12,
  },

  header: {
    fontSize: 26,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 36,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 14,
  },

  listContent: {
    paddingBottom: 0,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 8,
    },
});