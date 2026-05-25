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
}: Props) {
  const displayedItems =
    value && !items.includes(value)
      ? [value, ...items]
      : items;

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      {displayedItems.map((item) => {
        const active = value === item;

        return (
          <Pressable
            key={item}
            style={[
              styles.dropdownItem,
              active &&
                styles.dropdownItemActive,
            ]}
           onPress={() =>
            onSelect(active ? "" : item)
          }
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
    </View>
  );
}
