import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",

    marginBottom: 10,
  },

  dot: {
    width: 5,
    height: 5,

    borderRadius: 999,

    backgroundColor: COLORS.primary,

    marginTop: 10,
    marginRight: 10,
  },

  text: {
    flex: 1,

    fontSize: 16,
    lineHeight: 26,

    color: COLORS.text,
  },
});