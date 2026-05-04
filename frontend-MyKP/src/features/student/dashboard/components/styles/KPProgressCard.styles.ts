import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  value: {
    fontSize: 50,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.primary,
  },

  remaining: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 50,
  },
});