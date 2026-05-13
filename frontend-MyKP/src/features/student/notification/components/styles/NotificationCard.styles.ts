import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  card: {
    flexDirection: "row",

    backgroundColor: COLORS.white,

    borderRadius: 14,

    padding: 16,

    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  iconContainer: {
    width: 54,
    alignItems: "center",
    marginTop: 4,
  },

  content: {
    flex: 1,
  },

  badge: {
    alignSelf: "flex-start",

    backgroundColor: "#0F3D63",

    paddingHorizontal: 8,
    paddingVertical: 3,

    borderRadius: 6,

    marginBottom: 6,
  },

  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.text,

    marginBottom: 2,
  },

  description: {
    fontSize: 18,
    color: COLORS.text,

    marginBottom: 6,
  },

  time: {
    fontSize: 13,
    color: "#475569",
  },
});