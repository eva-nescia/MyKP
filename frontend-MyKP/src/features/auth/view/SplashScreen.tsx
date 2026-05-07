import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

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
      try {
        // temporary placeholder for token and role retrieval logic
        const token = null;
        const role = null; // "student" | "admin"

        if (!token) {
          router.replace("/login");
          return;
        }

        if (role === "student") {
          router.replace("/");
        } else if (role === "admin") {
          router.replace("/activities");
        } else {
          router.replace("/login");
        }

      } catch (error) {
        console.log("Splash error:", error);
        router.replace("/login"); 
      }
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