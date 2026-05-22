import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  section: {
    marginTop: 34,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    marginBottom: 14,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderRadius: 22,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    padding: 18,

    elevation: 1,
  },

  infoIcon: {
    width: 46,
    height: 46,

    borderRadius: 14,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.semiBold,

    color: "#94A3B8",
  },

  infoValue: {
    marginTop: 2,

    fontSize: 15,
    lineHeight: 22,

    color: COLORS.text,
  },
});