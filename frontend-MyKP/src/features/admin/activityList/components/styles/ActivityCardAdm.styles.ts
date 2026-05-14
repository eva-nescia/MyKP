import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  card: {
    flexDirection: "row",

    backgroundColor: COLORS.white,

    padding: 12,

    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  image: {
    width: 90,
    height: 130,

    borderRadius: 6,

    marginRight: 14,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,

    marginBottom: 8,
  },

  date: {
    fontSize: 14,
    color: COLORS.text,

    marginBottom: 12,
  },

  badges: {
    flexDirection: "row",
    gap: 8,
  },

  touchable: {
    flexDirection: "row",
    flex: 1,
  }
});