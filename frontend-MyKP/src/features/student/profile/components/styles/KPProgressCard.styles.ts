import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,

    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,

    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    // shadowRadius: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },

    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 14,
  },

  title: {
    flex: 1,

    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,

    marginRight: 12,
  },

  point: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  progressBackground: {
    height: 14,

    backgroundColor: "#E2E8F0",

    borderRadius: 999,

    overflow: "hidden",

    marginBottom: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,

    borderRadius: 999,
  },

  status: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },

  completed: {
    color: "#22C55E",
  },
});