import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  imageFull: {
    width: 155,
    height: 220,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "center",
  },

  organizer: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 10,
  },

  metaCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 3,
    marginBottom: 16,
    // shadowColor: "#000",
    // shadowOpacity: 0.05,
    // shadowRadius: 10, 
    elevation: 2,
  },

  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },

  badge: {
    borderWidth: 1,
    borderColor: COLORS.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: COLORS.text,
    fontSize: 14,
    backgroundColor: COLORS.white,
  },

  infoRow: {
    flexDirection: "row",
    gap: 8,
  },

  infoBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 10,
    padding: 10,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 2,
  },

  infoLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.text,
  },

  infoText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 16,
    marginTop: 4,
  },

  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 30,
    marginBottom: 10,
  },

  saveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },

  registerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.secondary,
    padding: 14,
    borderRadius: 30,
  },

  registerText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});