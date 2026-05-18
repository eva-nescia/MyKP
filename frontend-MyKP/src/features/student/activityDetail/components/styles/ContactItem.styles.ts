import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  iconWrapper: {
    width: 24,
    alignItems: "center",
    marginTop: 4,
    marginRight: 8,
  },

  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 28,
    color: COLORS.text,
  },
});