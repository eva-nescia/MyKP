import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

import { clearSession } from "../services/session";

import styles from "./styles/Splash.styles";

export default function SplashScreen() {
  const router = useRouter();

  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const initApp = async () => {
      // Always land on /login at app launch. Any persisted token from a
      // previous run is cleared so leftover localStorage / SecureStore
      // entries can't auto-redirect into the dashboard.
      try {
        await clearSession();
      } catch {
        // Best-effort; never block the navigation.
      }
      router.replace("/login");
    };

    setTimeout(initApp, 1200);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("assets/images/MyKP_logo.png")}
        style={[styles.logo, { transform: [{ scale }], opacity }]}
        resizeMode="contain"
      />
    </View>
  );
}