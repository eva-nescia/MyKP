import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "space-between",

    padding: 20,
    backgroundColor: "#fff",

    borderTopWidth: 1,
    borderColor: "#F3F4F6",
  },

  backBtn: {
    flex: 1,

    height: 50,
    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#D1D5DB",

    marginRight: 10,
  },

  nextBtn: {
    flex: 1,

    height: 50,
    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.secondary,
  },

  backText: {
    fontWeight: FONT_WEIGHT.semiBold,
  },

  nextText: {
    color: "#fff",
    fontWeight: FONT_WEIGHT.semiBold,
  },

  fullWidth: {
    flex: 1,
  },
});