import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F8FAFC",

    borderRadius: 999,

    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,

    marginBottom: 20,

    borderWidth: 1,
    borderColor: "#EEF2F7",
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,
    color: COLORS.text,

    paddingVertical: 4,
  },

  filterBtn: {
    width: 44,
    height: 44,

    borderRadius: 999,

    backgroundColor: COLORS.primary,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },
});