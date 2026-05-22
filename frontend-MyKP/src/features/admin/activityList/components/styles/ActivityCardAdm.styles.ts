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
    borderRadius: 18,

    elevation: 1,
  },

  image: {
    width: 82,
    height: 118,

    borderRadius: 6,

    marginRight: 14,

    backgroundColor: "#E5E7EB",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 18,
    lineHeight: 22,

    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,

    marginBottom: 6,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,

    marginBottom: 8,
  },

  date: {
    fontSize: 12,
    color: "#64748B",
  },

  badges: {
    flexDirection: "row",
    alignItems: "center",
  },

  touchable: {
    flexDirection: "row",
    flex: 1,
  },
});