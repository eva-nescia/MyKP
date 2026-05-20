import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import styles from "./styles/EmptySaved.styles";

export default function EmptySavedState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="bookmark-outline"
          size={56}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        No Saved Activities
      </Text>

      <Text style={styles.subtitle}>
        Save activities you’re interested in to find them here later.
      </Text>
    </View>
  );
}