import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
    marginTop: 47,
  },

    textContainer: {
    flex: 1,
    marginRight: 16,
  },

    title: {
    fontSize: 30,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: -0.4,
  },

    subtitle: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.medium,
    color: "#64748B",
    marginTop: 4,
  },
});