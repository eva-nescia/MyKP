import {
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from
  "src/features/admin/add-new-activity/components/styles/FormField.styles";

interface Props {
  label: string;

  values: string[];

  placeholder?: string;

  onChange: (values: string[]) => void;
}

export default function BulletInputField({
  label,
  values,
  placeholder,
  onChange,
}: Props) {
  const updateItem = (
    index: number,
    text: string
  ) => {
    const updated = [...values];
    updated[index] = text;

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
          <View style={styles.bulletDot} />

          <TextInput
            value={item}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) =>
              updateItem(index, text)
            }
            style={styles.bulletInput}
          />

          <Pressable
            onPress={() =>
              removeItem(index)
            }
          >
            <Ionicons
              name="close"
              size={18}
              color="#9CA3AF"
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
          Add Item
        </Text>
      </Pressable>
    </View>
  );
}