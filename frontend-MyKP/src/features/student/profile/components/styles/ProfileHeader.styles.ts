import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    marginBottom: 28,
  },

  card: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderRadius: 14,

    padding: 20,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 3,
      height: 3,
    },

    elevation: 5,

    marginRight: 14,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 14,
  },

  info: {
    flex: 1,
    paddingVertical: 20,
  },

  name: {
    fontSize: 17,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text,
    marginBottom: 6,
  },

  nim: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 6,
  },

  major: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: FONT_WEIGHT.regular,
  },
});