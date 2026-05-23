import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",

    paddingHorizontal: 24,
    marginTop: 12,
    marginBottom: 22,
  },

  stepGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  lineBg: {
    position: "absolute",

    top: 18,
    left: "-50%",

    width: "100%",
    height: 3,

    backgroundColor: "#E5E7EB",

    borderRadius: 999,
    overflow: "hidden",

    zIndex: 0,
  },

  lineFill: {
    width: "100%",
    height: "100%",

    backgroundColor: COLORS.primary,

    transformOrigin: "left",
  },

  stepWrapper: {
    flex: 1,
    alignItems: "center",
    zIndex: 2,
  },

  circle: {
    width: 38,
    height: 38,
    borderRadius: 999,

    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,

    backgroundColor: "#F3F4F6",
  },

  number: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9CA3AF",
  },

  numberActive: {
    color: "#fff",
  },

  label: {
    fontSize: 12,
    fontWeight: "500",

    color: "#9CA3AF",
    textAlign: "center",
  },

  labelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});