import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",

    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",

    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,

    elevation: 20,
  },

  registerButton: {
    flex: 1,
    height: 70,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 8,
  },

  saveButton: {
    flex: 1,
    height: 70,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 8,
  },

  savedButton: {
    backgroundColor: "#10B981",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});