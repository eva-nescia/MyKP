import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import styles from "@/features/admin/form-activity/components/feedback/styles/ConfirmPublish.styles";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmPublishModal({
  visible,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">

      {/* OVERLAY */}
      <Pressable style={{ flex: 1 }} onPress={onCancel}>
        <BlurView
          intensity={40}
          tint="dark"
          style={styles.overlay}
        >
          {/* MODAL CARD */}
          <View
            style={styles.modal}
            onStartShouldSetResponder={() => true}
          >
            {/* ICON */}
            <View style={styles.iconContainer}>
              <Ionicons
                name="cloud-upload-outline"
                size={34}
                color="white"
              />
            </View>

            {/* TITLE */}
            <Text style={styles.title}>
              Publish Activity?
            </Text>

            {/* DESCRIPTION */}
            <Text style={styles.description}>
              Once published, this activity will be visible to all users. Make sure all information is correct before continuing.
            </Text>

            {/* ACTIONS */}
            <View style={styles.actions}>
              {/* CANCEL */}
              <Pressable
                style={styles.secondaryButton}
                onPress={onCancel}
              >
                <Text style={styles.secondaryButtonText}>
                  Cancel
                </Text>
              </Pressable>

              {/* CONFIRM */}
              <Pressable
                style={[
                  styles.button,
                ]}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>
                Publish
                </Text>           
              </Pressable>
            </View>
          </View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}
