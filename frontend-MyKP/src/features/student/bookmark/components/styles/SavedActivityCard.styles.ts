import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,

    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,

    backgroundColor: COLORS.white,

    marginBottom: 14,
  },

  image: {
    width: 74,
    height: 110,
    borderRadius: 8,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  orangeDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },

  organizerText: {
    fontSize: 12,
    color: "#64748B",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  date: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },

  badges: {
    flexDirection: "row",
    gap: 8,
  },

  badge: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,

    paddingHorizontal: 10,
    paddingVertical: 4,

    fontSize: 12,
    color: COLORS.text,
  },
});