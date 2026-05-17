import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import styles from "./styles/EmptyMandatoryActivity.styles";

export default function EmptyMandatoryActivity() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="megaphone-outline"
          size={56}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        No Mandatory Activities
      </Text>

      <Text style={styles.subtitle}>
        There are currently no required activities available.
      </Text>
    </View>
  );
}