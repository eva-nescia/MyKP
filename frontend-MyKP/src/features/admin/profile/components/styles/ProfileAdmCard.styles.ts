import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,

    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingVertical: 34,
    paddingHorizontal: 24,

    alignItems: "center",

    elevation: 1,
  },

  logoWrapper: {
    width: 118,
    height: 118,

    borderRadius: 999,

    borderWidth: 5,
    borderColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.white,
  },

  logo: {
    width: 82,
    height: 82,

    borderRadius: 999,

    resizeMode: "contain",
  },

  name: {
    marginTop: 22,

    fontSize: 24,
    lineHeight: 30,

    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,

    textAlign: "center",
  },

  roleBadge: {
    marginTop: 14,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",
  },

  roleText: {
    marginLeft: 8,

    fontSize: 14,
    fontWeight: FONT_WEIGHT.medium,

    color: COLORS.primary,
  },
});