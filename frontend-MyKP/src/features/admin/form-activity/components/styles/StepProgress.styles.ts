import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,

    marginVertical: 20,
  },

  dot: {
    width: 50,
    height: 6,

    borderRadius: 999,
    backgroundColor: "#E5E7EB",
  },

  active: {
    backgroundColor: COLORS.primary,
  },
});