import { View, Text } from "react-native";

import styles from "src/features/admin/profile/components/styles/ProfileAdmHeader.styles";

export default function ProfileAdmHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Admin Profile
        </Text>

        <Text style={styles.subtitle}>
          Manage organization account
        </Text>
      </View>
    </View>
  );
}