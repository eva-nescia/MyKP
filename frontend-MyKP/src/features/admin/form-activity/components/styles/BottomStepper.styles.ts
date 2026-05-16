import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-between",

    padding: 20,

    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  backBtn: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  backText: {
    fontWeight: "600",
    color: COLORS.text,
  },

  nextBtn: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 24,
    paddingVertical: 14,

    borderRadius: 12,
  },

  nextText: {
    color: "#fff",
    fontWeight: "700",
  },
});