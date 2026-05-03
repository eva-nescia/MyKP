import { StyleSheet } from 'react-native';

import { COLORS } from '@/constants/colors';
import { FONT_WEIGHT } from '@/constants/typography';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: 6,
    color: COLORS.text,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
  },
});