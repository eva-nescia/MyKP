import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  overlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 24,
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    width: "100%",

    backgroundColor: "rgba(255,255,255,0.82)",

    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    

    paddingHorizontal: 24,
    paddingVertical: 28,

    alignItems: "center",

    overflow: "hidden",
  },

  iconContainer: {
    width: 74,
    height: 74,

    borderRadius: 999,

    backgroundColor: "rgba(255,255,255,0.82)",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,

    marginBottom: 8,
  },

  description: {
    fontSize: 16,

    color: COLORS.text,

    textAlign: "center",

    lineHeight: 22,

    marginBottom: 30,
  },

  buttonRow: {
    flexDirection: "row",

    width: "100%",

    gap: 12,
  },

  cancelButton: {
    flex: 1,

    height: 54,

    borderRadius: 999,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",
  },

  confirmButton: {
    flex: 1,

    height: 54,

    borderRadius: 999,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",
  },

  cancelText: {
    color: COLORS.white,

    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  confirmText: {
    color: COLORS.white,

    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});