import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from
  "src/features/admin/add-new-activity/components/styles/FormField.styles";

interface Props {
  label: string;

  value: string;

  items: string[];

  onSelect: (value: string) => void;

  placeholder?: string;
}

export default function DropdownField({
  label,
  value,
  items,
  onSelect,
  placeholder,
}: Props) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      {items.map((item) => {
        const active = value === item;

        return (
          <Pressable
            key={item}
            style={[
              styles.dropdownItem,
              active &&
                styles.dropdownItemActive,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.dropdownText,
                active &&
                  styles.dropdownTextActive,
              ]}
            >
              {item}
            </Text>

            {active && (
              <Ionicons
                name="checkmark"
                size={18}
                color={COLORS.white}
              />
            )}
          </Pressable>
        );
      })}

      {!value && placeholder && (
        <Text style={styles.placeholderHelper}>
          {placeholder}
        </Text>
      )}
    </View>
  );
}