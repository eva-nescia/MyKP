import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  Easing,
} from "react-native";

import {
  useEffect,
  useRef,
  useState,
} from "react";

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

const AnimatedPressable =
  Animated.createAnimatedComponent(Pressable);

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
  const [showModal, setShowModal] =
    useState(visible);

  const slideAnim = useRef(
    new Animated.Value(420)
  ).current;

  const backdropOpacity = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 22,
          mass: 0.9,
          stiffness: 180,
          useNativeDriver: true,
        }),

        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [backdropOpacity, slideAnim, visible]);

  const handleClose = (
    onClosed?: () => void
  ) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 520,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowModal(false);
      onClose();
      onClosed?.();
    });
  };

  const handleSelect = (category: string) => {
    handleClose(() => {
      onApply(
        category === "All"
          ? null
          : category
      );
    });
  };

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => handleClose()}
    >
      <View style={styles.overlay}>
       <AnimatedPressable
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
          onPress={() => handleClose()}
        />

        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                { translateY: slideAnim },
              ],
            },
          ]}
        >
          <View style={styles.dragIndicator} />

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
        </Animated.View>
      </View>
    </Modal>
  );
}
