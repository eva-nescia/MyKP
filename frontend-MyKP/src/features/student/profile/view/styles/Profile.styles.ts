import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: COLORS.white,
 },

  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 14,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 8,
    },
});