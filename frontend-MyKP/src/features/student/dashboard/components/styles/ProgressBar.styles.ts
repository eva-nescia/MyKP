import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 999,
  },

  lightContainer: {
    backgroundColor: "rgba(255,255,255,0.35)",
  },

  lightFill: {
    backgroundColor: COLORS.white,
  },
});