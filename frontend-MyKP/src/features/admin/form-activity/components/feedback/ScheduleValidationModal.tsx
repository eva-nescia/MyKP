import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import styles from "src/features/admin/form-activity/components/feedback/styles/ScheduleValidationModal.styles";

type Props = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export default function ScheduleValidationModal({
  visible,
  message,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="alert-circle"
              size={34}
              color={COLORS.white}
            />
          </View>

          <Text style={styles.title}>
            Invalid Schedule
          </Text>

          <Text style={styles.description}>
            {message}
          </Text>

          <Pressable
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              Got it
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}