import {
  Pressable,
  Text,
} from "react-native";

import { styles } from "src/features/admin/add-new-activity/components/form/styles/MultiInput.styles";

interface Props {
  label: string;
  selected: boolean;

  onPress: () => void;
}

export default function SelectableChip({
  label,
  selected,
  onPress,
}: Props) {
  return (
    <Pressable
      style={[
        styles.chip,
        selected && styles.chipActive,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.chipText,
          selected && styles.chipTextActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}