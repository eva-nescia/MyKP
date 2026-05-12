import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  card: {
    flexDirection: "row",

    backgroundColor: COLORS.white,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    padding: 12,

    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  image: {
    width: 80,
    height: 115,

    borderRadius: 6,

    marginRight: 12,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  organizer: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 8,
  },

  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  orangeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  
  organizerText: { 
    fontSize: 12, 
    fontWeight: FONT_WEIGHT.regular, 
    color: COLORS.text, 
  },

  title: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
    marginBottom: 6,
  },

  date: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12,
  },

  badges: {
    flexDirection: "row",
    gap: 8,
  }
});