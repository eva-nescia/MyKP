import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "src/features/admin/add-new-activity/components/header/styles/Header.styles";
import { COLORS } from "@/constants/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Pressable>
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.text}
        />
      </Pressable>

      <Text style={styles.title}>
        Add New Activity
      </Text>

      <View style={{ width: 24 }} />
    </View>
  );
}