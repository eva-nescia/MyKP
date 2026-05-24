import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },

  container: {
    backgroundColor: COLORS.white,

    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -4,
    },

    elevation: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",

    marginBottom: 18,
  },

  option: {
    paddingVertical: 16,
    paddingHorizontal: 12,

    borderRadius: 12,
  },

  selectedOption: {
    backgroundColor: "#FFF7ED",
  },

  optionText: {
    fontSize: 16,
    color: "#334155",
  },

  selectedText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});