import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles/DashboardHeader.styles";

interface Props {
  userName: string;
  hasUnreadNotifications?: boolean;
  onPressNotification?: () => void;
}

export default function DashboardHeader({
  userName,
  hasUnreadNotifications,
  onPressNotification,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Dashboard
        </Text>

        <Text
          style={styles.subtitle}
          numberOfLines={1}
        >
          Welcome back, {userName}
        </Text>
      </View>

      <Pressable
        onPress={onPressNotification}
        style={styles.notificationBtn}
      >
        <Ionicons
          name="notifications"
          size={24}
          color={"#f5ad05"}
        />

        {hasUnreadNotifications && (
        <View style={styles.badge} />
      )}
      </Pressable>
    </View>
  );
}