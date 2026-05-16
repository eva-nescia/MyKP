import { Dimensions, StyleSheet } from "react-native";

import { COLORS } from "../../../../constants/colors";
import { FONT_WEIGHT } from "../../../../constants/typography";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    height: height * 0.36,
    minHeight: 260,
    maxHeight: 360,

    position: "relative",
    overflow: "hidden",
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    opacity: 0.86,
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 24,
  },

  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  formContainer: {
    flex: 1,

    backgroundColor: COLORS.white,

    marginTop: -34,

    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,

    paddingHorizontal: 28,
    paddingTop: 38,
    paddingBottom: 44,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,

    elevation: 12,
  },

  title: {
    fontSize: 34,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,

    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#64748B",

    marginBottom: 34,
  },

  inputLabel: {
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginVertical: 28,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },

  dividerText: {
    marginHorizontal: 14,

    color: "#6B7280",
    fontSize: 14,
    fontWeight: FONT_WEIGHT.medium,
  },
});