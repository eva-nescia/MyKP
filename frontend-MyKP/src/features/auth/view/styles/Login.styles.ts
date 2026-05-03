import { StyleSheet } from 'react-native';

import { COLORS } from '../../../../constants/colors';
import { FONT_WEIGHT } from '../../../../constants/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    height: '32%',
    position: 'relative',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    opacity: 0.85,
  },

  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  formContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.regular,
    color: COLORS.text,
    marginBottom: 24,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
    marginBottom: 16,
  },

  inputLabel: {
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text,
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
  },

  dividerText: {
    marginHorizontal: 10,
    color: COLORS.text,
  },

});