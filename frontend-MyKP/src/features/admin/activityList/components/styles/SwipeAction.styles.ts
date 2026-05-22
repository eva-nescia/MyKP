import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  container: {
    justifyContent: "space-between",

    height: 143,

    marginBottom: 16,
    marginLeft: -8,
  },

  actionButton: {
    width: 78,
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 18,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    borderBottomRightRadius: 18,
  },
});