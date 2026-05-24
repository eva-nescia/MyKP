import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999999,
    elevation: 999999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },

  card: {
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 10,
  },

  title: {
    marginTop: 14,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  subtitle: {
    marginTop: 4,
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
});
