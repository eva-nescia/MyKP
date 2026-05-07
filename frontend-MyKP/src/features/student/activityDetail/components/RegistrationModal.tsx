import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import styles from "./styles/Modal.styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RegistrationModal({
  visible,
  onClose,
  onConfirm,
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
            <Feather
              name="external-link"
              size={32}
              color="white"
            />
          </View>

          <Text style={styles.title}>
            Open Registration Form?
          </Text>

          <Text style={styles.description}>
            You will be redirected to an
            external registration page.
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={styles.secondaryButton}
              onPress={onClose}
            >
              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}