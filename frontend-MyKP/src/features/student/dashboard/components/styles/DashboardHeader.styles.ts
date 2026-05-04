import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  },

  notificationBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
    padding: 6,
  },

//   badge: {
//     position: "absolute",
//     top: 2,
//     right: 2,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "#EF4444",
//   },
});