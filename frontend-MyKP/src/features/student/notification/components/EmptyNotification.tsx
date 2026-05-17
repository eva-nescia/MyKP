import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import styles from "src/features/student/notification/components/styles/EmptyNotification";

export default function EmptyNotification() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="notifications-off-outline"
          size={56}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        No Notifications
      </Text>

      <Text style={styles.subtitle}>
        You’re all caught up. New reminders and activity updates will appear here.
      </Text>
    </View>
  );
}