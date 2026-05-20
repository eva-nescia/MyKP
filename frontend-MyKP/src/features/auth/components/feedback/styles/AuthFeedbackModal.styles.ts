import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 35,
  },

  modal: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
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

  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  button: {
    flex: 1,
    height: 54,
    backgroundColor: COLORS.secondary,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});