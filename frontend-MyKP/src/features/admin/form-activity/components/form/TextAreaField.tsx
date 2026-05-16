import {
  View,
  Text,
  TextInput,
} from "react-native";

import { styles } from
  "@/features/admin/form-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;

  placeholder?: string;
  maxLength?: number;
}

export default function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        multiline
        textAlignVertical="top"
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        maxLength={maxLength}
        style={styles.textArea}
      />

      {maxLength && (
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
}