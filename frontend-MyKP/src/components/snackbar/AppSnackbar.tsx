import { useEffect, useRef } from "react";

import {
  Animated,
  Text,
} from "react-native";

import { styles } from "./styles/AppSnackbar.styles";

type Props = {
  visible: boolean;
  message: string;

  type?: "success" | "error" | "info";

  onHide: () => void;
};

export default function AppSnackbar({
  visible,
  message,
  type = "success",
  onHide,
}: Props) {
  const translateY =
    useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      // SHOW
      Animated.spring(translateY, {
        toValue: 0,
        damping: 18,
        stiffness: 180,
        mass: 0.8,
        useNativeDriver: true,
      }).start();

      // HIDE
      const timer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: 100,
          duration: 220,
          useNativeDriver: true,
        }).start(onHide);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const backgroundColor =
    type === "success"
      ? styles.success.backgroundColor
      : type === "error"
      ? styles.error.backgroundColor
      : styles.info.backgroundColor;

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>
        {message}
      </Text>
    </Animated.View>
  );
}