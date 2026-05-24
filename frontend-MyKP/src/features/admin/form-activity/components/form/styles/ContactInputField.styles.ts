import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  contactCard: {
    marginBottom: 14,
  },

  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },

  contactTitle: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,
  },

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 10,
  },

  contactPrefix: {
    width: 50,
    height: 50,

    borderRadius: 999,

    backgroundColor: "#DCFCE7",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
    },

  contactPrefixText: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,

    color: "#16A34A",
    },

  helperText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
    marginTop: -4,
    marginBottom: 12,
    },
});