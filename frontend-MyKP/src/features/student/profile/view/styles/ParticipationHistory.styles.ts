import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    paddingHorizontal: 22,
    paddingTop: 56,
  },

  /* header */

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
    gap: 14,
  },

  backButton: {
    width: 42,
    height: 42,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  header: {
    fontSize: 26,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },

  /* progress */

  progressCard: {
    backgroundColor: COLORS.white,

    borderRadius: 20,

    padding: 20,

    marginBottom: 32,
    
    borderWidth: 1,
    borderColor: "#E2E8F0",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  progressHeader: {
    marginBottom: 14,
  },

  progressTitle: {
    fontSize: 34,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  progressBarBackground: {
    height: 16,

    backgroundColor: COLORS.secondary + "25",

    borderRadius: 999,

    overflow: "hidden",

    marginBottom: 12,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,

    borderRadius: 999,
  },

  progressFooter: {
    textAlign: "right",

    fontSize: 15,
    fontWeight: FONT_WEIGHT.regular,

    color: COLORS.text,
  },

  /* section */

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 18,
  },

  listContent: {
    paddingBottom: 30,
  },

  emptyText: {
    textAlign: "center",

    marginTop: 20,

    color: COLORS.text
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },

  point: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.medium,
    color: "#64748B",
  },

  percentage: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.primary,
  },
});