import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scroll: {
    flex: 1,
  },

  content: {
    backgroundColor: COLORS.white,
    padding: 24,
    paddingBottom: 120,
  },
});