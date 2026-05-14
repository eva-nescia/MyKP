import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  container: {
    justifyContent: "space-between",

    height: 156,

    marginBottom: 18,

    marginLeft: -8,
  },

  actionButton: {
    width: 82,
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    backgroundColor: COLORS.primary,

    borderTopRightRadius: 14,
  },

  deleteButton: {
    backgroundColor: "#EF4444",

    borderBottomRightRadius: 14,
  },
});