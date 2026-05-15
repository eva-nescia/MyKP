import { View, Text } from "react-native";

import SelectableChip from "./SelectableChip";

import { styles } from "src/features/admin/add-new-activity/components/form/styles/MultiInput.styles";

interface Props {
  label: string;

  items: string[];

  selected: string[];

  onToggle: (value: string) => void;
}

export default function MultiInputField({
  label,
  items,
  selected,
  onToggle,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.wrapper}>
        {items.map((item) => (
          <SelectableChip
            key={item}
            label={item}
            selected={selected.includes(item)}
            onPress={() => onToggle(item)}
          />
        ))}
      </View>
    </View>
  );
}