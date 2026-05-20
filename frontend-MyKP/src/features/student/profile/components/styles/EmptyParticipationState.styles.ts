import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     paddingHorizontal: 24,
     marginTop: 110,
  },

  iconContainer: {
    width: 110,
    height: 110,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 22,
  },

  title: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    marginBottom: 10,

    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 24,

    color: "#64748B",

    textAlign: "center",
  },
});