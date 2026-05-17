import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  container: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 24,
  },

  center: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: COLORS.text,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  notificationBtn: {
    position: "relative",
    padding: 6,
  },

  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },

  // TEXT
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 4,
  },

  section: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 8,
  },

  horizontalList: {
    paddingRight: 16,
  },
});