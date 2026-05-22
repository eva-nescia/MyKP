import {
  View,
  Text,
  Image,
} from "react-native";

import {
  ShieldCheck,
} from "lucide-react-native";

import { COLORS } from "@/constants/colors";

import styles from "src/features/admin/profile/components/styles/ProfileAdmCard.styles";

type Props = {
  profile: {
    logo: any;
    organizationName: string;
    role: string;
  };
};

export default function ProfileAdmCard({
  profile,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.logoWrapper}>
        <Image
          source={profile.logo}
          style={styles.logo}
        />
      </View>

      <Text style={styles.name}>
        {profile.organizationName}
      </Text>

      <View style={styles.roleBadge}>
        <ShieldCheck
          size={16}
          color={COLORS.primary}
        />

        <Text style={styles.roleText}>
          {profile.role}
        </Text>
      </View>
    </View>
  );
}