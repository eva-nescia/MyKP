import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import styles from "./styles/NotificationHeader.styles";

type Props = {
  count: number;
  onBack: () => void;
};

export default function NotificationHeader({
  count,
  onBack,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        style={styles.backButton}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={COLORS.text}
        />
      </Pressable>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Notifications
        </Text>

        <Text style={styles.subtitle}>
          {count} {count === 1 ? "notification" : "notifications available"}
        </Text>
      </View>
    </View>
  );
}