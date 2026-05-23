import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from
  "@/features/admin/form-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  value: string;

  onChange: (text: string) => void;

  onFocus?: () => void;
  onBlur?: () => void;

  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;

  icon?: keyof typeof Ionicons.glyphMap;
}

export default function TextInputField({
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  keyboardType,
  maxLength,
  icon,
}: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

     <View style={styles.input}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={COLORS.primary}
          />
        )}

        {label === "Registration Link" && (
          <Text style={styles.prefix}>
            https://
          </Text>
        )}

      <TextInput
        value={
          label === "Registration Link"
            ? value.replace(/^https?:\/\//, "")
            : value
        }
        onChangeText={(text) => {
          if (label === "Registration Link") {
            onChange(`https://${text}`);
            return;
          }

          onChange(text);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize="none"
        autoCorrect={false}
        style={[
          styles.textInput,
          icon && { marginLeft: 12 },
        ]}
      />
      </View>

      {maxLength && (
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
}