import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { LogOut } from "lucide-react-native";

import styles from "src/features/student/profile/components/styles/LogoutModal.styles";

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
        <View style={styles.container}>
          <View
            style={styles.iconContainer}
          >
            <LogOut
              size={42}
              color="white"
            />
          </View>

          <Text style={styles.title}>
            Are you sure you want to
            logout?
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
            >
              <Text
                style={styles.buttonText}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <Text
                style={styles.buttonText}
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