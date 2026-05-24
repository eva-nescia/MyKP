import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 24,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    paddingTop: 45
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
    paddingBottom: 0,
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
