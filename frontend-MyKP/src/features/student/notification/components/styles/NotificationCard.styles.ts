import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "flex-start",

    backgroundColor: COLORS.white,

    borderRadius: 24,
    padding: 18,
    marginBottom: 14,

    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.08)",

    // shadowColor: "#000",
    // shadowOpacity: 0.04,
    // shadowRadius: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },

    elevation: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 16,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },


  title: {
    flex: 1,

    fontSize: 18,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,

    lineHeight: 24,
  },

  time: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.medium,
    color: "#94A3B8",
  },

  description: {
    fontSize: 16,
    color: COLORS.text,

    marginTop: 4,
    marginBottom: 8,

    lineHeight: 22,
  },

 badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.semiBold,

    color: "#C97A04",
  },
});