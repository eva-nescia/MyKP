import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import styles from "./styles/ActivityDetailHeader.styles";

export default function ActivityDetailHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          // router.replace("/(student)/activities")
          router.back()
        }
        style={styles.backButton}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color="#0F172A"
        />
      </Pressable>

      <Text style={styles.title}>
        Activity Details
      </Text>
    </View>
  );
}