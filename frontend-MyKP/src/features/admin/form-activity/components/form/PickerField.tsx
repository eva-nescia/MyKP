import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from
  "@/features/admin/form-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  value?: string;
  placeholder?: string;

  icon?: keyof typeof Ionicons.glyphMap;

  onPress: () => void;
}

export default function PickerField({
  label,
  value,
  placeholder = "Select option",
  icon,
  onPress,
}: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Pressable
        onPress={onPress}
        style={styles.input}
      >
        <View style={styles.dateLeft}>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={COLORS.primary}
            />
          )}

          <Text
            style={{
              color: value
                ? COLORS.text
                : "#9CA3AF",
            }}
          >
            {value || placeholder}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}