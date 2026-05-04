import { View, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles/Splash.styles";

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // start animation
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
  }, [scale, opacity]);

  useEffect(() => {
    const initApp = async () => {
      try {
        // =========================
        //    BACKEND PLACEHOLDER
        // =========================

        // TODO:
        // const token = await AsyncStorage.getItem("token");
        // const user = await fetchUser(token);

        const token = null; // placeholder
        const role = null;  // "student" | "admin"

        if (!token) {
          navigation.replace("Login");
          return;
        }

        if (role === "student") {
          navigation.replace("StudentStack");
        } else if (role === "admin") {
          navigation.replace("AdminStack");
        } else {
          navigation.replace("Login");
        }

      } catch (error) {
        console.log("Splash error:", error);
        navigation.replace("Login");
      }
    };

    // small delay for UX
    setTimeout(() => {
      initApp();
    }, 1200);
  }, [navigation]);

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