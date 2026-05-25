import { View, Text } from "react-native";

import SelectableChip from "./SelectableChip";

import { styles } from "@/features/admin/form-activity/components/form/styles/MultiInput.styles";

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
  const displayedItems = [
    ...selected.filter((item) => !items.includes(item)),
    ...items,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View style={styles.wrapper}>
        {displayedItems.map((item) => (
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
