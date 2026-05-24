import { StyleSheet } from "react-native";

import { COLORS } from "@/constants/colors";
import { FONT_WEIGHT } from "@/constants/typography";

export default StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,

    marginBottom: 14,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 18,

    padding: 14,

    marginBottom: 20,

    elevation: 1,
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 999,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: FONT_WEIGHT.semiBold,

    color: COLORS.text,

    marginBottom: 4,
  },

  date: {
    fontSize: 13,
    color: "#64748B",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 4,

    marginTop: 2,
    },

 badgeRow: {
  flexDirection: "row",
  alignItems: "center",

  marginTop: 10,

  gap: 8,
},

categoryBadge: {
  paddingHorizontal: 12,
  paddingVertical: 6,

  borderRadius: 999,

  backgroundColor: "#F8FAFC",

  borderWidth: 1,
  borderColor: "#E2E8F0",
},

categoryText: {
  fontSize: 13,
  fontWeight: FONT_WEIGHT.regular,

  color: "#475569",
},

pointBadge: {
  paddingHorizontal: 10,
  paddingVertical: 6,

  borderRadius: 999,

  backgroundColor: COLORS.primary,
},

pointText: {
  fontSize: 12,
  fontWeight: FONT_WEIGHT.semiBold,

  color: COLORS.white,
},
});