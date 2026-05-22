import {
  View,
  Text,
} from "react-native";

import { Mail } from "lucide-react-native";

import { COLORS } from "@/constants/colors";

import styles from "src/features/admin/profile/components/styles/ProfileAdmInfoSection.styles";

type Props = {
  email: string;
};

export default function ProfileAdmInfoSection({
  email,
}: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Account Information
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <Mail
            size={18}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>
            Email
          </Text>

          <Text style={styles.infoValue}>
            {email}
          </Text>
        </View>
      </View>
    </View>
  );
}