import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 28,
  },

  container: {
    width: "100%",

    backgroundColor: "white",

    borderRadius: 24,

    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",

    color: "#0F172A",

    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,

    color: "#64748B",

    marginBottom: 28,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  cancelButton: {
    flex: 1,

    height: 52,

    borderRadius: 14,

    backgroundColor: "#E2E8F0",

    justifyContent: "center",
    alignItems: "center",
  },

  continueButton: {
    flex: 1,

    height: 52,

    borderRadius: 14,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "600",

    color: "#0F172A",
  },

  continueText: {
    fontSize: 16,
    fontWeight: "700",

    color: "white",
  },
});