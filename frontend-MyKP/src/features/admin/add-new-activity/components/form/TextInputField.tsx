import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";

import { styles } from
  "src/features/admin/add-new-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  value: string;
  onChange: (text: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

export default function TextInputField({
  label,
  value,
  onChange,
  placeholder,
  keyboardType,
}: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}  
        style={styles.input}
      />
    </View>
  );
}