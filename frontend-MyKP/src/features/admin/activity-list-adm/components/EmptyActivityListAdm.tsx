import { View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import styles from "@/features/admin/activity-list-adm/components/styles/EmptyActivityListAdm.styles";

export default function EmptyActivityListAdm() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="document-text-outline"
          size={52}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        No Activities Found
      </Text>

      <Text style={styles.subtitle}>
        There are no published activities
        matching your search or filter.
      </Text>
    </View>
  );
}