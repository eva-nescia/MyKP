import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import styles from "src/features/student/profile/components/styles/EmptyParticipationState.styles";

export default function EmptyParticipationState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="document-text-outline"
          size={64}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        No participation history yet
      </Text>

      <Text style={styles.subtitle}>
        Your completed activities and{"\n"}
        KP participation records will appear here.
      </Text>
    </View>
  );
}