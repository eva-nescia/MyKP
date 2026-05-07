import { StyleSheet } from 'react-native';

import { COLORS } from '../../../../constants/colors';
import { FONT_WEIGHT } from '../../../../constants/typography';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.text,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  text: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});
