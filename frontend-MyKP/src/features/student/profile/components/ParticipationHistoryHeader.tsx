import {
  View,
  Text,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";

import styles from "src/features/student/profile/components/styles/ParticipationHistoryHeader.styles";

type Props = {
  title: string;
  subtitle: string;
  onBack: () => void;
};

export default function ParticipationHistoryHeader({
  title,
  subtitle,
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
          color={COLORS.text}
        />
      </Pressable>

      <View style={styles.textContainer}>
       <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
        >
        {title}
      </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}