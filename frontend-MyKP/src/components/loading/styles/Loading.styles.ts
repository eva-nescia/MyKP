import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  card: {
    width: 170,
    height: 170,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
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