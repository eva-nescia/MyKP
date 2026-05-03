import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles/Login.styles";

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    // TODO: Implement actual login logic
    console.log("Login pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.input} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input} />
        </View>

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}