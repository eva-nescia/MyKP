import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  contentContainer: {
   paddingTop: 120,
   paddingBottom: 120,
   padding: 14
  },

  /* header */

  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,

    zIndex: 100,

    flexDirection: "row",
    alignItems: "center",

    // gap: 14,

    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 14,

    backgroundColor: COLORS.white,
  },

  backButton: {
    width: 42,
    height: 42,

    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  /* hero */

  heroSection: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },

  imagePoster: {
    width: 130,
    height: 190,

    borderRadius: 8,
  },

  heroContent: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.semiBold,

    // lineHeight: 31,

    color: COLORS.text,

    marginBottom: 6,
  },

  organizer: {
    fontSize: 12,
    color: COLORS.text,

    marginTop: 5,
    marginBottom: 16,
  },

  /* badges */

  badges: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 10,
  },

  badge: {
    height: 38,

    // borderWidth: 1,
    // borderColor: COLORS.text,

    borderRadius: 8,

    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 14,

    backgroundColor: COLORS.primary,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.white,
  },

  /* info */

  infoRow: {
    flexDirection: "row",
    gap: 12,

    marginBottom: 8,
  },

  infoBox: {
    flex: 1,

    borderWidth: 1,
    borderColor: "#0F172A",

    borderRadius: 12,

    padding: 16,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 16,
    fontWeight: "600",

    color: "#0F172A",
  },

  infoText: {
    fontSize: 16,
    lineHeight: 24,

    color: "#0F172A",
  },

  /* text */

  sectionText: {
    fontSize: 16,
    lineHeight: 28,

    color: COLORS.text,
  },
});