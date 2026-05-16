import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: 16,

    maxHeight: "60%",

    flexShrink: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
  },

  searchInput: {
    flex: 1,
    padding: 10,
  },

  floorTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },

  floorTabActive: {
    backgroundColor: COLORS.primary,
  },

  floorTabInactive: {
    backgroundColor: "#F3F4F6",
  },

  floorTextActive: {
    color: "#fff",
    fontSize: 12,
  },

  floorTextInactive: {
    color: "#111",
    fontSize: 12,
  },

  gridItem: {
    flex: 1,
    margin: 5,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },

  gridItemActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },

  gridItemInactive: {
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  gridTextActive: {
    color: "#fff",
    fontWeight: "500",
  },

  gridTextInactive: {
    color: "#111",
    fontWeight: "500",
  },
});