import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from "./styles/ProfileScreenHeader.styles";

type Props = {
  onLogout: () => void;
};

export default function ProfileScreenHeader({
  onLogout,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Profile
        </Text>

        <Text style={styles.subtitle}>
          View your account and KP progress
        </Text>
      </View>

      <Pressable
        onPress={onLogout}
        style={styles.logoutBtn}
      >
        <Ionicons
          name="log-out"
          size={24}
          color={COLORS.primary}
        />
      </Pressable>
    </View>
  );
}