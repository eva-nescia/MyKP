import {
  TouchableOpacity,
  Text,
} from "react-native";

import { LogOut } from "lucide-react-native";

import { COLORS } from "@/constants/colors";

import styles from "src/features/admin/profile/components/styles/ProfileAdmLogoutBtn.styles";

type Props = {
  onPress: () => void;
};

export default function ProfileAdmLogoutButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <LogOut
        size={18}
        color={COLORS.white}
      />

      <Text style={styles.text}>
        Logout
      </Text>
    </TouchableOpacity>
  );
}