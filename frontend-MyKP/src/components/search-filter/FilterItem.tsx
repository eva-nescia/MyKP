import { View, Text, Pressable } from "react-native";
import { styles } from "./styles/FilterItem.styles";

export default function FilterItem({
  label,
  selected,
  onPress,
}: any) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <View
        style={[
          styles.checkbox,
          selected && styles.checkboxActive,
        ]}
      />

      <Text
        style={[
          styles.label,
          selected && styles.labelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}