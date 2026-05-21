import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import styles from "src/features/student/activityList/components/styles/EmptyActiviyList.styles";

export default function EmptyActivityList() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="calendar-clear-outline"
          size={58}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        No Activities Found
      </Text>

      <Text style={styles.subtitle}>
        Try adjusting your search or filter to find available activities.
      </Text>
    </View>
  );
}