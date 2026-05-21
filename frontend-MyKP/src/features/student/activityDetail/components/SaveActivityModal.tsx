import {
  Modal,
  View,
  Text,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "./styles/Modal.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  message: string;
  saved: boolean;
};

export default function SaveActivityModal({
  visible,
  onClose,
  message,
  saved,
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
          <View
            style={[
              styles.iconContainer,
              !saved &&
                styles.unsavedIconContainer,
            ]}
          >
            <Ionicons
              name={
                saved
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={32}
              color="white"
            />
          </View>

          <Text style={styles.title}>
            {saved
              ? "Saved Activity"
              : "Removed Activity"}
          </Text>

          <Text style={styles.description}>
            {message}
          </Text>
        </View>
      </View>
    </Modal>
  );
}