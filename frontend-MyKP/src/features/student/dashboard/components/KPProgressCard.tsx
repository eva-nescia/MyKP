import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ProgressBar from "@/features/student/dashboard/components/ProgressBar";
import { styles } from "src/features/student/dashboard/components/styles/KPProgressCard.styles";

interface Props {
  progress: number;
  total: number;
}

export default function KPProgressCard({
  progress,
  total,
}: Props) {
  const percentage = (progress / total) * 100;
  const remaining = total - progress;

  return (
    <LinearGradient
      colors={["#F18E29", "#FB923C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.title}>
        Your KP Progress
      </Text>

      <View style={styles.row}>
        <Text style={styles.value}>
          {progress}/{total}
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {remaining} KP remaining
          </Text>
        </View>
      </View>

      <ProgressBar progress={percentage} variant="light" />
    </LinearGradient>
  );
}