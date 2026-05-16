import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import styles from "./styles/AuthFeedbackModal.styles";

type Props = {
  visible: boolean;

  title: string;
  message: string;

  type?: "error" | "info" | "success";

  onClose: () => void;
};

export default function AuthFeedbackModal({
  visible,
  title,
  message,
  type = "error",
  onClose,
}: Props) {
  const iconName =
    type === "success"
      ? "checkmark"
      : type === "info"
      ? "information"
      : "close";

  const iconBackground =
    type === "success"
      ? "#22C55E"
      : type === "info"
      ? COLORS.primary
      : "#EF4444";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={onClose}
      >
        <BlurView
          intensity={35}
          tint="dark"
          style={styles.overlay}
        >
          <View
            style={styles.modal}
            onStartShouldSetResponder={() => true}
          >
            {/* ICON */}
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor:
                    iconBackground,
                },
              ]}
            >
              <Ionicons
                name={iconName}
                size={34}
                color="white"
              />
            </View>

            {/* TITLE */}
            <Text style={styles.title}>
              {title}
            </Text>

            {/* MESSAGE */}
            <Text style={styles.description}>
              {message}
            </Text>

            {/* ACTION */}
            <View style={styles.actions}>
              <Pressable
                style={styles.button}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>
                  OK
                </Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}