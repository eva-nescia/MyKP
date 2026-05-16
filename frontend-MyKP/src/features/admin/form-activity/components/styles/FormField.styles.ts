import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 8,
  },

  input: {
    height: 52,

    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,

    paddingHorizontal: 16,
    backgroundColor: "#fff",

    flexDirection: "row",       
    alignItems: "center",        
    justifyContent: "space-between", 
  },

  textArea: {
    minHeight: 160,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 14,

    paddingHorizontal: 16,
    paddingTop: 16,

    fontSize: 14,

    backgroundColor: "#fff",
  },

  dropdownItem: {
    height: 50,

    borderRadius: 14,

    paddingHorizontal: 16,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },

  dropdownItemActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  dropdownText: {
    color: COLORS.text,
  },

  dropdownTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  dateText: {
    color: COLORS.text,
  },

  dateLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dateInput: {
    height: 56,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 14,

    paddingHorizontal: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: COLORS.white,
  },

  placeholderText: {
    color: "#9CA3AF",
  },

  placeholderHelper: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 6,
  },

 modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  iosPickerContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
  },

  iosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  cancelText: {
    fontSize: 16,
    color: "#6B7280",
  },

  doneText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },

  counter: {
    marginTop: 6,
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.secondary,
  },

  bulletInput: {
    flex: 1,

    height: 48,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 12,

    paddingHorizontal: 14,

    backgroundColor: COLORS.white,
  },

  addBulletBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,

    marginTop: 4,
  },

  addBulletText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  imageUploadBox: {
    width: "100%",
    height: 260,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.primary,
    borderRadius: 18,
    backgroundColor: "#FFF7ED",
    overflow: "hidden",

    justifyContent: "center",
    alignItems: "center",
  },

  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },

  posterPreview: {
    width: 150,
    height: 220,
    borderRadius: 10,
    resizeMode: "cover",
  },

  uploadText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
  },

  uploadHint: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },
});