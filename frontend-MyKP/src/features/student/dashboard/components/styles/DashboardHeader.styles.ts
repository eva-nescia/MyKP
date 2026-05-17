import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 22,
  },

  textContainer: {
    flex: 1,
    marginRight: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.gray,

    marginTop: 4,
  },

  notificationBtn: {
    width: 46,
    height: 46,

    borderRadius: 16,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    position: "relative",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  badge: {
    position: "absolute",
    top: 10,
    right: 11,

    width: 8,
    height: 8,

    borderRadius: 999,

    backgroundColor: "#EF4444",

    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
});