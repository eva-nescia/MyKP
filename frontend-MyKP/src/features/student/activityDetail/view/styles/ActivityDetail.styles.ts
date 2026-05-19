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
   paddingTop: 125,
   paddingBottom: 150,
   paddingHorizontal: 14,
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

  heroSection: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 26,
  },

  imagePoster: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    resizeMode: "cover",
  },

  heroContent: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 8,
  },

  organizer: {
    fontSize: 13,
    fontWeight: FONT_WEIGHT.medium,

    color: "#64748B",

    marginBottom: 14,
  },

  primaryBadgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",

    gap: 8,

    marginBottom: 10,
  },

  categoryBadge: {
    maxWidth: 140,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  categoryBadgeText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.medium,

    color: "#475569",
  },

  kpBadge: {
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },

  kpBadgeText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.white,
  },

  metaTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  metaTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "#FFF7ED",
  },

  metaTagText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.medium,

    color: COLORS.primary,
  },

  /* info */

  infoCard: {
  backgroundColor: "#FFFFFF",

  borderRadius: 22,

  padding: 16,

  borderWidth: 1,
  borderColor: "#E2E8F0",
  marginTop: 6,
  marginBottom: 2,

  // shadowColor: "#000",
  // shadowOpacity: 0.04,
  // shadowRadius: 10,
  // shadowOffset: {
  //   width: 0,
  //   height: 4,
  // },

  elevation: 1,
},

  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",

    gap: 12,
  },

  infoIconBox: {
    width: 42,
    height: 42,

    borderRadius: 14,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,

    color: "#64748B",

    marginBottom: 4,
  },

  infoText: {
    fontSize: 16,
    lineHeight: 25,


    fontWeight: FONT_WEIGHT.regular,

    color: COLORS.text,
  },

  infoDivider: {
    height: 1,

    backgroundColor: "#E2E8F0",

    marginVertical: 14,
  },

  /* text */

  sectionText: {
    fontSize: 16,
    lineHeight: 25,
    color: COLORS.text,
  },
});