import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingTop: 18,
  },

  header: {
    marginBottom: 32,
  },

  title: {
    fontSize: 26,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: COLORS.text,
  },

  profileCard: {
    backgroundColor: COLORS.white,

    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    paddingVertical: 32,
    paddingHorizontal: 24,

    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 4,
  },

  logoWrapper: {
    width: 124,
    height: 124,

    borderRadius: 999,

    borderWidth: 6,
    borderColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.white,
  },

  logo: {
    width: 84,
    height: 84,
    borderRadius: 999,
    resizeMode: "contain",
  },

  name: {
    marginTop: 22,

    fontSize: 26,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,
    textAlign: "center",
  },

  roleBadge: {
    marginTop: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF7ED",

    paddingHorizontal: 14,
    paddingVertical: 8,

    borderRadius: 999,
  },

  roleText: {
    marginLeft: 8,

    fontSize: 14,
    fontWeight: FONT_WEIGHT.medium,

    color: COLORS.primary,
  },

  infoSection: {
    marginTop: 34,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,

    marginBottom: 14,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",

    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 8,
   
    elevation: 2,
  },

  infoIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 14,
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  infoValue: {
    marginTop: 2,

    fontSize: 15,
    fontWeight: FONT_WEIGHT.regular,

    color: COLORS.text,
  },

  logoutButton: {
    marginTop: "auto",
    marginBottom: 34,

    height: 58,
    borderRadius: 999,

    backgroundColor: COLORS.secondary,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    marginLeft: 10,

    color: COLORS.white,

    fontSize: 16,
    fontWeight: FONT_WEIGHT.bold,
  },
});