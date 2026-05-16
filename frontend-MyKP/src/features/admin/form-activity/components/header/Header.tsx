import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "@/features/admin/form-activity/components/header/styles/Header.styles";
import { COLORS } from "@/constants/colors";

interface Props {
  title: string;
  onBack: () => void;
}

export default function Header({
  title,
  onBack,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onBack}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={COLORS.text}
        />
      </Pressable>

      <Text style={styles.title}>
        {title}
      </Text>

      <View style={{ width: 24 }} />
    </View>
  );
}