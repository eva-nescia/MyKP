import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },

  input: {
    height: 52,

    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,

    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
  },
});