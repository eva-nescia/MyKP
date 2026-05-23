import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  blur: {
    ...StyleSheet.absoluteFillObject,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },

  sheet: {
    backgroundColor: COLORS.white,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 40,

    height: "59%",

    elevation: 12,
  },

  handle: {
    width: 42,
    height: 5,

    borderRadius: 999,

    backgroundColor: "#CBD5E1",

    alignSelf: "center",

    marginBottom: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,

    color: COLORS.text,
  },

  closeButton: {
    width: 38,
    height: 38,

    borderRadius: 999,

    backgroundColor: "#F8FAFC",

    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,

    paddingHorizontal: 14,

    marginBottom: 16,

    backgroundColor: COLORS.white,
  },

  searchInput: {
    flex: 1,

    paddingVertical: 10,
    marginLeft: 8,

    fontSize: 14,

    color: COLORS.text,
  },

  floorList: {
    marginBottom: 12,
    flexGrow: 0,
  },

  floorTab: {
    paddingVertical: 9,
    paddingHorizontal: 14,

    borderRadius: 999,

    marginRight: 8,
  },

  floorTabActive: {
    backgroundColor: COLORS.primary,
  },

  floorTabInactive: {
    backgroundColor: "#FFF7ED",
  },

  floorTextActive: {
    color: COLORS.white,

    fontSize: 13,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  floorTextInactive: {
    color: COLORS.primary,

    fontSize: 13,
    fontWeight: FONT_WEIGHT.medium,
  },

  gridList: {
    paddingBottom: 12,
  },

  gridItem: {
    flex: 1,

    minHeight: 46,

    margin: 5,

    borderRadius: 14,
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  gridItemActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },

  gridItemInactive: {
    borderColor: "#E2E8F0",
    backgroundColor: COLORS.white,
  },

  gridTextActive: {
    color: COLORS.white,

    fontSize: 13,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  gridTextInactive: {
    color: "#475569",

    fontSize: 13,
    fontWeight: FONT_WEIGHT.medium,
  },

  applyButton: {
    height: 54,

    borderRadius: 16,

    backgroundColor: COLORS.secondary,

    justifyContent: "center",
    alignItems: "center",

    marginTop: 14,
    marginBottom:20
  },

  applyButtonDisabled: {
    backgroundColor: "#94A3B8",
  },

  applyText: {
    color: COLORS.white,

    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});