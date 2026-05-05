import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 4,
    marginBottom: 10,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  list: {
    paddingBottom: 100,
  },
});

/* overlay layer */
export const overlayStyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
});