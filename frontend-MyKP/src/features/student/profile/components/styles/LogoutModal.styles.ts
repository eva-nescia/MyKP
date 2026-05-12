import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.35)",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 24,
  },

  container: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 24,

    borderWidth: 3,
    borderColor: COLORS.primary,

    padding: 28,

    alignItems: "center",
  },

  iconContainer: {
    width: 88,
    height: 88,

    borderRadius: 999,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,

    textAlign: "center",

    marginBottom: 28,
    lineHeight: 26,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  cancelButton: {
    flex: 1,

    height: 52,

    backgroundColor: "#A1A1AA",

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",
  },

  confirmButton: {
    flex: 1,

    height: 52,

    backgroundColor: COLORS.secondary,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});