import { FONT_WEIGHT } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    width: 165,
    marginRight: 12,
    marginBottom: 20,
  },

  image: {
    width: "100%",
    height: 245,

    borderRadius: 8,

    marginBottom: 10,

    backgroundColor: "#E5E7EB",
    resizeMode: "cover",
  },

  action: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },

  title: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 4,
  },


  badges: {
    flexDirection: "row",
    alignItems: "center",
  },

  date: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.medium,
    marginLeft: 4,
    color: "#64748B",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
});