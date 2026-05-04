import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { styles } from "./styles/DashboardHeader.styles";

interface Props {
  userName: string;
  onPressNotification?: () => void;
}

export default function DashboardHeader({
  userName,
  onPressNotification,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>
          Welcome back, {userName}
        </Text>
      </View>

      <Pressable onPress={onPressNotification} style={styles.notificationBtn}>
        <Ionicons name="notifications" size={29} color="#ffc400" />
        {/* <View style={styles.badge} /> */}
      </Pressable>
    </View>
  );
}