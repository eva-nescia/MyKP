import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { BlurView } from "expo-blur";

import styles from "./styles/YearFilter.styles";

const YEARS = [
  "All",
  "2023",
  "2024",
  "2025",
  "2026",
];

type Props = {
  visible: boolean;
  selected: string;
  onApply: (year: string) => void;
  onClose: () => void;
};

export default function YearFilter({
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
          duration: 260,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 420,
        duration: 280,

        easing: Easing.bezier(
          0.22,
          1,
          0.36,
          1
        ),

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
    });
  };

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <BlurView
            intensity={45}
            tint="light"
            style={styles.backdrop}
          />
        </Animated.View>

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            },
          ]}
        >
          <View
            style={{
              width: 42,
              height: 5,
              borderRadius: 999,
              backgroundColor: "#CBD5E1",
              alignSelf: "center",
              marginBottom: 20,
            }}
          />

          <Text style={styles.title}>
            Filter by Year
          </Text>

          {YEARS.map((year) => (
            <TouchableOpacity
              key={year}
              style={[
                styles.option,

                selected === year &&
                  styles.selectedOption,
              ]}
              onPress={() => {
                onApply(year);

                handleClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,

                  selected === year &&
                    styles.selectedText,
                ]}
              >
                {year}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}