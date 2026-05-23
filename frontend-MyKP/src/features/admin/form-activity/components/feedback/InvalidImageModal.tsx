import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import styles from "./styles/InvalidImageModal.styles";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function InvalidImageModal({
  visible,
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
              name="image-outline"
              size={34}
              color={COLORS.white}
            />
          </View>

          <Text style={styles.title}>
            Invalid Image
          </Text>

          <Text style={styles.description}>
            Only PNG, JPG, and JPEG image files are allowed.
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