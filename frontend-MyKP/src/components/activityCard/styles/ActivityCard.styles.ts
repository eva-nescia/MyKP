// src/components/activityCard/styles.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 175,
    marginRight: 12,
  },

  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 8,
  },

  action: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  badges: {
    flexDirection: "row",
    marginBottom: 4,
  },

  date: {
    fontSize: 12,
    color: "COLORS.text",
  },
});