import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  filterBtn: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 30,
  },
});