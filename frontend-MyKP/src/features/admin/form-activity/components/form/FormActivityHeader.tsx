import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import styles from "@/features/admin/form-activity/components/form/styles/FormActivityHeader.styles"

interface Props {
  title: string;
  onBack: () => void;
}

export default function FormActivityHeader({
  title,
  onBack,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        style={styles.backButton}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color="#0F172A"
        />
      </Pressable>

      <Text style={styles.title}>
        {title}
      </Text>
    </View>
  );
}