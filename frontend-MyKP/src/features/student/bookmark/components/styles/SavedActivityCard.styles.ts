import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    backgroundColor: COLORS.white,
    marginBottom: 14,
    elevation: 1,
  },

  image: {
    width: 82,
    height: 118,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 4,
  },

  organizerText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.medium,
    color: "#64748B",
    marginBottom: 8,
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
});