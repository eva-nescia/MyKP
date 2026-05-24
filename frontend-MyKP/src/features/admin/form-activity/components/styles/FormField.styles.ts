import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 20,
    fontWeight: FONT_WEIGHT.bold,
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
    minHeight: 260,
    maxHeight: 360,

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
    fontWeight: FONT_WEIGHT.regular,
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
    backgroundColor: "rgba(15, 23, 42, 0.45)",
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

    marginBottom: 12,
  },

  bulletNumber: {
    width: 28,
    height: 28,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  bulletNumberText: {
    fontSize: 12,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.primary,
  },

  bulletInput: {
    flex: 1,

    minHeight: 50,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 14,

    paddingHorizontal: 14,

    fontSize: 14,
    color: COLORS.text,

    backgroundColor: COLORS.white,
  },

  removeBulletBtn: {
    width: 36,
    height: 36,

    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 8,

    backgroundColor: "#F8FAFC",
  },

  addBulletBtn: {
    alignSelf: "flex-start",

    flexDirection: "row",
    alignItems: "center",

    gap: 6,

    marginTop: 4,

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",
  },

  addBulletText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.semiBold,
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

  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },
  
  prefix: {
    marginLeft: 12,
    marginRight: 4,

    fontSize: 14,
    fontWeight: FONT_WEIGHT.regular,

    color: "#64748B",
  },

   contactPrefix: {
        height: 50,

        paddingHorizontal: 14,

        borderWidth: 1,
        borderColor: "#E2E8F0",

        borderRadius: 14,

        backgroundColor: "#FFF7ED",

        justifyContent: "center",
        alignItems: "center",

        marginRight: 10,
        },

        contactPrefixText: {
        fontSize: 14,
        fontWeight: FONT_WEIGHT.semiBold,
        color: COLORS.primary,
      },
      
      helperText: {
        fontSize: 13,
        lineHeight: 20,

        color: "#64748B",

        marginTop: -4,
        marginBottom: 12,
    },
});
