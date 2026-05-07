import {
  Modal,
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./styles/Modal.styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  message: string;
}

export default function SaveActivityModal({
  visible,
  onClose,
  message,
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
              name="bookmark"
              size={32}
              color="white"
            />
          </View>

          <Text style={styles.title}>
            Saved Activities
          </Text>

          <Text style={styles.description}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}