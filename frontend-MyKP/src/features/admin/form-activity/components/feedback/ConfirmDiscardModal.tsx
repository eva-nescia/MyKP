import { Modal, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import styles from "@/features/admin/form-activity/components/feedback/styles/ConfirmPublish.styles";
import { COLORS } from "@/constants/colors";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDiscardModal({
  visible,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={{ flex: 1 }} onPress={onCancel}>
        <BlurView
          intensity={40}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <View
            style={styles.modal}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="warning-outline"
                size={34}
                color="white"
              />
            </View>

            <Text style={styles.title}>
              Discard Activity?
            </Text>

            <Text style={styles.description}>
              Your changes have not been published yet. Are you sure you want to leave this page?
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.secondaryButton}
                onPress={onCancel}
              >
                <Text style={styles.secondaryButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[styles.button, { backgroundColor: COLORS.secondary }]}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>
                  Discard
                </Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}