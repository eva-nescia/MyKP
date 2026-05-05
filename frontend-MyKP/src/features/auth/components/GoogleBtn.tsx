import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';


import { styles } from './styles/GoogleBtn.styles';

interface Props {
  title: string;
  onPress?: () => void;
  Icon: React.FC<any>;
  disabled?: boolean;
}

const GoogleButton: React.FC<Props> = ({ title, onPress, Icon, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Icon width={18} height={18} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};


export default GoogleButton;
