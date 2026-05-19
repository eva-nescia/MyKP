import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    gap: 12,

    padding: 20,
    paddingBottom: 28,

    backgroundColor: COLORS.white,

    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  registerButton: {
    flex: 1,
    height: 54,

    borderRadius: 12,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",
    gap: 8,
  },

  saveButton: {
    flex: 1,
    height: 54,

    borderRadius: 12,

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
    fontSize: 16,
    fontWeight: "700",
  },
});