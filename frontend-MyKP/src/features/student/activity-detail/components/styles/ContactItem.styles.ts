import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  iconWrapper: {
    width: 36,
    height: 36,

    borderRadius: 999,
    backgroundColor: "#DCFCE7",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 2,
  },

  number: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
  },

  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
  },
});