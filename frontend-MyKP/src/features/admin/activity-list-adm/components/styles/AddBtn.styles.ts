import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  button: {
    position: "absolute",

    right: 24,
    bottom: 32,

    width: 70,
    height: 70,

    borderRadius: 999,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    // shadowColor: "#000",
    // shadowOpacity: 0.15,
    // shadowRadius: 8,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },

    elevation: 1,
  },
});