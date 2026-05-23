import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import { styles } from "./styles/FormValidationModal.styles";

interface Props {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function FormValidationModal({
  visible,
  message,
  onClose,
}: Props) {
  const isBulletList =
    message.includes("•");

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="alert-circle"
              size={28}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.title}>
            Incomplete Form
          </Text>

          {isBulletList ? (
            <View style={styles.listContainer}>
              {message
                .split("\n")
                .map((line, index) => {
                  if (!line.trim()) return null;

                  return (
                    <Text
                      key={index}
                      style={
                        line.startsWith("•")
                          ? styles.bulletText
                          : styles.description
                      }
                    >
                      {line}
                    </Text>
                  );
                })}
            </View>
          ) : (
            <Text style={styles.description}>
              {message}
            </Text>
          )}

          <Pressable
            style={styles.button}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>
              Okay
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}