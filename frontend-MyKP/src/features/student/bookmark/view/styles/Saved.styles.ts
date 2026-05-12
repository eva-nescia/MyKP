import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 70,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  subheader: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 16,
  },

  list: {
    paddingBottom: 30,
  },
});