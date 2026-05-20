import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 28,

    paddingVertical: 26,
    paddingHorizontal: 22,

    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    elevation: 2,
  },

  image: {
    width: 92,
    height: 92,

    borderRadius: 999,

    marginBottom: 16,

    backgroundColor: "#E5E7EB",
  },

  name: {
    fontSize: 22,
    lineHeight: 29,

    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,

    textAlign: "center",

    marginBottom: 14,
  },

  badgeContainer: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },

  badge: {
    maxWidth: "100%",

    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    paddingHorizontal: 12,
    paddingVertical: 7,

    borderRadius: 999,

    backgroundColor: "#F8FAFC",
  },

  badgeText: {
    fontSize: 14,
    color: "#64748B",
  },
});