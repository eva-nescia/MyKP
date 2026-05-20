import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 12,
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
    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,
    color: "#64748B",
    marginTop: 4,
  },

  logoutBtn: {
    width: 48,
    height: 48,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    // shadowColor: "#000",
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    // shadowOffset: {
    //     width: 0,
    //     height: 4,
    // },

    elevation: 1,
    },
});