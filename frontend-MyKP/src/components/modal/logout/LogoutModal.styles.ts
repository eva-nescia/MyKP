import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
 overlay: {
  flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 24,

    paddingHorizontal: 24,
    paddingVertical: 28,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,

    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#64748B",

    textAlign: "center",
    marginBottom: 26,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  cancelButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,

    backgroundColor: "#F1F5F9",

    justifyContent: "center",
    alignItems: "center",
  },

  confirmButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  confirmText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});