import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from
  "@/features/admin/form-activity/components/styles/FormField.styles";

interface Props {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function ContactInputField({
  label,
  values,
  onChange,
}: Props) {
  const updateItem = (
    index: number,
    text: string
  ) => {
    const cleaned = text.replace(/\D/g, "");

    const updated = [...values];

    updated[index] = cleaned;

    onChange(updated);
  };

  const addItem = () => {
    onChange([...values, ""]);
  };

  const removeItem = (index: number) => {
    const updated = values.filter(
      (_, i) => i !== index
    );

    onChange(updated);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      {values.map((item, index) => (
        <View
          key={index}
          style={styles.bulletRow}
        >
          <View style={styles.contactPrefix}>
            <Text style={styles.contactPrefixText}>
              +62
            </Text>
          </View>

          <TextInput
            value={item}
            placeholder="8123456789"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            onChangeText={(text) =>
              updateItem(index, text)
            }
            style={styles.bulletInput}
          />

          <Pressable
            onPress={() =>
              removeItem(index)
            }
            style={styles.removeBulletBtn}
          >
            <Ionicons
              name="close"
              size={18}
              color="#94A3B8"
            />
          </Pressable>
        </View>
      ))}

      <Pressable
        style={styles.addBulletBtn}
        onPress={addItem}
      >
        <Ionicons
          name="add"
          size={18}
          color={COLORS.primary}
        />

        <Text style={styles.addBulletText}>
          Add Contact
        </Text>
      </Pressable>
    </View>
  );
}