import { View, Text, Pressable } from "react-native";

import { styles } from
  "src/features/admin/add-new-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
}

export default function PickerField({
  label,
  value,
  placeholder = "Select option",
  onPress,
}: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <Pressable onPress={onPress} style={styles.input}>
        <Text
          style={{
            color: value ? "#111" : "#9CA3AF",
          }}
        >
          {value || placeholder}
        </Text>
      </Pressable>
    </View>
  );
}