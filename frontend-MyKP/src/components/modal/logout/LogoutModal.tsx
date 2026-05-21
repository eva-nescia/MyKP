import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { BlurView } from "expo-blur";

import { Ionicons } from "@expo/vector-icons";

import styles from "@/components/modal/logout/LogoutModal.styles";
import { COLORS } from "@/constants/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({
  visible,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <BlurView
          intensity={30}
          tint="dark"
          style={styles.blur}
        />

        <View style={styles.container}>
          <View
            style={styles.iconContainer}
          >
            <Ionicons
              name="log-out"
              size={28}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.title}>
            Logout?
          </Text>

          <Text style={styles.description}>
            You will need to log in again
            to access your account.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.9}
            >
              <Text
                style={styles.cancelText}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.9}
            >
              <Text
                style={styles.confirmText}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}