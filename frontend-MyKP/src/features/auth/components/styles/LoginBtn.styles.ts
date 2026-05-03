import { StyleSheet } from 'react-native';

import { COLORS } from '../../../../constants/colors';
import { FONT_WEIGHT } from '@/constants/typography';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});