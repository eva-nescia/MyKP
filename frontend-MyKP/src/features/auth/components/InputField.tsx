import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { styles } from './styles/InputField';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;

  // customizable
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const InputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  labelStyle,
  inputStyle,
  containerStyle,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleVisibility = () => {
    setIsSecure(prev => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>
        {label}
      </Text>

      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isSecure}
          style={[styles.input, inputStyle]}
          placeholderTextColor={COLORS.gray}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={toggleVisibility}>
            <Ionicons
              name={isSecure ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;