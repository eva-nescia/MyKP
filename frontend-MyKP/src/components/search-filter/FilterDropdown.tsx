import {
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";

import { BlurView } from "expo-blur";

import { styles } from "./styles/FilterDropdown.styles";

const CATEGORIES = [
  "All",
  "Organisasi",
  "Kepanitiaan",
  "Talkshow Wajib BMA",
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
  const handleSelect = (
    category: string
  ) => {
    onApply(
      category === "All"
        ? null
        : category
    );

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* blur backdrop */}
        <BlurView
          intensity={18}
          tint="light"
          style={styles.backdrop}
        />

        {/* press outside to close */}
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />

        {/* bottom sheet */}
        <View style={styles.container}>
          <View
            style={styles.dragIndicator}
          />

          <Text style={styles.title}>
            Filter KP Category
          </Text>

          {CATEGORIES.map((category) => {
            const isSelected =
              selected === category ||
              (!selected &&
                category === "All");

            return (
              <Pressable
                key={category}
                style={[
                  styles.option,
                  isSelected &&
                    styles.selectedOption,
                ]}
                onPress={() =>
                  handleSelect(category)
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected &&
                      styles.selectedText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}