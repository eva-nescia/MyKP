import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  header: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  subheader: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 16,
  },

  list: {
    paddingBottom: 30,
  },
});