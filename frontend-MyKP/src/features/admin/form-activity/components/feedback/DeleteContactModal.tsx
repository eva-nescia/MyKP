import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from "src/features/admin/form-activity/components/feedback/styles/DeleteContactModal.styles";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteContactModal({
  visible,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="trash-outline"
              size={30}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.title}>
            Delete Contact?
          </Text>

          <Text style={styles.description}>
            Are you sure you want to remove this contact?
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}