import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  Ionicons,
  Feather,
} from "@expo/vector-icons";

import styles from "./styles/FloatingActionBar.styles";

interface Props {
  saved: boolean;
  onSave: () => void;
  onRegister: () => void;
}

export default function FloatingActionBar({
  saved,
  onSave,
  onRegister,
}: Props) {
  return (
    <View style={styles.container}>
      {/* REGISTER */}
      <Pressable
        style={styles.registerButton}
        onPress={onRegister}
      >
        <Feather
          name="link"
          size={20}
          color="white"
        />

        <Text style={styles.buttonText}>
          Register
        </Text>
      </Pressable>

      {/* SAVE */}
      <Pressable
        style={[
          styles.saveButton,
          saved && styles.savedButton,
        ]}
        onPress={onSave}
      >
        <Ionicons
          name={
            saved
              ? "bookmark"
              : "bookmark-outline"
          }
          size={20}
          color="white"
        />

        <Text style={styles.buttonText}>
          {saved ? "Saved" : "Save"}
        </Text>
      </Pressable>
    </View>
  );
}