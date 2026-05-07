import { View, Text, Pressable, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

import FilterItem from "./FilterItem";
import { styles } from "./styles/FilterDropdown.styles";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const CATEGORIES = [
  "All",
  "Organisasi",
  "Kepanitiaan",
  "Talkshow Wajib",
  "Kompetisi",
  "Pengabdian Masyarakat (Abdimas)",
  "Penelitian",
  "Lain-lain",
];

interface Props {
  visible: boolean;
  selected: string | null;
  onApply: (val: string | null) => void;
  onClose: () => void;
}

export default function FilterDropdown({
  visible,
  selected,
  onApply,
  onClose,
}: Props) {
  const [localSelected, setLocalSelected] = useState<string | null>(selected);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    if (visible) {
      setLocalSelected(selected);
    }
    translateY.value = withTiming(
      visible ? 0 : SCREEN_HEIGHT,
      { duration: 300 }
    );
  }, [visible, selected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* dim background */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* dropdown panel */}
      <Animated.View style={[styles.panel, animatedStyle]}>
        <Text style={styles.title}>Filter Category</Text>

        <View style={styles.list}>
          {CATEGORIES.map((cat) => (
            <FilterItem
              key={cat}
              label={cat}
              selected={localSelected === cat}
              onPress={() => setLocalSelected(localSelected === cat ? null : cat)}
            />
          ))}
        </View>

        <Pressable style={styles.applyBtn} onPress={() => { onApply(localSelected); onClose(); }}>
          <Text style={styles.applyText}>Apply</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}