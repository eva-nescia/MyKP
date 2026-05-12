import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
    marginBottom: 28,
  },

  header: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.text,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 18,
  },

  card: {
    flexDirection: "row",
    backgroundColor: COLORS.white,

    borderRadius: 18,

    padding: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  image: {
    width: 78,
    height: 118,
    borderRadius: 10,
    marginRight: 14,
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: 22,
  },

  date: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
  },

  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },

  kpBadge: {
    backgroundColor: "#FEF3C7",

    borderRadius: 999,

    paddingHorizontal: 12,
    paddingVertical: 6,

    justifyContent: "center",
    alignItems: "center",
  },

  kpText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },

  statusBadge: {
    borderRadius: 999,

    paddingHorizontal: 12,
    paddingVertical: 6,

    justifyContent: "center",
    alignItems: "center",
  },

  completed: {
    backgroundColor: "#BBF7D0",
  },

  progress: {
    backgroundColor: "#FDE68A",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
});