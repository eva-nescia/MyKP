import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  card: {
    flexDirection: "row",

    backgroundColor: COLORS.white,

    borderRadius: 14,

    padding: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  image: {
    width: 74,
    height: 108,

    borderRadius: 8,

    marginRight: 12,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  organizer: {
    fontSize: 12,
    color: "#64748B",

    marginBottom: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 4,
  },

  date: {
    fontSize: 14,
    color: COLORS.text,

    marginBottom: 12,
  },

  badges: {
    flexDirection: "row",
    gap: 8,
  },

  kpBadge: {
    borderWidth: 1,
    borderColor: "#D1D5DB",

    borderRadius: 6,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  kpText: {
    fontSize: 13,
    color: COLORS.text,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,

    borderRadius: 6,
  },

  completed: {
    backgroundColor: "#BBF7D0",
  },

  progress: {
    backgroundColor: "#FDE68A",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",

    color: COLORS.text,
  },
});